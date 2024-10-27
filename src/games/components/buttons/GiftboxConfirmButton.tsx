import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/giftbox_confirm/ok_normal.png";
import buttonHoverImage from "../../images/buttons/giftbox_confirm/ok_hv.png";
import buttonClickImage from "../../images/buttons/giftbox_confirm/ok_click.png";
import "./GiftboxConfirmButton.css";

interface Props {
  onClick: () => void;
}

const GiftboxConfirmButton = ({ onClick }: Props) => {
  return (
    <div className="giftbox-confirm-button-scale">
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

export default GiftboxConfirmButton;
