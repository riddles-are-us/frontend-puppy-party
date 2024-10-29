import React, { useEffect, useRef, useState } from "react";
import Popups from "./Popups";
import TopMenu from "./TopMenu";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { scenario } from "../scenario";
import { audioSystem } from "../audio";
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
  selectTargetMemeIndex,
} from "../../data/puppy_party/properties";
import { selectL2Account } from "../../data/accountSlice";
import { getBeat } from "../draw";
import { queryState, sendTransaction } from "../request";
import { getTransactionCommandArray } from "../rpc";
import "./Gameplay.css";

const CREATE_PLAYER = 1n;
const SHAKE_FEET = 2n;
const JUMP = 3n;
const SHAKE_HEADS = 4n;
const POST_COMMENTS = 5n;
const LOTTERY = 6n;
const CANCELL_LOTTERY = 7n;
const WITHDRAW = 8n;

const Gameplay = () => {
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
  const [targetMemeRank, setTargetMemeRank] = useState(0);
  const [cooldown, setCooldown] = useState(false);

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
        //   handleCancelRewards();
      }
    }
  }, [lastActionTimestamp, globalTimer]);

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

  return (
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
  );
};

export default Gameplay;
