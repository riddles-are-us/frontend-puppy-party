import React, { useEffect, useState } from "react";
import { getMemeList } from "./express";
import { setMemeList } from "../data/ui";
import { ConnectController } from "./ConnectController";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectConnectState,
  selectNullableConfig,
  selectNullableUserState,
} from "../data/state";
import Gameplay from "./components/Gameplay";
import LoadingPage from "./components/LoadingPage";
import WelcomePage from "./components/WelcomePage";
import { scenario } from "./scenario";
import { selectL2Account } from "zkwasm-minirollup-browser/src/reduxstate";
import {
  queryInitialState,
  queryState,
} from "zkwasm-minirollup-browser/src/connect";
import { ConnectState } from "zkwasm-minirollup-browser";

export function LoadingController() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectNullableUserState);
  const config = useAppSelector(selectNullableConfig);
  const l2account = useAppSelector(selectL2Account);
  const connectState = useAppSelector(selectConnectState);
  const [inc, setInc] = useState(0);

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

  const onStart = async () => {
    const res = await getMemeList();
    dispatch(setMemeList({ memeList: res.data }));
  };

  const onStartGameplay = () => {
    scenario.status = "play";
  };

  if (config && userState?.player && Object.keys(userState.player).length > 0) {
    return <Gameplay />;
  } else {
    return (
      <ConnectController
        LoadingComponent={LoadingPage}
        WelcomeComponent={WelcomePage}
        onStart={onStart}
        onStartGameplay={onStartGameplay}
      />
    );
  }
}
