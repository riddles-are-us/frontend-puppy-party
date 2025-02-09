import React from "react";
import background from "../images/progress_bar/connecting_bg.png";
import frame from "../images/progress_bar/frame.png";
import bar from "../images/progress_bar/bar.png";
import "./LoadingPageConnecting.css";
import { useAppSelector } from "../../app/hooks";
import { selectConnectState } from "../../data/state";

const LoadingPageConnecting = () => {
  return (
    <>
      <div className="loading-page-connecting-container">
        <img src={background} className="loading-page-connecting-background" />
        <img src={frame} className="loading-page-connecting-frame" />
        <img src={bar} className="loading-page-connecting-bar" />
      </div>
    </>
  );
};

export default LoadingPageConnecting;
