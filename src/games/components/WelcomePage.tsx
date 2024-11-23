import React from "react";
import { GameConnecting, GameLanding } from "../stage";
import { useAppSelector } from "../../app/hooks";
import {
  selectMemeList,
  selectUIState,
  UIState,
} from "../../data/puppy_party/properties";
import WelcomePageConnecting from "./WelcomePageConnecting";
import WelcomePageProgressBar from "./WelcomePageProgressBar";
import "./WelcomePage.css";

interface Props {
  progress: number;
}

const WelcomePage = ({ progress }: Props) => {
  const memeList = useAppSelector(selectMemeList);
  const uIState = useAppSelector(selectUIState);

  if (uIState == UIState.Init) {
    return <WelcomePageConnecting />;
  } else if (uIState == UIState.ConnectionError) {
    return <WelcomePageConnecting />;
  } else if (uIState == UIState.Preloading) {
    return <WelcomePageProgressBar progress={progress} />;
  } else if (uIState == UIState.QueryConfig) {
    return <WelcomePageProgressBar progress={80} />;
  } else if (uIState == UIState.QueryState) {
    return <WelcomePageProgressBar progress={90} />;
  } else if (uIState == UIState.WelcomePage) {
    return <GameLanding memeList={memeList} />;
  } else {
    return null;
  }
};

export default WelcomePage;
