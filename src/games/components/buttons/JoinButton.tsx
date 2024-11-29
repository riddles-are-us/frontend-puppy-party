import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/join/join.png";
import buttonHoverImage from "../../images/buttons/join/join_hv.png";
import buttonClickImage from "../../images/buttons/join/join_click.png";
import "./JoinButton.css";

interface Props {
  onClick: () => void;
}

const JoinButton = ({ onClick }: Props) => {
  return (
    <div className="join-button-scale">
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

export default JoinButton;
