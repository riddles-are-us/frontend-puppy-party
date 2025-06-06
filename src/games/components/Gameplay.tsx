import React, { useEffect, useRef, useState, MouseEvent } from "react";
import Popups from "./Popups";
import TopMenu from "./TopMenu";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { audioSystem } from "../audio";
import { AccountSlice } from "zkwasm-minirollup-browser";
import { getBeat } from "../draw";
import "./Gameplay.css";
import StageButtons from "./StageButtons";
import ProgressBar from "./ProgressBar";
import {
  getDanceTransactionParameter,
  getLotteryransactionParameter,
} from "../api";
import { MemeListElement, selectUserState } from "../../data/state";
import { sendTransaction } from "zkwasm-minirollup-browser/src/connect";
import {
  selectGiftboxShake,
  selectProgressReset,
  selectTargetMemeIndex,
  selectUIState,
  setGiftboxShake,
  setPopupDescription,
  setProgressReset,
  setTargetMemeIndex,
  setUIState,
  UIState,
} from "../../data/ui";
import { Scenario } from "../scenario";
import { selectCurrentMemes, setMemeModelMap } from "../../data/memeDatas";
import { MemeData, MemeProp } from "../season";
import { getMemeModelMap } from "../express";

const COOL_DOWN = 2;
const PROGRESS_LOTTERY_THRESHOLD = 1000;
const MIN_PROGRESS_UPDATE = 30;
const PROGRESS_UPDATE_RATE = 0.2;
const PROGRESS_COUNTING_DOWN_SPEED = 10;

const SERVER_TICK_TO_SECOND = 5;

export enum DanceType {
  None,
  Vote,
  Stake,
  Collect,
  Comment,
}

const Gameplay = () => {
  const dispatch = useAppDispatch();
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const userState = useAppSelector(selectUserState);
  const uIState = useAppSelector(selectUIState);
  const isCountingDownRef = useRef(false);
  const progressRef = useRef(userState.player!.data.progress);
  const displayProgressRef = useRef(userState.player!.data.progress);
  const [displayProgress, setDisplayProgress] = useState(0);
  const currentMemes = useAppSelector(selectCurrentMemes);
  const currentMemesRef = useRef<MemeProp[]>([]);
  const [scenario, setScenario] = useState(new Scenario(currentMemes));

  const giftboxShake = useAppSelector(selectGiftboxShake);
  const progressReset = useAppSelector(selectProgressReset);
  const targetMemeIndex = useAppSelector(selectTargetMemeIndex);

  const isDanceButtonCoolDownLocalRef = useRef(false);
  const isDanceButtonCoolDownGlobalRef = useRef(false);
  const [isDanceButtonCoolDownLocal, setIsDanceButtonCoolDownLocal] =
    useState(false);
  const danceButtonProgressRef = useRef(0);
  const [danceButtonProgress, setDanceButtonProgress] = useState(0);

  const [currentDanceType, setCurrentDanceType] = useState(DanceType.None);

  const giftboxShakeRef = useRef(false);
  const progressResetRef = useRef(false);

  const canvasRef = React.createRef<HTMLCanvasElement>();

  const updateDisplayProgressRef = () => {
    if (progressRef.current == 0) {
      displayProgressRef.current = 0;
      setDisplayProgress(0);
      return;
    }

    if (isCountingDownRef.current) {
      displayProgressRef.current -= PROGRESS_COUNTING_DOWN_SPEED;
      if (displayProgressRef.current <= 0) {
        handleCancelRewards();
        displayProgressRef.current = 0;
        progressRef.current = 0;
        isCountingDownRef.current = false;
        dispatch(setUIState({ uIState: UIState.Idle }));
      }
    } else {
      if (
        progressResetRef.current == false &&
        progressRef.current > displayProgressRef.current
      ) {
        const progressStep =
          (progressRef.current - displayProgressRef.current) *
          PROGRESS_UPDATE_RATE;
        displayProgressRef.current = Math.min(
          displayProgressRef.current +
            Math.max(progressStep, MIN_PROGRESS_UPDATE),
          PROGRESS_LOTTERY_THRESHOLD
        );
      }
    }

    setDisplayProgress(displayProgressRef.current);
    if (displayProgressRef.current == PROGRESS_LOTTERY_THRESHOLD) {
      isCountingDownRef.current = true;
      dispatch(setUIState({ uIState: UIState.GiftboxPopup }));
    }
  };

  const updateDanceButtonCooldown = () => {
    if (isDanceButtonCoolDownLocalRef.current) {
      const ups = 10;
      const baseProgress = 1 / (COOL_DOWN * SERVER_TICK_TO_SECOND * ups);
      if (danceButtonProgressRef.current >= 1) {
        isDanceButtonCoolDownLocalRef.current = false;
        setIsDanceButtonCoolDownLocal(false);
      } else if (
        danceButtonProgressRef.current < 0.8 ||
        isDanceButtonCoolDownGlobalRef.current == false
      ) {
        danceButtonProgressRef.current += baseProgress;
      } else {
        danceButtonProgressRef.current += Math.min(
          ((1 - danceButtonProgressRef.current) * 0.5) / ups,
          baseProgress
        );
      }
      setDanceButtonProgress(danceButtonProgressRef.current);
    }
  };

  useEffect(() => {
    const draw = (): void => {
      const analyserInfo = audioSystem.play();
      if (scenario.status === "play" && analyserInfo != null) {
        const ratioArray = getBeat(analyserInfo!);

        updateDisplayProgressRef();

        scenario.draw(ratioArray, {
          l2account,
          currentMemes: currentMemesRef.current,
          giftboxShake: giftboxShakeRef.current,
        });
        if (giftboxShakeRef.current) {
          dispatch(setGiftboxShake({ giftboxShake: false }));
        }
        scenario.step(ratioArray);

        updateDanceButtonCooldown();
      }
    };

    scenario.init();
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

  useEffect(() => {
    currentMemesRef.current = currentMemes;
  }, [currentMemes]);

  useEffect(() => {
    progressResetRef.current = progressReset;
    if (progressReset) {
      isCountingDownRef.current = false;
      displayProgressRef.current = 0;
      setDisplayProgress(0);
    }
  }, [progressReset]);

  useEffect(() => {
    progressRef.current = userState.player!.data.progress;
    dispatch(setProgressReset({ progressReset: false }));
    isDanceButtonCoolDownGlobalRef.current =
      userState.state.counter * SERVER_TICK_TO_SECOND <
      userState.player!.data.last_action_timestamp + COOL_DOWN;
  }, [userState]);

  function handleCancelRewards() {
    dispatch(
      sendTransaction(
        getLotteryransactionParameter(
          l2account!,
          BigInt(userState.player!.nonce)
        )
      )
    );
  }

  const checkDanceButtonCoolDownAndTicketAmount = () => {
    if (isDanceButtonCoolDownLocalRef.current) {
      return false;
    }
    if (userState.player!.data.ticket == 0) {
      dispatch(
        setPopupDescription({
          popupDescription: "Not Enough Ticket",
        })
      );
      dispatch(setUIState({ uIState: UIState.ErrorPopup }));
      return false;
    }
    return true;
  };

  const startDance = (danceType: DanceType) => {
    isDanceButtonCoolDownLocalRef.current = true;
    setIsDanceButtonCoolDownLocal(true);
    danceButtonProgressRef.current = 0;
    setCurrentDanceType(danceType);

    scenario.focusActor(440, 190, danceType);
    setTimeout(() => {
      scenario.restoreActor();
    }, 8000);
  };

  const onClickVoteButton = () => () => {
    if (checkDanceButtonCoolDownAndTicketAmount()) {
      startDance(DanceType.Vote);

      dispatch(
        sendTransaction(
          getDanceTransactionParameter(
            l2account!,
            DanceType.Vote,
            currentMemes[targetMemeIndex].data.id,
            BigInt(userState.player!.nonce)
          )
        )
      ).then(async (action) => {
        if (sendTransaction.fulfilled.match(action)) {
          const memeModelMap = await getMemeModelMap();
          dispatch(setMemeModelMap({ memeModelMap }));
        }
      });
    }
  };

  const onClickStakeButton = () => () => {
    if (checkDanceButtonCoolDownAndTicketAmount()) {
      dispatch(setUIState({ uIState: UIState.StakePopup }));
    }
  };

  const onClickCollectButton = () => () => {
    if (checkDanceButtonCoolDownAndTicketAmount()) {
      startDance(DanceType.Collect);

      dispatch(
        sendTransaction(
          getDanceTransactionParameter(
            l2account!,
            DanceType.Collect,
            currentMemes[targetMemeIndex].data.id,
            BigInt(userState.player!.nonce)
          )
        )
      ).then(async (action) => {
        if (sendTransaction.fulfilled.match(action)) {
          const memeModelMap = await getMemeModelMap();
          dispatch(setMemeModelMap({ memeModelMap }));
        }
      });
    }
  };

  const onClickCommentButton = () => () => {
    if (checkDanceButtonCoolDownAndTicketAmount()) {
      startDance(DanceType.Comment);

      dispatch(
        sendTransaction(
          getDanceTransactionParameter(
            l2account!,
            DanceType.Comment,
            currentMemes[targetMemeIndex].data.id,
            BigInt(userState.player!.nonce)
          )
        )
      ).then(async (action) => {
        if (sendTransaction.fulfilled.match(action)) {
          const memeModelMap = await getMemeModelMap();
          dispatch(setMemeModelMap({ memeModelMap }));
        }
      });
    }
  };

  useEffect(() => {
    if (uIState == UIState.FinishStake) {
      startDance(DanceType.Stake);
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  }, [uIState]);

  function onHoverCanvas(e: MouseEvent<HTMLCanvasElement>) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const ratio = rect.width / 960;
    //const left = (e.clientX - rect.left) * rect.width / 960;
    //const top = (e.clientY - rect.top) * rect.width / 960;
    const left = ((e.clientX - rect.left) * 960) / rect.width;
    const top = ((e.clientY - rect.top) * 960) / rect.width;
    scenario.hoverMeme(left, top);
    return;
  }

  function onClickCanvas(e: MouseEvent<HTMLCanvasElement>) {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const left = ((e.clientX - rect.left) * 960) / rect.width;
    const top = ((e.clientY - rect.top) * 960) / rect.width;
    const memeIndex = scenario.selectMeme(left, top);

    if (memeIndex != null) {
      dispatch(setTargetMemeIndex(memeIndex));
    }
    return;
  }

  return (
    <>
      <Popups />
      <TopMenu targetMemeIndex={targetMemeIndex} />

      <div className="center" id="stage">
        <canvas
          id="canvas"
          onMouseMove={onHoverCanvas}
          onClick={onClickCanvas}
          ref={canvasRef}
        ></canvas>
        <ProgressBar progress={displayProgress / PROGRESS_LOTTERY_THRESHOLD} />
        <StageButtons
          isCoolDown={isDanceButtonCoolDownLocal}
          progress={danceButtonProgress}
          currentDanceType={currentDanceType}
          onClickVoteButton={onClickVoteButton}
          onClickStakeButton={onClickStakeButton}
          onClickCollectButton={onClickCollectButton}
          onClickCommentButton={onClickCommentButton}
        />
      </div>
    </>
  );
};

export default Gameplay;
