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
  selectGiftboxShake,
  setGiftboxShake,
} from "../../data/puppy_party/properties";
import { selectL2Account } from "../../data/accountSlice";
import { getBeat } from "../draw";
import { queryState, sendTransaction } from "../request";
import { getTransactionCommandArray } from "../rpc";
import "./Gameplay.css";
import StageButtons from "./StageButtons";

const CREATE_PLAYER = 1n;
const SHAKE_FEET = 2n;
const JUMP = 3n;
const SHAKE_HEADS = 4n;
const POST_COMMENTS = 5n;
const LOTTERY = 6n;
const CANCELL_LOTTERY = 7n;
const WITHDRAW = 8n;
const COOL_DOWN = 2;

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
  const giftboxShake = useAppSelector(selectGiftboxShake);
  const targetMemeIndex = useAppSelector(selectTargetMemeIndex);
  const [targetMemeRank, setTargetMemeRank] = useState(0);
  const [danceButtonProgress, setDanceButtonProgress] = useState(0);
  const [isDanceButtonCoolDown, setIsDanceButtonCoolDown] = useState(false);
  const giftboxShakeRef = useRef(false);

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
          giftboxShake: giftboxShakeRef.current,
        });
        if (giftboxShakeRef.current) {
          dispatch(setGiftboxShake({ giftboxShake: false }));
        }
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

  useEffect(() => {
    giftboxShakeRef.current = giftboxShake;
  }, [giftboxShake]);

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
    const progress = Math.min(Math.max(delta / COOL_DOWN, 0), 1);
    setDanceButtonProgress(progress);
    setIsDanceButtonCoolDown(delta >= COOL_DOWN);
    if (lastLotteryTimestamp != 0 && 10 < globalTimer - lastLotteryTimestamp) {
      //   handleCancelRewards();
    }
  }, [lastActionTimestamp, globalTimer]);

  function handleDiscoShakeFeet() {
    if (isDanceButtonCoolDown == false) {
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
    if (isDanceButtonCoolDown == false) {
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
    if (isDanceButtonCoolDown == false) {
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
    if (isDanceButtonCoolDown == false) {
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
        <StageButtons
          //   danceButtonProgress={danceButtonProgress}
          danceButtonProgress={0.8}
          handleDiscoShakeFeet={handleDiscoShakeFeet}
        />
        {/* <div className="stage-buttons"> */}
        {/* <DanceMusicButton isDisabled={false} onClick={handleDiscoShakeFeet} /> */}
        {/* <div
            className={`button1 cd-${cooldown}`}
            onClick={handleDiscoShakeFeet}
          ></div> */}
        {/* <div
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
          ></div> */}
        {/* </div> */}
      </div>
    </>
  );
};

export default Gameplay;
