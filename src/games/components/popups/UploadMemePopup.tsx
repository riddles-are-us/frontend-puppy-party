import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import background from "../../images/deposit_frame.png";
import "./UploadMemePopup.css";
import { selectUIState, setUIState, UIState } from "../../../data/ui";
import ConfirmButton from "../buttons/WithdrawConfirmButton";
import { uploadImage } from "../../express";
import { useState } from "react";

const UploadMemePopup = () => {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);
  const [formData, setFormData] = useState({
    name: "",
    avatar: null,
    spriteSheet: null,
  });
  const [message, setMessage] = useState("");

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: any) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  const onClickConfirm = () => {
    if (uIState == UIState.UploadMemePopup) {
      if (formData.name != "" && formData.avatar && formData.spriteSheet) {
        setMessage("Uploading");
        uploadImage(formData.name, formData.avatar, formData.spriteSheet).then(
          () => {
            setFormData({ name: "", avatar: null, spriteSheet: null });
            dispatch(setUIState({ uIState: UIState.Idle }));
          }
        );
      } else {
        setMessage("Please fill in name, avatar, and sprite sheet");
      }
    }
  };

  const onClickCancel = () => {
    if (uIState == UIState.UploadMemePopup) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  };

  return (
    <div className="upload-meme-popup-container">
      <div onClick={onClickCancel} className="upload-meme-popup-mask" />
      <div className="upload-meme-popup-main-container">
        <div className="upload-meme-popup-main-background" />
        <div className="upload-meme-popup-title-text">
          <p>Upload Meme</p>
        </div>
        <div className="upload-meme-popup-name-label-text">
          <p>Name</p>
        </div>
        <div className="upload-meme-popup-name-input">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="upload-meme-popup-avatar-label-text">
          <p>Avatar</p>
        </div>
        <div className="upload-meme-popup-avatar-input">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="upload-meme-popup-sprite-sheet-label-text">
          <p>Sprite Sheet</p>
        </div>
        <div className="upload-meme-popup-sprite-sheet-input">
          <input
            type="file"
            name="spriteSheet"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="upload-meme-popup-warning-text">
          <p>{message}</p>
        </div>
        <div className="upload-meme-popup-confirm-button">
          <ConfirmButton onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default UploadMemePopup;
