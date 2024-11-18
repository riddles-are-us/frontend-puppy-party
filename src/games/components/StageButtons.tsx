import React from "react";
import DanceMusicButton from "./buttons/DanceMusicButton";
import "./StageButtons.css";
import DanceSideButton from "./buttons/DanceSideButton";
import DanceTurnButton from "./buttons/DanceTurnButton";
import DanceUpButton from "./buttons/DanceUpButton";

interface Props {
  danceButtonProgress: number;
  handleDiscoShakeFeet: () => void;
}

const StageButtons = ({ danceButtonProgress, handleDiscoShakeFeet }: Props) => {
  return (
    <div className="stage-buttons-container">
      <div className="stage-buttons-music-container">
        <DanceMusicButton
          progress={danceButtonProgress}
          isDisabled={false}
          onClick={handleDiscoShakeFeet}
        />
      </div>
      <div className="stage-buttons-side-container">
        <DanceSideButton
          progress={danceButtonProgress}
          isDisabled={false}
          onClick={handleDiscoShakeFeet}
        />
      </div>
      <div className="stage-buttons-turn-container">
        <DanceTurnButton
          progress={danceButtonProgress}
          isDisabled={false}
          onClick={handleDiscoShakeFeet}
        />
      </div>
      <div className="stage-buttons-up-container">
        <DanceUpButton
          progress={danceButtonProgress}
          isDisabled={false}
          onClick={handleDiscoShakeFeet}
        />
      </div>
    </div>
  );
};

export default StageButtons;
