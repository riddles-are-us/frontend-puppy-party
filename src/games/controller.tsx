import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { scenario } from "./scenario";
import { getConfig, sendTransaction, queryState } from "./request";
import {
  UIState,
  selectUIState,
  setUIState,
  selectNonce,
} from "../data/puppy_party/properties";
import { AccountSlice } from "zkwasm-minirollup-browser";
import "./style.scss";
import Gameplay from "./components/Gameplay";
import WelcomePage from "./components/WelcomePage";
import { getCreatePlayerTransactionParameter } from "./api";

//import cover from "./images/towerdefence.jpg";

export function GameController() {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AccountSlice.selectL1Account);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const uIState = useAppSelector(selectUIState);
  const [inc, setInc] = useState(0);
  const nonce = useAppSelector(selectNonce);
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

  useEffect(() => {
    dispatch(AccountSlice.loginL1AccountAsync());
  }, []);

  useEffect(() => {
    if (uIState == UIState.Init) {
      dispatch(setUIState({ uIState: UIState.Preloading }));
    }
  }, [account]);

  function createPlayer() {
    try {
      dispatch(
        sendTransaction(getCreatePlayerTransactionParameter(l2account!, nonce))
      );
    } catch (e) {
      console.log("Error at create player " + e);
    }
  }

  function updateState() {
    if (l2account) {
      if (uIState >= UIState.Idle) {
        dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      }
    }
    setInc(inc + 1);
  }

  function loginProcess() {
    if (uIState == UIState.QueryState) {
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
    } else if (uIState == UIState.CreatePlayer) {
      createPlayer();
    }
  }

  useEffect(() => {
    loginProcess();
  }, [uIState]);

  useEffect(() => {
    if (l2account) {
      dispatch(setUIState({ uIState: UIState.QueryState }));
      scenario.status = "play";
    }
  }, [l2account]);

  useEffect(() => {
    if (uIState == UIState.Preloading) {
      const requireContext = require.context(
        "./images",
        true,
        /\.(png|jpg|jpeg|gif)$/
      );
      const urls = requireContext.keys().map(requireContext) as string[];
      preloadImages(urls, () => {
        dispatch(setUIState({ uIState: UIState.QueryConfig }));
        dispatch(getConfig());
      });
    }
  }, [uIState]);

  useEffect(() => {
    setTimeout(() => {
      updateState();
    }, 5000);
  }, [inc]);

  if (uIState >= UIState.Idle) {
    return <Gameplay />;
  } else {
    return <WelcomePage progress={progress} />;
  }
}
