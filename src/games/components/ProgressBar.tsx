import React, { useEffect, useRef, useState } from "react";
import progressBarBackground from "../images/progress_bar_bg.png";
import niceImage from "../images/nice.png";
import goodJobImage from "../images/good_job.png";

import "./ProgressBar.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectLotteryInfo,
  selectShowProgressBarGoodJob,
  selectShowProgressBarNice,
  setUIState,
  UIState,
} from "../../data/puppy_party/properties";
import Grid from "./Grid";
import ProgressBarElement from "./ProgressBarElement";
import LotteryHeatButton from "./buttons/LotteryHeatButton";

const colorMap = [
  "#4747D6",
  "#5D5DF4",
  "#7070F9",
  "#8383FF",
  "#85A5FF",
  "#6EA4F9",
  "#85D3FF",
  "#85F1FF",
  "#5BEFD6",
  "#50FFC5",
  "#67F496",
  "#39EA6A",
  "#29CE6F",
  "#04B267",
];
const whiteColor = "#FFFFFF";
const colorWidth = 3;
const roundColorMap = [...colorMap, ...colorMap.slice(0, -1).reverse()];
const barWidth = 86;

interface Props {
  progress: number;
}

const ProgressBar = ({ progress }: Props) => {
  const dispatch = useAppDispatch();
  const showProgressBarGoodJob = useAppSelector(selectShowProgressBarGoodJob);
  const showProgressBarNice = useAppSelector(selectShowProgressBarNice);
  const lotteryInfo = useAppSelector(selectLotteryInfo);
  const [colorOffset, setColorOffset] = useState(0);
  const colorOffsetRef = useRef(0);

  const colorLength = Math.floor(progress * barWidth);
  const colors = Array.from({ length: colorLength }, (_, index) => {
    const colorIndex = Math.floor(index / colorWidth);
    return progress < 1 && index == colorLength - 1
      ? whiteColor
      : roundColorMap[
          (colorIndex - colorOffset + roundColorMap.length) %
            roundColorMap.length
        ];
  });

  useEffect(() => {
    const updateColorOffset = (): void => {
      colorOffsetRef.current =
        (colorOffsetRef.current + 1) % roundColorMap.length;
      setColorOffset(colorOffsetRef.current);
    };

    const intervalId = setInterval(updateColorOffset, 80);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onClickLotteryHeatButton = () => {
    dispatch(setUIState({ uIState: UIState.LotteryHeatPopup }));
  };

  return (
    <div className="progress-bar-container">
      <img src={progressBarBackground} className="progress-bar-background" />
      <div className="progress-bar-lottery-heat-button">
        <LotteryHeatButton
          isDisabled={lotteryInfo <= 0}
          onClick={onClickLotteryHeatButton}
        />
      </div>
      <div className="progress-bar-lottery-text">
        {lotteryInfo > 0
          ? `Lottery Heat: ${lotteryInfo}`
          : "Nothing to Cashout"}
      </div>
      {showProgressBarGoodJob && (
        <img src={goodJobImage} className="progress-bar-good-job-image" />
      )}
      {showProgressBarNice && (
        <img src={niceImage} className="progress-bar-nice-image" />
      )}
      <div className="progress-bar-progress-grid">
        {colors.map((color, index) => (
          <ProgressBarElement key={index} color={color} />
        ))}
      </div>
      <div className="progress-bar-gift-animation" />
    </div>
  );
};

export default ProgressBar;
