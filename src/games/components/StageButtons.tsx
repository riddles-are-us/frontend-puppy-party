import React from "react";
import DanceMusicButton from "./buttons/DanceMusicButton";
import "./StageButtons.css";
import DanceSideButton from "./buttons/DanceSideButton";
import DanceTurnButton from "./buttons/DanceTurnButton";
import DanceUpButton from "./buttons/DanceUpButton";
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
      <div className="stage-buttons-music-container">
        <DanceMusicButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && currentDanceType == DanceType.Vote}
          onClick={onClickVoteButton()}
        />
      </div>
      <div className="stage-buttons-side-container">
        <DanceSideButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && currentDanceType == DanceType.Stake}
          onClick={onClickStakeButton()}
        />
      </div>
      <div className="stage-buttons-turn-container">
        <DanceTurnButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && currentDanceType == DanceType.Collect}
          onClick={onClickCollectButton()}
        />
      </div>
      {/* <div className="stage-buttons-up-container">
				<DanceUpButton
					isCoolDown={isCoolDown}
					progress={progress}
					isDancing={progress < 1 && danceType == DanceType.Comment}
					onClick={onClickCommentButton()}
				/>
			</div> */}
    </div>
  );
};

export default StageButtons;
