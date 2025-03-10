import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/connect_wallet/connect_wallet.png";
import buttonHoverImage from "../../images/buttons/connect_wallet/connect_wallet_hv.png";
import buttonClickImage from "../../images/buttons/connect_wallet/connect_wallet_click.png";
import "./ConnectWalletButton.css";

interface Props {
  onClick: () => void;
}

const ConnectWalletButton = ({ onClick }: Props) => {
  return (
    <div className="connect-wallet-button-scale">
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

export default ConnectWalletButton;
