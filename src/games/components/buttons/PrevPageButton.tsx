import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/prev_page/left_normal.png";
import buttonHoverImage from "../../images/buttons/prev_page/left_hover.png";
import buttonClickImage from "../../images/buttons/prev_page/left_click.png";
import "./PrevPageButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const PrevPageButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="prev-page-button-scale">
      <ImageButton
        isDisabled={isDisabled}
        defaultImagePath={buttonImage}
        hoverImagePath={buttonHoverImage}
        clickedImagePath={buttonClickImage}
        disabledImagePath={buttonClickImage}
        onClick={onClick}
      />
    </div>
  );
};

export default PrevPageButton;
