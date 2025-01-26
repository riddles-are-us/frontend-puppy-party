import React, { useRef } from "react";
import "./ProgressBarElement.css";

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
