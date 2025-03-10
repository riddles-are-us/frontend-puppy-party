import React, { useState } from "react";
import background from "../../images/error_bg.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./ErrorPopup.css";
import ConfirmButton from "../buttons/ConfirmButton";
import {setUIState, UIState} from "../../../data/ui";

interface Props {
  description: string;
}

const ErrorPopup = ({ description }: Props) => {
  const dispatch = useAppDispatch();

  const onClickConfirm = () => {
    dispatch(setUIState({ uIState: UIState.Idle }));
  };

  return (
    <div className="error-popup-container">
      <div onClick={onClickConfirm} className="error-popup-mask" />
      <div className="error-popup-main-container">
        <img src={background} className="error-popup-main-background" />
        <p className="error-popup-description-text">{description}</p>
        <div className="error-popup-error-button">
          <ConfirmButton onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ErrorPopup;
