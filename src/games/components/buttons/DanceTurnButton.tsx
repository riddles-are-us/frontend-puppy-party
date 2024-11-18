import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/dance_turn/turn_normal.png";
import buttonHoverImage from "../../images/buttons/dance_turn/turn_hv.png";
import buttonClickImage from "../../images/buttons/dance_turn/turn_click.png";
import buttonDisabledImage from "../../images/buttons/dance_turn/turn_wait.png";
import progressImage from "../../images/dance_button_progress.png";

import "./DanceTurnButton.css";

interface Props {
  progress: number;
  isDisabled: boolean;
  onClick: () => void;
}

const DanceTurnButton = ({ progress, isDisabled, onClick }: Props) => {
  const filterPercentage = 100 - progress * 100;
  return (
    <>
      <div className="dance-turn-button-scale">
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
          className="dance-turn-image"
          style={{
            clipPath: `polygon(0 ${filterPercentage}%, 100% ${filterPercentage}%, 100% 100%, 0 100%)`,
          }}
        />
      )}
    </>
  );
};

export default DanceTurnButton;
