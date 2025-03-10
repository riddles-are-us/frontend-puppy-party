import React, { useState } from "react";
import background from "../../images/confirm_bg.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./ConfirmPopup.css";
import ConfirmButton from "../buttons/ConfirmButton";
import {setUIState, UIState} from "../../../data/ui";

interface Props {
  description: string;
}

const ConfirmPopup = ({ description }: Props) => {
  const dispatch = useAppDispatch();

  const onClickConfirm = () => {
    dispatch(setUIState({ uIState: UIState.Idle }));
  };

  return (
    <div className="confirm-popup-container">
      <div onClick={onClickConfirm} className="confirm-popup-mask" />
      <div className="confirm-popup-main-container">
        <img src={background} className="confirm-popup-main-background" />
        <p className="confirm-popup-description-text">{description}</p>
        <div className="confirm-popup-confirm-button">
          <ConfirmButton onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
