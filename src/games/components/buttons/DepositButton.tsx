import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/deposit/deposit_button.png";
import buttonHoverImage from "../../images/buttons/deposit/deposit_button_hv.png";
import buttonClickImage from "../../images/buttons/deposit/deposit_button_click.png";
import "./DepositButton.css";

interface Props {
  onClick: () => void;
}

const DepositButton = ({ onClick }: Props) => {
  return (
    <div className="deposit-button-scale">
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

export default DepositButton;
