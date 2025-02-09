import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectConfig, selectConnectState } from "../../data/state";
import WelcomePageConnecting from "./WelcomePageConnecting";
import WelcomePageProgressBar from "./WelcomePageProgressBar";
import "./WelcomePage.css";
import LandingPage from "./LandingPage";
import { ConnectState } from "zkwasm-minirollup-browser";
import { selectUIState, UIState } from "../../data/ui";

interface Props {
  progress: number;
}

const WelcomePage = ({ progress }: Props) => {
  const connectState = useAppSelector(selectConnectState);
  const config = useAppSelector(selectConfig);

  useEffect(() => {
    console.log("connectState", ConnectState[connectState]);
  }, [connectState]);

  if (connectState == ConnectState.Init) {
    return <WelcomePageConnecting />;
  } else if (connectState == ConnectState.ConnectionError) {
    return <WelcomePageConnecting />;
  } else if (connectState == ConnectState.Loading) {
    return <WelcomePageProgressBar progress={progress} />;
  } else if (connectState == ConnectState.QueryConfig) {
    return <WelcomePageProgressBar progress={80} />;
  } else if (connectState == ConnectState.QueryState) {
    return <WelcomePageProgressBar progress={90} />;
    //} else if (uiState == UIState.WelcomePage) {
  } else if (config) {
    return <LandingPage />;
  } else {
    return <LandingPage />;
    //return null;
  }
};

export default WelcomePage;
