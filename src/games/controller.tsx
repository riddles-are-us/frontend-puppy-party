import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { scenario } from "./scenario";
import {
  selectConfig,
  selectConnectState,
  selectUserState,
  setConnectState,
} from "../data/state";
import { AccountSlice, ConnectState } from "zkwasm-minirollup-browser";
import "./style.scss";
import Gameplay from "./components/Gameplay";
import LoadingPage from "./components/LoadingPage";
import { CREATE_PLAYER, getCreatePlayerTransactionParameter } from "./api";
import {
  getConfig,
  queryInitialState,
  queryState,
  sendTransaction,
} from "zkwasm-minirollup-browser/src/connect";
import { createCommand } from "zkwasm-minirollup-rpc";
import LandingPage from "./components/LandingPage";

interface Props {
  onStart: () => Promise<void>;
  progress: number;
}

export function GameController({ onStart, progress }: Props) {
  const dispatch = useAppDispatch();
  const l1account = useAppSelector(AccountSlice.selectL1Account);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const connectState = useAppSelector(selectConnectState);
  const userState = useAppSelector(selectUserState);
  const gameConfig = useAppSelector(selectConfig);
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

  useEffect(() => {
    if (connectState == ConnectState.Init) {
      dispatch(setConnectState(ConnectState.Loading));
    }
  }, [l1account]);

  // login L2 account
  useEffect(() => {
    if (l2account) {
      dispatch(queryState(l2account!.getPrivateKey()));
    }
  }, [l2account]);

  useEffect(() => {
    if (l2account) {
      scenario.status = "play";
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
    return <LoadingPage progress={0} />;
  } else if (connectState == ConnectState.ConnectionError) {
    return <LoadingPage progress={0} />;
  } else if (connectState == ConnectState.Loading) {
    return <LoadingPage progress={progress} />;
  } else if (connectState == ConnectState.QueryConfig) {
    return <LoadingPage progress={80} />;
  } else if (connectState == ConnectState.QueryState) {
    return <LoadingPage progress={90} />;
  } else if (gameConfig && userState?.player) {
    return <Gameplay />;
  } else {
    return <LandingPage />;
  }
}
