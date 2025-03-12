import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/upload_meme_help_confirm/ok.png";
import buttonHoverImage from "../../images/buttons/upload_meme_help_confirm/ok_hv.png";
import buttonClickImage from "../../images/buttons/upload_meme_help_confirm/ok_click.png";
import "./UploadMemeHelpConfirmButton.css";

interface Props {
  onClick: () => void;
}

const UploadMemeHelpConfirmButton = ({ onClick }: Props) => {
  return (
    <div className="upload-meme-help-confirm-button-scale">
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

export default UploadMemeHelpConfirmButton;
