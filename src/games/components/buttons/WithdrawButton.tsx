import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/withdraw/withdraw_button.png";
import buttonHoverImage from "../../images/buttons/withdraw/withdraw_button_hv.png";
import buttonClickImage from "../../images/buttons/withdraw/withdraw_button_click.png";
import "./WithdrawButton.css";

interface Props {
  onClick: () => void;
}

const WithdrawButton = ({ onClick }: Props) => {
  return (
    <div className="withdraw-button-scale">
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

export default WithdrawButton;
