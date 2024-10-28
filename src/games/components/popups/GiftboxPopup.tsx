import React, { useEffect, useState } from "react";
import background from "../../images/withdraw_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./GiftboxPopup.css";
import { sendTransaction } from "../../request";
import { selectL1Account, selectL2Account } from "../../../data/accountSlice";
import {
  selectUIState,
  setUIState,
  UIState,
} from "../../../data/puppy_party/properties";
import GiftboxConfirmButton from "../buttons/GiftboxConfirmButton";
import giftbox_image from "../../images/animations/giftbox.png";

const WITHDRAW = 8n;
function bytesToHex(bytes: Array<number>): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

const GiftboxPopup = () => {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);

  const onClickConfirm = () => {
    if (uIState == UIState.GiftboxPopup) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  };

  return (
    <>
      <link rel="preload" href={giftbox_image} as="image" />
      <div className="giftbox-popup-container">
        <div className="giftbox-popup-main-container">
          <div className="giftbox-popup-main-animation" />
          <div className="giftbox-popup-confirm-button">
            <GiftboxConfirmButton onClick={onClickConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftboxPopup;
