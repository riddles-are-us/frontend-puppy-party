import React, { useEffect } from "react";
import { useAppSelector } from "../../app/hooks";
import { selectConfig, selectConnectState } from "../../data/state";
import LoadingPageConnecting from "./LoadingPageConnecting";
import LoadingPageProgressBar from "./LoadingPageProgressBar";
import "./LoadingPage.css";
import LandingPage from "./LandingPage";
import { ConnectState } from "zkwasm-minirollup-browser";
import { selectUIState, UIState } from "../../data/ui";

interface Props {
  progress: number;
}

const LoadingPage = ({ progress }: Props) => {
  return progress == 0 ? (
    <LoadingPageConnecting />
  ) : (
    <LoadingPageProgressBar progress={progress} />
  );
};

export default LoadingPage;
