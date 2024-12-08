import React, { useEffect, useRef, useState } from "react";
import background from "../../images/withdraw_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./SponsorPopup.css";
import { queryState, sendTransaction } from "../../request";
import { AccountSlice } from "zkwasm-minirollup-browser";
import {
  selectLotteryInfo,
  selectUIState,
  setUIState,
  UIState,
} from "../../../data/puppy_party/properties";
import GiftboxConfirmButton from "../buttons/GiftboxConfirmButton";
import sponsor_image from "../../images/animations/sponsor.png";
import sponsor_logo from "../../images/sponsor_logo.png";
import { getTransactionCommandArray } from "../../rpc";

const SponsorPopup = () => {
  const dispatch = useAppDispatch();
  const lotteryInfo = useAppSelector(selectLotteryInfo);

  const onClickConfirm = () => {
    dispatch(setUIState({ uIState: UIState.Idle }));
  };

  return (
    <>
      <link rel="preload" href={sponsor_image} as="image" />
      <div className="sponsor-popup-container">
        <div className="sponsor-popup-main-container">
          <div className="sponsor-popup-main-animation" />
          <p className="sponsor-popup-description-text">
            Your lottery pool has reached ${lotteryInfo}
          </p>
          <p className="sponsor-popup-sponsor-text">Sponsored by</p>
          <img src={sponsor_logo} className="sponsor-popup-sponsor-image" />
          <div className="sponsor-popup-confirm-button">
            <GiftboxConfirmButton onClick={onClickConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorPopup;
