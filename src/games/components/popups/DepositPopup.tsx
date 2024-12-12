import { useState } from "react";
import background from "../../images/deposit_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./DepositPopup.css";
import { sendTransaction } from "../../request";
import { AccountSlice } from "zkwasm-minirollup-browser";
import {
  selectBalance,
  selectNonce,
  selectUIState,
  setPopupDescription,
  setUIState,
  UIState,
} from "../../../data/puppy_party/properties";
import ConfirmButton from "../buttons/WithdrawConfirmButton";
import CancelButton from "../buttons/WithdrawCancelButton";

const WITHDRAW = 8n;
function bytesToHex(bytes: Array<number>): string {
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

function getFirst10Words(input: string): string {
  const words = input.split(/\s+/);
  const first10Words = words.slice(0, 10);
  if (words.length > 10) {
    first10Words.push("...");
  }
  return first10Words.join(" ");
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

        if (sendTransaction.fulfilled.match(action)) {
          dispatch(
            setPopupDescription({
              popupDescription: "Hash Number : (TBD)",
            })
          );
          dispatch(setUIState({ uIState: UIState.ConfirmPopup }));
        } else if (AccountSlice.depositAsync.rejected.match(action)) {
          if (action.error.message == null) {
            dispatch(
              setPopupDescription({
                popupDescription: "Unknown Error",
              })
            );
          } else if (action.error.message.startsWith("user rejected action")) {
            dispatch(
              setPopupDescription({
                popupDescription: "User rejected action",
              })
            );
          } else {
            dispatch(
              setPopupDescription({
                popupDescription:
                  "Deposit Fail: " + getFirst10Words(action.error.message),
              })
            );
          }
          dispatch(setUIState({ uIState: UIState.ErrorPopup }));
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
