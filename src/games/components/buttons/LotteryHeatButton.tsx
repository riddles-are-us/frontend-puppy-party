import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/lottery_heat/front.png";
import buttonHoverImage from "../../images/buttons/lottery_heat/front_hv.png";
import buttonClickImage from "../../images/buttons/lottery_heat/front_click.png";
import "./LotteryHeatButton.css";

interface Props {
  isDisabled: boolean;
  onClick: () => void;
}

const LotteryHeatButton = ({ isDisabled, onClick }: Props) => {
  return (
    <div className="lottery-heat-button-scale">
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

export default LotteryHeatButton;
