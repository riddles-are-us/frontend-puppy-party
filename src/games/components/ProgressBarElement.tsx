import React, { useRef } from "react";
import progressBarBackground from "../images/progress_bar_bg.png";
import frontImage from "../images/progress_bar_front.png";
import niceImage from "../images/nice.png";
import goodJobImage from "../images/good_job.png";
import "./ProgressBarElement.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  selectShowProgressBarGoodJob,
  selectShowProgressBarNice,
} from "../../data/puppy_party/properties";
import Grid from "./Grid";

interface Props {
  color: string;
}

const ProgressBarElement = ({ color }: Props) => {
  return (
    <div className="progress-bar-element-container">
      <div className="progress-bar-element-unit-container">
        <div
          className="progress-bar-element-unit-image"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <div className="progress-bar-element-unit-container">
        <div
          className="progress-bar-element-unit-image"
          style={{ backgroundColor: color }}
        ></div>
      </div>
      <div className="progress-bar-element-unit-container">
        <div
          className="progress-bar-element-unit-image"
          style={{ backgroundColor: color }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBarElement;
