import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/dance_side/side_normal.png";
import buttonHoverImage from "../../images/buttons/dance_side/side_hv.png";
import buttonClickImage from "../../images/buttons/dance_side/side_click.png";
import buttonDisabledImage from "../../images/buttons/dance_side/side_wait.png";
import progressImage from "../../images/dance_button_progress.png";

import "./DanceSideButton.css";

interface Props {
  progress: number;
  isDisabled: boolean;
  onClick: () => void;
}

const DanceSideButton = ({ progress, isDisabled, onClick }: Props) => {
  const filterPercentage = 100 - progress * 100;
  return (
    <>
      <div className="dance-side-button-scale">
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
          className="dance-side-image"
          style={{
            clipPath: `polygon(0 ${filterPercentage}%, 100% ${filterPercentage}%, 100% 100%, 0 100%)`,
          }}
        />
      )}
    </>
  );
};

export default DanceSideButton;
