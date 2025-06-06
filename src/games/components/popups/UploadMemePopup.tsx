import background from "../../images/upload_meme_frame.png";
import "./UploadMemePopup.css";
import ConfirmButton from "../buttons/WithdrawConfirmButton";
import { uploadImage } from "../../express";
import { useRef, useState } from "react";
import SelectFileButton from "../buttons/SelectFileButton";
import UploadMemeHelpPopup from "./UploadMemeHelpPopup";
import UploadMemeHelpButton from "../buttons/UploadMemeHelpConfirmButton";

interface Props {
  onClose: () => void;
}

const UploadMemePopup = ({ onClose }: Props) => {
  const [formData, setFormData] = useState({
    name: "",
    avatar: null,
    spriteSheet: null,
  });
  const [message, setMessage] = useState("");
  const avatarFileNameInputRef = useRef<HTMLInputElement>(null);
  const spriteSheetFileNameInputRef = useRef<HTMLInputElement>(null);
  const [avatarFileName, setAvatarFileName] = useState("No file selected");
  const [spriteSheetFileName, setSpriteSheetFileName] =
    useState("No file selected");
  const [isShowingHelpPopup, setIsShowingHelpPopup] = useState(false);
  const [isQuerying, setIsQuerying] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
    if (name === "avatar") {
      setAvatarFileName(files[0]?.name || "No file selected");
    } else if (name === "spriteSheet") {
      setSpriteSheetFileName(files[0]?.name || "No file selected");
    }
  };

  const onClickUpload = () => {
    if (!isQuerying) {
      if (formData.name != "" && formData.avatar && formData.spriteSheet) {
        setMessage("Uploading");
        setIsQuerying(true);
        uploadImage(formData.name, formData.avatar, formData.spriteSheet).then(
          () => {
            setFormData({ name: "", avatar: null, spriteSheet: null });
            setAvatarFileName("No file selected");
            setSpriteSheetFileName("No file selected");
            setIsQuerying(false);
            onClose();
          }
        );
      } else {
        setMessage("Please fill in name, avatar, and sprite sheet");
      }
    }
  };

  const onClickHelpButton = () => {
    setIsShowingHelpPopup(true);
  };

  const onCloseHelpPopup = () => {
    setIsShowingHelpPopup(false);
  };

  const onClickAvatarInputButton = () => {
    if (avatarFileNameInputRef.current) {
      avatarFileNameInputRef.current.click();
    }
  };

  const onClickSpriteSheetInputButton = () => {
    if (spriteSheetFileNameInputRef.current) {
      spriteSheetFileNameInputRef.current.click();
    }
  };

  const onClickCancel = () => {
    if (!isQuerying) {
      setIsQuerying(false);
      onClose();
    }
  };

  return (
    <div className="upload-meme-popup-container">
      {isShowingHelpPopup ? (
        <UploadMemeHelpPopup onClose={onCloseHelpPopup} />
      ) : (
        <>
          <div onClick={onClickCancel} className="upload-meme-popup-mask" />
          <div className="upload-meme-popup-main-container">
            <img
              src={background}
              className="upload-meme-popup-main-background"
            />
            <div className="upload-meme-popup-help-button">
              <UploadMemeHelpButton onClick={onClickHelpButton} />
            </div>
            <div className="upload-meme-popup-name-container">
              <input
                className="upload-meme-popup-name-input"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="upload-meme-popup-avatar-container">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleFileChange}
                required
                ref={avatarFileNameInputRef}
                style={{ display: "none" }}
              />
              <div className="upload-meme-popup-input-button">
                <SelectFileButton onClick={onClickAvatarInputButton} />
              </div>
              <p className="upload-meme-popup-input-text">{avatarFileName}</p>
            </div>
            <div className="upload-meme-popup-sprite-sheet-container">
              <input
                type="file"
                name="spriteSheet"
                accept="image/*"
                onChange={handleFileChange}
                required
                ref={spriteSheetFileNameInputRef}
                style={{ display: "none" }}
              />
              <div className="upload-meme-popup-input-button">
                <SelectFileButton onClick={onClickSpriteSheetInputButton} />
              </div>
              <p className="upload-meme-popup-input-text">
                {spriteSheetFileName}
              </p>
            </div>
            <div className="upload-meme-popup-warning-text">
              <p>{message}</p>
            </div>
            <div className="upload-meme-popup-confirm-button">
              <ConfirmButton onClick={onClickUpload} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default UploadMemePopup;
