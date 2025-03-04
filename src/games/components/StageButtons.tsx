import React from "react";
import VoteButton from "./buttons/VoteButton";
import StakeButton from "./buttons/StakeButton";
import CollectButton from "./buttons/CollectButton";
import "./StageButtons.css";
import { DanceType } from "./Gameplay";

interface Props {
  isCoolDown: boolean;
  progress: number;
  currentDanceType: DanceType;
  onClickVoteButton: () => () => void;
  onClickStakeButton: () => () => void;
  onClickCollectButton: () => () => void;
  onClickCommentButton: () => () => void;
}

const StageButtons = ({
  isCoolDown,
  progress,
  currentDanceType,
  onClickVoteButton,
  onClickStakeButton,
  onClickCollectButton,
  onClickCommentButton,
}: Props) => {
  return (
    <div className="stage-buttons-container">
      <div className="stage-buttons-vote-container">
        <VoteButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && currentDanceType == DanceType.Vote}
          onClick={onClickVoteButton()}
        />
      </div>
      <div className="stage-buttons-stake-container">
        <StakeButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && currentDanceType == DanceType.Stake}
          onClick={onClickStakeButton()}
        />
      </div>
      <div className="stage-buttons-collect-container">
        <CollectButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && currentDanceType == DanceType.Collect}
          onClick={onClickCollectButton()}
        />
      </div>
    </div>
  );
};

export default StageButtons;
