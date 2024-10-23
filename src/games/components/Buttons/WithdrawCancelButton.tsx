import React from "react";
import ImageButton from "../Common/ImageButton";
import buttonImage from "../../images/Buttons/WithdrawCancel/cancel.png";
import buttonHoverImage from "../../images/Buttons/WithdrawCancel/cancel_hover.png";
import buttonClickImage from "../../images/Buttons/WithdrawCancel/cancel_click.png";
import "./WithdrawCancelButton.css";

interface Props {
  onClick: () => void;
}

const WithdrawCancelButton = ({ onClick }: Props) => {
  return (
    <div className="withdraw-cancel-button-scale">
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

export default WithdrawCancelButton;
