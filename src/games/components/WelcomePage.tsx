import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectUIState, UIState } from "../../data/puppy_party/properties";
import WelcomePageConnecting from "./WelcomePageConnecting";
import WelcomePageProgressBar from "./WelcomePageProgressBar";
import "./WelcomePage.css";
import LandingPage from "./LandingPage";

interface Props {
  progress: number;
}

const WelcomePage = ({ progress }: Props) => {
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
    return <LandingPage />;
  } else {
    return null;
  }
};

export default WelcomePage;
