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
  danceType: DanceType;
  onClickButton: (danceType: DanceType) => () => void;
}

const StageButtons = ({
  isCoolDown,
  progress,
  danceType,
  onClickButton,
}: Props) => {
  return (
    <div className="stage-buttons-container">
      <div className="stage-buttons-music-container">
        <DanceMusicButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && danceType == DanceType.Vote}
          onClick={onClickButton(DanceType.Vote)}
        />
      </div>
      <div className="stage-buttons-side-container">
        <DanceSideButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && danceType == DanceType.Stake}
          onClick={onClickButton(DanceType.Stake)}
        />
      </div>
      <div className="stage-buttons-turn-container">
        <DanceTurnButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && danceType == DanceType.Collect}
          onClick={onClickButton(DanceType.Collect)}
        />
      </div>
      <div className="stage-buttons-up-container">
        <DanceUpButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && danceType == DanceType.Comment}
          onClick={onClickButton(DanceType.Comment)}
        />
      </div>
    </div>
  );
};

export default StageButtons;
