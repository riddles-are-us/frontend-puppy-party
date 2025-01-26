import React from "react";
import loading_background from "../images/progress_bar/loading_bg.png";
import connecting_background from "../images/progress_bar/connecting_bg.png";
import frame from "../images/progress_bar/frame.png";
import bar from "../images/progress_bar/bar.png";
import "./WelcomePageProgressBar.css";
import { useAppSelector } from "../../app/hooks";
import {selectConnectState} from "../../data/state";
import {ConnectState} from "zkwasm-minirollup-browser";

interface Props {
  progress: number;
}

const WelcomePageProgressBar = ({ progress }: Props) => {
  const connectingState = useAppSelector(selectConnectState);

  return (
    <>
      <div className="welcome-page-progress-bar-container">
        <img
          src={
            connectingState == ConnectState.Loading
              ? loading_background
              : connecting_background
          }
          className="welcome-page-progress-bar-background"
        />
        <img src={frame} className="welcome-page-progress-bar-frame" />
        <img
          src={bar}
          className="welcome-page-progress-bar-bar"
          style={{
            clipPath: `polygon(${progress}% 0,  ${progress}% 100%, 0 100%, 0 0)`,
          }}
        />
      </div>
    </>
  );
};

export default WelcomePageProgressBar;
