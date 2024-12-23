import React, { useState } from "react";
import background from "../../images/deposit_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./DepositPopup.css";
import { sendTransaction } from "../../request";
import { AccountSlice } from "zkwasm-minirollup-browser";
import {
  selectBalance,
  selectNonce,
  selectUIState,
  setUIState,
  UIState,
} from "../../../data/puppy_party/properties";
import BN from "bn.js";
import ConfirmButton from "../buttons/WithdrawConfirmButton";
import { getTransactionCommandArray } from "../../rpc";
import CancelButton from "../buttons/WithdrawCancelButton";

const WITHDRAW = 8n;
function bytesToHex(bytes: Array<number>): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

const DepositPopup = () => {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);
  const nonce = useAppSelector(selectNonce);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const l1account = useAppSelector(AccountSlice.selectL1Account);
  const balance = useAppSelector(selectBalance);
  const [amountString, setAmountString] = useState("");

  const deposit = (amount: string) => {
    try {
      dispatch(setUIState({ uIState: UIState.QueryDeposit }));
      dispatch(
        AccountSlice.depositAsync({
          tokenIndex: 0,
          amount: Number(BigInt(amount)),
          l2account: l2account!,
          l1account: l1account!,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(setUIState({ uIState: UIState.Idle }));
          //setErrorMessage("");
        } else if (AccountSlice.depositAsync.rejected.match(action)) {
          if (action.error.message == null) {
            //setErrorMessage("Unknown Error.");
          } else {
            //setErrorMessage(action.error.message);
          }
        }
      });
    } catch (e) {
      console.log("Error at deposit " + e);
    }
  };

  const onClickConfirm = () => {
    if (uIState == UIState.DepositPopup) {
      deposit(amountString);
    }
  };

  const onClickCancel = () => {
    if (uIState == UIState.DepositPopup) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  };

  return (
    <div className="deposit-popup-container">
      <div onClick={onClickCancel} className="deposit-popup-mask" />
      <div className="deposit-popup-main-container">
        <img src={background} className="deposit-popup-main-background" />
        <p className="deposit-popup-amount-text">
          Please enter a number between 0 and {balance}.
        </p>
        <input
          type="number"
          className="deposit-popup-amount-input"
          value={amountString}
          onChange={(e) => setAmountString(e.target.value)}
          placeholder="Enter amount"
        />
        <div className="deposit-popup-confirm-button">
          <ConfirmButton onClick={onClickConfirm} />
        </div>
        <div className="deposit-popup-cancel-button">
          <CancelButton onClick={onClickCancel} />
        </div>
      </div>
    </div>
  );
};

export default DepositPopup;
