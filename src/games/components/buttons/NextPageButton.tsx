import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/next_page/right_normal.png";
import buttonHoverImage from "../../images/buttons/next_page/right_hover.png";
import buttonClickImage from "../../images/buttons/next_page/right_click.png";
import "./NextPageButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const NextPageButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="next-page-button-scale">
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

export default NextPageButton;
