import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/dance_up/up_normal.png";
import buttonHoverImage from "../../images/buttons/dance_up/up_hv.png";
import buttonClickImage from "../../images/buttons/dance_up/up_click.png";
import buttonDisabledImage from "../../images/buttons/dance_up/up_idle.png";
import buttonDancingImage from "../../images/buttons/dance_up/up_wait.png";
import progressImage from "../../images/dance_button_progress.png";

import "./DanceUpButton.css";

interface Props {
  progress: number;
  isDancing: boolean;
  onClick: () => void;
}

const DanceUpButton = ({ progress, isDancing, onClick }: Props) => {
  const filterPercentage = 100 - progress * 100;
  return (
    <>
      <div className="dance-up-button-scale">
        <ImageButton
          isDisabled={progress < 1}
          defaultImagePath={buttonImage}
          hoverImagePath={buttonHoverImage}
          clickedImagePath={buttonClickImage}
          disabledImagePath={
            isDancing ? buttonDancingImage : buttonDisabledImage
          }
          onClick={onClick}
        />
      </div>
      {isDancing && (
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

export default DanceUpButton;
