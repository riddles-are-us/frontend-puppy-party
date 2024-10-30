import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Container, Row } from "react-bootstrap";
import { ClipRect, Clip, getBeat } from "./draw";
import { loadAudio2, loadAudio, AnalyserInfo, audioSystem } from "./audio";
import { scenario } from "./scenario";
import { getConfig, sendTransaction, queryState } from "./request";
import {
  UIState,
  selectUIState,
  setUIState,
  selectNonce,
  selectProgress,
  selectLastActionTimestamp,
  selectGlobalTimer,
  selectMemeList,
  selectLastLotteryTimestamp,
  selectBalance,
  selectLastTxResult,
  selectTargetMemeIndex,
} from "../data/puppy_party/properties";
import { getTransactionCommandArray } from "./rpc";
import {
  selectL2Account,
  selectL1Account,
  loginL2AccountAsync,
  loginL1AccountAsync,
} from "../data/accountSlice";
import "./style.scss";
import BN from "bn.js";
import Gameplay from "./components/Gameplay";
import WelcomePage from "./components/WelcomePage";

//import cover from "./images/towerdefence.jpg";

const CREATE_PLAYER = 1n;
const SHAKE_FEET = 2n;
const JUMP = 3n;
const SHAKE_HEADS = 4n;
const POST_COMMENTS = 5n;
const LOTTERY = 6n;
const CANCELL_LOTTERY = 7n;
const WITHDRAW = 8n;

export function GameController() {
  const dispatch = useAppDispatch();
  const account = useAppSelector(selectL1Account);
  const l2account = useAppSelector(selectL2Account);
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
        setProgress(Math.ceil((loadedCount / urls.length) * 10000) / 100);
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
    dispatch(loginL1AccountAsync());
  }, []);

  useEffect(() => {
    dispatch(getConfig());
  }, [account]);

  function createPlayer() {
    try {
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(CREATE_PLAYER, nonce, [0n, 0n, 0n]),
          prikey: l2account!.address,
        })
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
      const requireContext = require.context(
        "./images",
        true,
        /\.(png|jpg|jpeg|gif)$/
      );
      const urls = requireContext.keys().map(requireContext) as string[];
      dispatch(setUIState({ uIState: UIState.Preloading }));
      preloadImages(urls, () => {
        dispatch(setUIState({ uIState: UIState.QueryState }));
      });

      scenario.status = "play";
      console.log(l2account);
    }
  }, [l2account]);

  useEffect(() => {
    setTimeout(() => {
      updateState();
    }, 5000);
  }, [inc]);

  function handleRedeemRewards() {
    dispatch(
      sendTransaction({
        cmd: getTransactionCommandArray(LOTTERY, nonce, [0n, 0n, 0n]),
        prikey: l2account!.address,
      })
    );
    dispatch(queryState({ cmd: [], prikey: l2account!.address }));
  }

  function handleCancelRewards() {
    dispatch(
      sendTransaction({
        cmd: getTransactionCommandArray(CANCELL_LOTTERY, nonce, [0n, 0n, 0n]),
        prikey: l2account!.address,
      })
    );
    dispatch(queryState({ cmd: [], prikey: l2account!.address }));
  }

  if (uIState >= UIState.Idle) {
    return <Gameplay />;
  } else {
    return <WelcomePage progress={progress} />;
  }
}
