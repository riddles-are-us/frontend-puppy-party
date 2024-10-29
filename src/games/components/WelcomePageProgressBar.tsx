import React from "react";
import loading_background from "../images/progress_bar/loading_bg.png";
import connecting_background from "../images/progress_bar/connecting_bg.png";
import frame from "../images/progress_bar/frame.png";
import bar from "../images/progress_bar/bar.png";
import "./WelcomePageProgressBar.css";
import { useAppSelector } from "../../app/hooks";
import { selectUIState, UIState } from "../../data/puppy_party/properties";

interface Props {
  progress: number;
}

const WelcomePageProgressBar = ({ progress }: Props) => {
  const uIState = useAppSelector(selectUIState);

  return (
    <>
      <div className="welcome-page-progress-bar-container">
        <img
          src={
            uIState == UIState.Preloading
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
