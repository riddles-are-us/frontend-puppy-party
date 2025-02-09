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
import WelcomePage from "./components/WelcomePage";
import { CREATE_PLAYER, getCreatePlayerTransactionParameter } from "./api";
import {
  getConfig,
  queryInitialState,
  queryState,
  sendTransaction,
} from "zkwasm-minirollup-browser/src/connect";
import { createCommand } from "zkwasm-minirollup-rpc";
import { getMemeList } from "./express";
import { setMemeList } from "../data/ui";

export function GameController() {
  const dispatch = useAppDispatch();
  const l1account = useAppSelector(AccountSlice.selectL1Account);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const connectState = useAppSelector(selectConnectState);
  const userState = useAppSelector(selectUserState);
  const gameConfig = useAppSelector(selectConfig);
  const [inc, setInc] = useState(0);
  const [progress, setProgress] = useState(0);

  const preloadImages = (urls: string[], onReady: () => void) => {
    let loadedCount = 0;
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        loadedCount++;
        setProgress(Math.ceil((loadedCount / urls.length) * 8000) / 100);
        if (loadedCount === urls.length) {
          onReady();
        }
      };

      img.onerror = () => {
        console.error(`Failed to load image: ${url}`);
        loadedCount++;
        if (loadedCount === urls.length) {
          onReady();
        }
      };
    });
  };

  // update State
  function updateState() {
    if (connectState == ConnectState.Idle && l2account) {
      dispatch(queryState(l2account!.address));
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

  // login L2 account
  useEffect(() => {
    if (l2account && connectState == ConnectState.QueryState) {
      dispatch(queryState(l2account!.address));
    } else {
      dispatch(queryInitialState("1"));
    }
  }, [l2account]);

  // login L1 account
  useEffect(() => {
    dispatch(AccountSlice.loginL1AccountAsync());
  }, []);

  useEffect(() => {
    getMemeList().then((res) => {
      dispatch(setMemeList({ memeList: res.data }));
    });
  }, []);

  useEffect(() => {
    if (connectState == ConnectState.Init) {
      dispatch(setConnectState(ConnectState.Loading));
    }
  }, [l1account]);

  useEffect(() => {
    if (connectState == ConnectState.InstallPlayer) {
      const command = createCommand(0n, CREATE_PLAYER, []);
      dispatch(
        sendTransaction({
          cmd: command,
          prikey: l2account!.address,
        })
      );
    }
  }, [connectState]);

  useEffect(() => {
    if (l2account) {
      scenario.status = "play";
    }
  }, [l2account]);

  useEffect(() => {
    //    if (connectState == ConnectState.Loading) {
    const requireContext = require.context(
      "./images",
      true,
      /\.(png|jpg|jpeg|gif)$/
    );
    const urls = requireContext.keys().map(requireContext) as string[];
    preloadImages(urls, () => {
      dispatch(getConfig());
      // switch to get state
    });
    //  }
  }, []);

  if (gameConfig && userState?.player) {
    return <Gameplay />;
  } else {
    return <WelcomePage progress={progress} />;
  }
}
