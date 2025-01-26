import React from "react";
import background from "../images/progress_bar/connecting_bg.png";
import frame from "../images/progress_bar/frame.png";
import bar from "../images/progress_bar/bar.png";
import "./WelcomePageConnecting.css";
import { useAppSelector } from "../../app/hooks";
import {selectConnectState} from "../../data/state";

const WelcomePageConnecting = () => {
  const connectState = useAppSelector(selectConnectState);

  return (
    <>
      <div className="welcome-page-connecting-container">
        <img src={background} className="welcome-page-connecting-background" />
        <img src={frame} className="welcome-page-connecting-frame" />
        <img src={bar} className="welcome-page-connecting-bar" />
      </div>
    </>
  );
};

export default WelcomePageConnecting;
