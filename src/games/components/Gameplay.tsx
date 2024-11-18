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
import { queryState, sendTransaction, SERVER_TICK_TO_SECOND } from "../request";
import { getTransactionCommandArray } from "../rpc";
import "./Gameplay.css";
import StageButtons from "./StageButtons";

const CREATE_PLAYER = 1n;
const DANCE_MUSIC = 2n;
const DANCE_SIDE = 3n;
const DANCE_TURN = 4n;
const DANCE_UP = 5n;
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
  const [lastDanceActionTimeCache, setLastDanceActionTimeCache] = useState(0);
  const lastLotteryTimestamp = useAppSelector(selectLastLotteryTimestamp);
  const memeList = useAppSelector(selectMemeList);
  const giftboxShake = useAppSelector(selectGiftboxShake);
  const targetMemeIndex = useAppSelector(selectTargetMemeIndex);
  const [targetMemeRank, setTargetMemeRank] = useState(0);
  const [danceButtonProgress, setDanceButtonProgress] = useState(0);
  const [isDanceButtonCoolDown, setIsDanceButtonCoolDown] = useState(false);
  const giftboxShakeRef = useRef(false);

  // start localTimer region

  const globalTimer = useAppSelector(selectGlobalTimer);
  const [globalTimerCache, setGlobalTimerCache] = useState(globalTimer);
  const [localTimer, setLocalTimer] = useState(globalTimer);
  const [visibilityChange, setVisibilityChange] = useState(false);
  const startTimeRef = useRef<number>(0);
  const animationFrameIdRef = useRef<number | null>(null);
  const elapsedTimeMultiplierRef = useRef<number>(1);
  const lastLocalTimerRef = useRef<number>(globalTimer);

  const resetStartTimeRef = () => {
    startTimeRef.current = 0;
    lastLocalTimerRef.current =
      Math.abs(globalTimerCache - localTimer) > SERVER_TICK_TO_SECOND
        ? globalTimerCache
        : localTimer;
  };

  const handleVisibilityChange = () => {
    if (document.visibilityState === "visible") {
      setVisibilityChange(true);
    }
  };

  useEffect(() => {
    const updateProgress = (timestamp: DOMHighResTimeStamp) => {
      if (startTimeRef.current === 0) {
        startTimeRef.current = timestamp;
      }

      setLocalTimer(
        lastLocalTimerRef.current +
          ((timestamp - startTimeRef.current) / 1000) *
            elapsedTimeMultiplierRef.current
      );
      animationFrameIdRef.current = requestAnimationFrame(updateProgress);
    };

    resetStartTimeRef();
    elapsedTimeMultiplierRef.current = Math.max(
      Math.min(
        (globalTimerCache - lastLocalTimerRef.current + SERVER_TICK_TO_SECOND) /
          SERVER_TICK_TO_SECOND,
        1.2
      ),
      0.8
    );

    if (animationFrameIdRef.current !== null) {
      cancelAnimationFrame(animationFrameIdRef.current);
    }
    animationFrameIdRef.current = requestAnimationFrame(updateProgress);

    setVisibilityChange(false);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      if (animationFrameIdRef.current !== null) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      resetStartTimeRef();
    };
  }, [uIState, globalTimerCache, visibilityChange]);

  useEffect(() => {
    setGlobalTimerCache(globalTimer);
  }, [globalTimer]);

  // end localTimer region

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

    // assume that whenever the dance button is clicked, the progress will be updated and return a non-zero positive value
    if (progress > 0) {
      setLastDanceActionTimeCache(localTimer);
    }

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
    const delta = localTimer - lastDanceActionTimeCache;
    const progress = Math.min(Math.max(delta / COOL_DOWN, 0), 1);
    setDanceButtonProgress(progress);
    setIsDanceButtonCoolDown(delta < COOL_DOWN);
    if (lastLotteryTimestamp != 0 && 10 < localTimer - lastLotteryTimestamp) {
      handleCancelRewards();
    }
  }, [lastDanceActionTimeCache, localTimer]);

  function handleCancelRewards() {
    dispatch(
      sendTransaction({
        cmd: getTransactionCommandArray(CANCELL_LOTTERY, nonce, [0n, 0n, 0n]),
        prikey: l2account!.address,
      })
    );
    dispatch(queryState({ cmd: [], prikey: l2account!.address }));
  }

  function onClickMusicButton() {
    if (isDanceButtonCoolDown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(DANCE_MUSIC, nonce, [
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

  function onClickSideButton() {
    if (isDanceButtonCoolDown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(DANCE_SIDE, nonce, [
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

  function onClickTurnButton() {
    if (isDanceButtonCoolDown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(DANCE_TURN, nonce, [
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

  function onClickUpButton() {
    if (isDanceButtonCoolDown == false) {
      scenario.focusActor(440, 190);
      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(DANCE_UP, nonce, [
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
          danceButtonProgress={danceButtonProgress}
          onClickMusicButton={onClickMusicButton}
          onClickSideButton={onClickSideButton}
          onClickTurnButton={onClickTurnButton}
          onClickUpButton={onClickUpButton}
        />
      </div>
    </>
  );
};

export default Gameplay;
