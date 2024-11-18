import React from "react";
import DanceMusicButton from "./buttons/DanceMusicButton";
import "./StageButtons.css";
import DanceSideButton from "./buttons/DanceSideButton";
import DanceTurnButton from "./buttons/DanceTurnButton";
import DanceUpButton from "./buttons/DanceUpButton";

interface Props {
  danceButtonProgress: number;
  onClickMusicButton: () => void;
  onClickSideButton: () => void;
  onClickTurnButton: () => void;
  onClickUpButton: () => void;
}

const StageButtons = ({
  danceButtonProgress,
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
          isDisabled={false}
          onClick={onClickMusicButton}
        />
      </div>
      <div className="stage-buttons-side-container">
        <DanceSideButton
          progress={danceButtonProgress}
          isDisabled={false}
          onClick={onClickSideButton}
        />
      </div>
      <div className="stage-buttons-turn-container">
        <DanceTurnButton
          progress={danceButtonProgress}
          isDisabled={false}
          onClick={onClickTurnButton}
        />
      </div>
      <div className="stage-buttons-up-container">
        <DanceUpButton
          progress={danceButtonProgress}
          isDisabled={false}
          onClick={onClickUpButton}
        />
      </div>
    </div>
  );
};

export default StageButtons;
