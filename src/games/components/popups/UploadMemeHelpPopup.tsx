import background from "../../images/upload_meme_help_frame.png";
import UploadMemeHelpConfirmButton from "../buttons/UploadMemeHelpButton";
import "./UploadMemeHelpPopup.css";
import { useRef, useState } from "react";

interface Props {
  onClose: () => void;
}

const UploadMemeHelpPopup = ({ onClose }: Props) => {
  const onClickCancel = () => {
    onClose();
  };

  return (
    <div className="upload-meme-help-popup-container">
      <div onClick={onClickCancel} className="upload-meme-help-popup-mask" />
      <div className="upload-meme-help-popup-main-container">
        <img
          src={background}
          className="upload-meme-help-popup-main-background"
        />
        <p className="upload-meme-help-popup-text">
          Avatar size is 200 x 200 pixels <br />
          in JPG or PNG format <br />
          <br />
          SpriteSheet size is 2400 x 200 pixels <br />
          in JPG or PNG format, containing 24 frames <br />
          of 200 x 200 images arranged horizontally.
        </p>
        <div className="upload-meme-help-popup-confirm-button">
          <UploadMemeHelpConfirmButton onClick={onClickCancel} />
        </div>
      </div>
    </div>
  );
};

export default UploadMemeHelpPopup;
