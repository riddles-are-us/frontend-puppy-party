import React, { useEffect, useState } from "react";
import background from "../../images/withdraw_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./GiftboxPopup.css";
import { sendTransaction } from "../../request";
import { selectL1Account, selectL2Account } from "../../../data/accountSlice";
import {
  selectBalance,
  selectNonce,
  selectUIState,
  setUIState,
  UIState,
} from "../../../data/puppy_party/properties";
import BN from "bn.js";
import WithdrawConfirmButton from "../buttons/WithdrawConfirmButton";
import { getTransactionCommandArray } from "../../rpc";
import WithdrawCancelButton from "../buttons/WithdrawCancelButton";
import GiftboxConfirmButton from "../buttons/GiftboxConfirmButton";

const WITHDRAW = 8n;
function bytesToHex(bytes: Array<number>): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

const GiftboxPopup = () => {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);

  const [showRepeatAnimation, setShowRepeatAnimation] = useState(false);

  useEffect(() => {
    if (uIState == UIState.GiftboxPopup) {
      setTimeout(() => {
        setShowRepeatAnimation(true);
      }, 1000);
    }
  }, [uIState]);

  const onClickConfirm = () => {
    if (uIState == UIState.GiftboxPopup) {
      setShowRepeatAnimation(false);
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  };

  return (
    <div className="giftbox-popup-container">
      <div className="giftbox-popup-main-container">
        {showRepeatAnimation ? (
          <div className="giftbox-popup-main-animation-repeat" />
        ) : (
          <div className="giftbox-popup-main-animation-open" />
        )}
        <div className="giftbox-popup-confirm-button">
          <GiftboxConfirmButton onClick={onClickConfirm} />
        </div>
      </div>
    </div>
  );
};

export default GiftboxPopup;
