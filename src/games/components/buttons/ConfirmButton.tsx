import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/confirm/confirm.png";
import buttonHoverImage from "../../images/buttons/confirm/confirm_hv.png";
import buttonClickImage from "../../images/buttons/confirm/confirm_click.png";
import "./ConfirmButton.css";

interface Props {
  onClick: () => void;
}

const ConfirmButton = ({ onClick }: Props) => {
  return (
    <div className="confirm-button-scale">
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

export default ConfirmButton;
