import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/Buttons/WithdrawConfirm/withdraw.png";
import buttonHoverImage from "../../images/Buttons/WithdrawConfirm/withdraw_hover.png";
import buttonClickImage from "../../images/Buttons/WithdrawConfirm/withdraw_click.png";
import "./WithdrawConfirmButton.css";

interface Props {
  onClick: () => void;
}

const WithdrawConfirmButton = ({ onClick }: Props) => {
  return (
    <div className="withdraw-confirm-button-scale">
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

export default WithdrawConfirmButton;
