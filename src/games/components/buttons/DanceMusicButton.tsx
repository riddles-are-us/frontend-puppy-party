import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/dance_music/music_normal.png";
import buttonHoverImage from "../../images/buttons/dance_music/music_hv.png";
import buttonClickImage from "../../images/buttons/dance_music/music_click.png";
import buttonDisabledImage from "../../images/buttons/dance_music/music_wait.png";
import progressImage from "../../images/dance_button_progress.png";

import "./DanceMusicButton.css";

interface Props {
  progress: number;
  isDisabled: boolean;
  onClick: () => void;
}

const DanceMusicButton = ({ progress, isDisabled, onClick }: Props) => {
  const filterPercentage = 100 - progress * 100;
  return (
    <>
      <div className="dance-music-button-scale">
        <ImageButton
          isDisabled={isDisabled}
          defaultImagePath={buttonImage}
          hoverImagePath={buttonHoverImage}
          clickedImagePath={buttonClickImage}
          disabledImagePath={buttonDisabledImage}
          onClick={onClick}
        />
      </div>
      {progress < 1 && (
        <img
          src={progressImage}
          className="dance-music-image"
          style={{
            clipPath: `polygon(0 ${filterPercentage}%, 100% ${filterPercentage}%, 100% 100%, 0 100%)`,
          }}
        />
      )}
    </>
  );
};

export default DanceMusicButton;
