import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/collect/collect_normal.png";
import buttonHoverImage from "../../images/buttons/collect/collect_hover.png";
import buttonClickImage from "../../images/buttons/collect/collect_click.png";
import buttonDisabledImage from "../../images/buttons/collect/collect_idle.png";
import buttonDancingImage from "../../images/buttons/collect/collect_wait.png";
import progressImage from "../../images/dance_button_progress.png";

import "./CollectButton.css";

interface Props {
  isCoolDown: boolean;
  progress: number;
  isDancing: boolean;
  onClick: () => void;
}

const CollectButton = ({ isCoolDown, progress, isDancing, onClick }: Props) => {
  const filterPercentage = 100 - progress * 100;
  return (
    <>
      <div className="collect-button-scale">
        <ImageButton
          isDisabled={isCoolDown}
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
          className="collect-image"
          style={{
            clipPath: `polygon(0 ${filterPercentage}%, 100% ${filterPercentage}%, 100% 100%, 0 100%)`,
          }}
        />
      )}
    </>
  );
};

export default CollectButton;
