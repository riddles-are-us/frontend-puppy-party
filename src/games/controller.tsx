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
import { GameLanding } from "./stage";
import TopMenu from "./components/TopMenu";
import Popups from "./components/Popups";

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
  const l2account = useAppSelector(selectL2Account);
  const uIState = useAppSelector(selectUIState);
  const [inc, setInc] = useState(0);
  const nonce = useAppSelector(selectNonce);
  const progress = useAppSelector(selectProgress);
  const progressRef = useRef(progress);
  const lastActionTimestamp = useAppSelector(selectLastActionTimestamp);
  const lastLotteryTimestamp = useAppSelector(selectLastLotteryTimestamp);
  const globalTimer = useAppSelector(selectGlobalTimer);
  const memeList = useAppSelector(selectMemeList);
  const targetMemeIndex = useAppSelector(selectTargetMemeIndex);
  const balance = useAppSelector(selectBalance);
  const lastTxResult = useAppSelector(selectLastTxResult);
  const [isWDModalVisible, setIsWDModalVisible] = useState(false);
  const [isWDResModalVisible, setIsWDResModalVisible] = useState(false);
  const [withdrawRes, setWithdrawRes] = useState("");
  const [targetMemeRank, setTargetMemeRank] = useState(0);
  const [amount, setAmount] = useState("");
  const [cooldown, setCooldown] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);

  console.log(
    "lastActionTimestamp",
    lastActionTimestamp,
    "globalTimer",
    globalTimer
  );

  const preloadImages = (urls: string[], onReady: () => void) => {
    let loadedCount = 0;
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;

      img.onload = () => {
        loadedCount++;
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

  // Update the ref value whenever `progress` changes
  useEffect(() => {
    progressRef.current = progress;

    // Reset to false
    if (progress == 1000) {
      dispatch(setUIState({ uIState: UIState.GiftboxPopup }));
    }
  }, [progress]);

  useEffect(() => {
    if (memeList[targetMemeIndex] != undefined) {
      setTargetMemeRank(memeList[targetMemeIndex].rank);
    }
  }, [targetMemeIndex, memeList]);

  useEffect(() => {
    const delta = globalTimer - lastActionTimestamp;
    if (delta > 2) {
      setCooldown(false);
    } else {
      setCooldown(true);
    }
    let rc = 0;
    if (lastLotteryTimestamp != 0) {
      rc = 10 - (globalTimer - lastLotteryTimestamp);

      if (rc < 0) {
        handleCancelRewards();
      }
    }
  }, [lastActionTimestamp, globalTimer]);

  useEffect(() => {
    const draw = (): void => {
      const analyserInfo = audioSystem.play();
      if (scenario.status === "play" && analyserInfo != null) {
        const ratioArray = getBeat(analyserInfo!);
        const progress = progressRef.current / 1000;
        scenario.draw(ratioArray, {
          progress,
          l2account,
          memeList,
        });
        scenario.step(ratioArray);
      }
    };

    // Set the interval
    const intervalId = setInterval(draw, 100); // 1000ms = 1 second

    // Cleanup function to clear the interval when the component unmounts
    return () => {
      clearInterval(intervalId);
    };
  }, []);

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
    if (uIState >= UIState.Idle) {
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
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
    if (l2account) {
      loginProcess();
    }
    updateConfigLoaded();
  }, [uIState, l2account]);

  useEffect(() => {
    if (l2account) {
      const requireContext = require.context(
        "./images",
        true,
        /\.(png|jpg|jpeg|gif)$/
      );
      const urls = requireContext.keys().map(requireContext) as string[];
      preloadImages(urls, () => {
        dispatch(setUIState({ uIState: UIState.QueryConfig }));
      });

      scenario.status = "play";
      console.log(l2account);

      const ele = document.getElementById("stage");
      ele!.style.transform = "translate(50%, -45%) scale(2)";
    }
  }, [l2account]);

  useEffect(() => {
    dispatch(loginL1AccountAsync());
    if (uIState == UIState.Init) {
      //dispatch(setUIState({ uIState: UIState.QueryConfig }));
      dispatch(getConfig());
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      updateState();
    }, 5000);
  }, [inc]);

  const account = useAppSelector(selectL1Account);
  console.log("l1 account:", account);

  function updateConfigLoaded() {
    if (uIState == UIState.Init || uIState == UIState.QueryConfig) {
      setConfigLoaded(false);
    } else {
      setConfigLoaded(true);
    }
  }

  function handleDiscoShakeFeet() {
    if (cooldown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(SHAKE_FEET, nonce, [
            BigInt(targetMemeIndex),
            0n,
            0n,
          ]),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      setTimeout(() => {
        scenario.restoreActor();
      }, 5000);
    }
  }

  function handleDiscoJump() {
    if (cooldown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(JUMP, nonce, [
            BigInt(targetMemeIndex),
            0n,
            0n,
          ]),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      setTimeout(() => {
        scenario.restoreActor();
      }, 5000);
    }
  }

  function handleDiscoShakeHeads() {
    if (cooldown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(SHAKE_HEADS, nonce, [
            BigInt(targetMemeIndex),
            0n,
            0n,
          ]),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      setTimeout(() => {
        scenario.restoreActor();
      }, 5000);
    }
  }

  function handleDiscoPostComments() {
    if (cooldown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(POST_COMMENTS, nonce, [
            BigInt(targetMemeIndex),
            0n,
            0n,
          ]),
          prikey: l2account!.address,
        })
      );
      dispatch(queryState({ cmd: [], prikey: l2account!.address }));
      setTimeout(() => {
        scenario.restoreActor();
      }, 5000);
    }
  }

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

  return (
    <>
      {!configLoaded && <div>Get Service Config ... </div>}
      {!l2account && account && configLoaded && (
        <GameLanding memeList={memeList}></GameLanding>
      )}
      {l2account && (
        <>
          <Popups />
          <TopMenu
            targetMemeIndex={targetMemeIndex}
            targetMemeRank={targetMemeRank}
          />

          <div className="center" id="stage">
            <canvas id="canvas"></canvas>
            <div className="stage-buttons">
              <div
                className={`button1 cd-${cooldown}`}
                onClick={handleDiscoShakeFeet}
              ></div>
              <div
                className={`button2 cd-${cooldown}`}
                onClick={handleDiscoJump}
              ></div>
              <div
                className={`button3 cd-${cooldown}`}
                onClick={handleDiscoShakeHeads}
              ></div>
              <div
                className={`button4 cd-${cooldown}`}
                onClick={handleDiscoPostComments}
              ></div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
