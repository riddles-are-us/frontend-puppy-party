import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/withdraw_cancel/cancel.png";
import buttonHoverImage from "../../images/buttons/withdraw_cancel/cancel_hover.png";
import buttonClickImage from "../../images/buttons/withdraw_cancel/cancel_click.png";
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
