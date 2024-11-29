import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/play/play.png";
import buttonHoverImage from "../../images/buttons/play/play_hv.png";
import buttonClickImage from "../../images/buttons/play/play_click.png";
import "./PlayButton.css";

interface Props {
  onClick: () => void;
}

const PlayButton = ({ onClick }: Props) => {
  return (
    <div className="play-button-scale">
      <ImageButton
        isDisabled={false}
        defaultImagePath={buttonImage}
        hoverImagePath={buttonHoverImage}
        clickedImagePath={buttonClickImage}
        disabledImagePath={buttonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default PlayButton;
