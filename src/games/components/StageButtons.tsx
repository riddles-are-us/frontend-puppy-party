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
  onClickMusicButton: () => void;
  onClickSideButton: () => void;
  onClickTurnButton: () => void;
  onClickUpButton: () => void;
}

const StageButtons = ({
  danceButtonProgress,
  danceType,
  onClickMusicButton,
  onClickSideButton,
  onClickTurnButton,
  onClickUpButton,
}: Props) => {
  return (
    <div className="stage-buttons-container">
      <div className="stage-buttons-music-container">
        <DanceMusicButton
          progress={danceButtonProgress}
          isDancing={danceType == DanceType.Music}
          onClick={onClickMusicButton}
        />
      </div>
      <div className="stage-buttons-side-container">
        <DanceSideButton
          progress={danceButtonProgress}
          isDancing={danceType == DanceType.Side}
          onClick={onClickSideButton}
        />
      </div>
      <div className="stage-buttons-turn-container">
        <DanceTurnButton
          progress={danceButtonProgress}
          isDancing={danceType == DanceType.Turn}
          onClick={onClickTurnButton}
        />
      </div>
      <div className="stage-buttons-up-container">
        <DanceUpButton
          progress={danceButtonProgress}
          isDancing={danceType == DanceType.Up}
          onClick={onClickUpButton}
        />
      </div>
    </div>
  );
};

export default StageButtons;
