import React from "react";
import ImageButton from "../common/ImageButton";
import buttonImage from "../../images/buttons/upload_meme_help/info.png";
import buttonHoverImage from "../../images/buttons/upload_meme_help/info_hover.png";
import buttonClickImage from "../../images/buttons/upload_meme_help/info_click.png";
import "./UploadMemeHelpButton.css";

interface Props {
  onClick: () => void;
}

const UploadMemeHelpButton = ({ onClick }: Props) => {
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

export default UploadMemeHelpButton;
