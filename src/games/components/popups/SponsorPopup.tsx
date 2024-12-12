import React, { useEffect, useRef, useState } from "react";
import background from "../../images/withdraw_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./SponsorPopup.css";
import { queryState, sendTransaction } from "../../request";
import { AccountSlice } from "zkwasm-minirollup-browser";
import {
  resetLotteryInfoDiff,
  selectLotteryInfoDiff,
  selectNonce,
  selectUIState,
  setUIState,
  UIState,
} from "../../../data/puppy_party/properties";
import GiftboxConfirmButton from "../buttons/GiftboxConfirmButton";
import sponsor_image from "../../images/animations/sponsor.png";
import sponsor_logo from "../../images/sponsor_logo.png";
import { getTransactionCommandArray } from "../../rpc";
import { getWithdrawLotteryTransactionParameter } from "../../api";

const SponsorPopup = () => {
  const dispatch = useAppDispatch();
  const nonce = useAppSelector(selectNonce);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const l1account = useAppSelector(AccountSlice.selectL1Account);
  const lotteryInfoDiff = useAppSelector(selectLotteryInfoDiff);

  const withdrawLottery = () => {
    dispatch(
      sendTransaction(
        getWithdrawLotteryTransactionParameter(
          l1account!,
          l2account!,
          BigInt(lotteryInfoDiff),
          nonce
        )
      )
    ).then((action) => {
      if (sendTransaction.fulfilled.match(action)) {
        dispatch(resetLotteryInfoDiff({}));
        dispatch(setUIState({ uIState: UIState.Idle }));
      }
    });
  };

  const onClickConfirm = () => {
    withdrawLottery();
  };

  return (
    <>
      <link rel="preload" href={sponsor_image} as="image" />
      <div className="sponsor-popup-container">
        <div className="sponsor-popup-main-container">
          <div className="sponsor-popup-main-animation" />
          <p className="sponsor-popup-sponsor-text">Cash out</p>
          <img src={sponsor_logo} className="sponsor-popup-sponsor-image" />
          <p className="sponsor-popup-description-text">$ {lotteryInfoDiff}</p>
          <div className="sponsor-popup-confirm-button">
            <GiftboxConfirmButton onClick={onClickConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorPopup;
