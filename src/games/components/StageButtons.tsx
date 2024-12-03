import React from "react";
import DanceMusicButton from "./buttons/DanceMusicButton";
import "./StageButtons.css";
import DanceSideButton from "./buttons/DanceSideButton";
import DanceTurnButton from "./buttons/DanceTurnButton";
import DanceUpButton from "./buttons/DanceUpButton";
import { DanceType } from "./Gameplay";

interface Props {
  danceButtonProgress: number;
  danceType: DanceType;
  onClickButton: (danceType: DanceType) => () => void;
}

const StageButtons = ({
  danceButtonProgress,
  danceType,
  onClickButton,
}: Props) => {
  return (
    <div className="stage-buttons-container">
      <div className="stage-buttons-music-container">
        <DanceMusicButton
          progress={danceButtonProgress}
          isDancing={danceType == DanceType.Music}
          onClick={onClickButton(DanceType.Music)}
        />
      </div>
      <div className="stage-buttons-side-container">
        <DanceSideButton
          progress={danceButtonProgress}
          isDancing={danceType == DanceType.Side}
          onClick={onClickButton(DanceType.Side)}
        />
      </div>
      <div className="stage-buttons-turn-container">
        <DanceTurnButton
          progress={danceButtonProgress}
          isDancing={danceType == DanceType.Turn}
          onClick={onClickButton(DanceType.Turn)}
        />
      </div>
      <div className="stage-buttons-up-container">
        <DanceUpButton
          progress={danceButtonProgress}
          isDancing={danceType == DanceType.Up}
          onClick={onClickButton(DanceType.Up)}
        />
      </div>
    </div>
  );
};

export default StageButtons;
