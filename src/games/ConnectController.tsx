import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectConnectState, selectNullableUserState } from "../data/state";
import { AccountSlice, ConnectState } from "zkwasm-minirollup-browser";
import "./style.scss";
import { CREATE_PLAYER } from "./api";
import {
  getConfig,
  queryInitialState,
  queryState,
  sendTransaction,
} from "zkwasm-minirollup-browser/src/connect";
import { createCommand } from "zkwasm-minirollup-rpc";

interface Props {
  LoadingComponent: React.ComponentType<{ message: string; progress: number }>;
  WelcomeComponent: React.ComponentType;
  onStart: () => Promise<void>;
  progress: number;
}

export function ConnectController({
  LoadingComponent,
  WelcomeComponent,
  onStart,
  progress,
}: Props) {
  const dispatch = useAppDispatch();
  const l1account = useAppSelector(AccountSlice.selectL1Account);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const connectState = useAppSelector(selectConnectState);
  const userState = useAppSelector(selectNullableUserState);
  const [inc, setInc] = useState(0);

  useEffect(() => {
    onStart().then(() => {
      dispatch(getConfig());
    });
  }, []);

  // update State
  function updateState() {
    if (connectState == ConnectState.Idle && l2account) {
      dispatch(queryState(l2account!.getPrivateKey()));
    } else if (connectState == ConnectState.Init && userState == null) {
      dispatch(queryInitialState("1"));
    }
    setInc(inc + 1);
  }

  useEffect(() => {
    setTimeout(() => {
      updateState();
    }, 5000);
  }, [inc]);

  // login L1 account
  useEffect(() => {
    dispatch(AccountSlice.loginL1AccountAsync());
  }, []);

  // useEffect(() => {
  //   if (connectState == ConnectState.Init) {
  //     dispatch(setConnectState(ConnectState.Pre));
  //   }
  // }, [l1account]);

  // login L2 account
  useEffect(() => {
    if (l2account) {
      dispatch(queryState(l2account!.getPrivateKey()));
    }
  }, [l2account]);

  // install new player
  useEffect(() => {
    if (connectState == ConnectState.InstallPlayer) {
      const command = createCommand(0n, CREATE_PLAYER, []);
      dispatch(
        sendTransaction({
          cmd: command,
          prikey: l2account!.getPrivateKey(),
        })
      );
    }
  }, [connectState]);

  if (connectState == ConnectState.Init) {
    return <LoadingComponent message={"Initialising"} progress={0} />;
  } else if (connectState == ConnectState.Preloading) {
    return (
      <LoadingComponent message={"Preloading Textures"} progress={progress} />
    );
  } else if (connectState == ConnectState.Idle) {
    return <WelcomeComponent />;
  } else if (connectState == ConnectState.QueryConfig) {
    return <LoadingComponent message={"Querying Config"} progress={0} />;
  } else if (connectState == ConnectState.QueryState) {
    return <LoadingComponent message={"Querying State"} progress={0} />;
  } else if (connectState == ConnectState.ConnectionError) {
    return <LoadingComponent message={"Error"} progress={0} />;
  } else {
    return <LoadingComponent message={"Loading"} progress={0} />;
  }
}
