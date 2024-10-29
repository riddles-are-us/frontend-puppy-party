import React from "react";
import { GameConnecting, GameLanding } from "../stage";
import { useAppSelector } from "../../app/hooks";
import { selectL1Account, selectL2Account } from "../../data/accountSlice";
import { selectMemeList } from "../../data/puppy_party/properties";
import WelcomePageProgressBar from "./WelcomePageProgressBar";

interface Props {
  progress: number;
}

const WelcomePage = ({ progress }: Props) => {
  const memeList = useAppSelector(selectMemeList);
  const account = useAppSelector(selectL1Account);
  const l2account = useAppSelector(selectL2Account);

  return (
    <>
      {!account && <GameConnecting hint="connect wallet" />}
      {!l2account && account && <GameLanding memeList={memeList}></GameLanding>}
      {progress > 0 ? (
        <>
          <div className="welcome-page-background-filter"></div>
          <WelcomePageProgressBar progress={progress} />
        </>
      ) : null}
    </>
  );
};

export default WelcomePage;
