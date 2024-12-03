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
          isDancing={progress < 1 && danceType == DanceType.Music}
          onClick={onClickButton(DanceType.Music)}
        />
      </div>
      <div className="stage-buttons-side-container">
        <DanceSideButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && danceType == DanceType.Side}
          onClick={onClickButton(DanceType.Side)}
        />
      </div>
      <div className="stage-buttons-turn-container">
        <DanceTurnButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && danceType == DanceType.Turn}
          onClick={onClickButton(DanceType.Turn)}
        />
      </div>
      <div className="stage-buttons-up-container">
        <DanceUpButton
          isCoolDown={isCoolDown}
          progress={progress}
          isDancing={progress < 1 && danceType == DanceType.Up}
          onClick={onClickButton(DanceType.Up)}
        />
      </div>
    </div>
  );
};

export default StageButtons;
