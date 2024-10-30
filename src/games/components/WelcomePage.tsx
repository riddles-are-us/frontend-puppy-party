import React from "react";
import { GameConnecting, GameLanding } from "../stage";
import { useAppSelector } from "../../app/hooks";
import { selectL1Account, selectL2Account } from "../../data/accountSlice";
import {
  selectMemeList,
  selectUIState,
  UIState,
} from "../../data/puppy_party/properties";
import WelcomePageProgressBar from "./WelcomePageProgressBar";
import "./WelcomePage.css";

interface Props {
  progress: number;
}

const WelcomePage = ({ progress }: Props) => {
  const memeList = useAppSelector(selectMemeList);
  const account = useAppSelector(selectL1Account);
  const l2account = useAppSelector(selectL2Account);
  const uIState = useAppSelector(selectUIState);

  if (uIState == UIState.Init) {
    return <GameConnecting hint="connect wallet" />;
  } else if (uIState == UIState.WelcomePage) {
    return <GameLanding memeList={memeList} />;
  } else {
    return <WelcomePageProgressBar progress={progress} />;
  }
};

export default WelcomePage;
