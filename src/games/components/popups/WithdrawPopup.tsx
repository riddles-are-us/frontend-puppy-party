import { useState } from "react";
import background from "../../images/withdraw_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AccountSlice } from "zkwasm-minirollup-browser";
import ConfirmButton from "../buttons/WithdrawConfirmButton";
import CancelButton from "../buttons/WithdrawCancelButton";
import { getWithdrawTransactionParameter } from "../../api";
import "./WithdrawPopup.css";
import {selectUIState, setPopupDescription, setUIState, UIState} from "../../../data/ui";
import {selectUserState} from "../../../data/state";
import {sendTransaction} from "zkwasm-minirollup-browser/src/connect";

const WithdrawPopup = () => {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const l1account = useAppSelector(AccountSlice.selectL1Account);
  const userState = useAppSelector(selectUserState);
  const [amountString, setAmountString] = useState("");

  async function withdrawRewards(amount: bigint, nonce: bigint) {
    dispatch(
      sendTransaction(
        getWithdrawTransactionParameter(l1account!, l2account!, amount, nonce)
      )
    ).then((action) => {
      if (sendTransaction.fulfilled.match(action)) {
        dispatch(
          setPopupDescription({
            popupDescription: "Hash Number : (TBD)",
          })
        );
        dispatch(setUIState({ uIState: UIState.ConfirmPopup }));
      }
    });
  }

  const withdraw = (amountString: string) => {
    try {
      const amount = Number(amountString);
      if (amount > userState!.player!.data.balance) {
        dispatch(
          setPopupDescription({
            popupDescription: "Not Enough Balance",
          })
        );
        dispatch(setUIState({ uIState: UIState.ErrorPopup }));
      } else {
        dispatch(setUIState({ uIState: UIState.QueryWithdraw }));
        withdrawRewards(BigInt(amount), BigInt(userState!.player!.nonce));
      }
    } catch (e) {
      console.log("Error at withdraw " + e);
    }
  };

  const onClickConfirm = () => {
    if (uIState == UIState.WithdrawPopup) {
      withdraw(amountString);
    }
  };

  const onClickCancel = () => {
    if (uIState == UIState.WithdrawPopup) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  };

  return (
    <div className="withdraw-popup-container">
      <div onClick={onClickCancel} className="withdraw-popup-mask" />
      <div className="withdraw-popup-main-container">
        <img src={background} className="withdraw-popup-main-background" />
        <p className="withdraw-popup-amount-text">
          Please enter a number between 0 and {userState!.player!.data.balance}.
        </p>
        <input
          type="number"
          className="withdraw-popup-amount-input"
          value={amountString}
          onChange={(e) => setAmountString(e.target.value)}
          placeholder="Enter amount"
        />
        <div className="withdraw-popup-confirm-button">
          <ConfirmButton onClick={onClickConfirm} />
        </div>
        <div className="withdraw-popup-cancel-button">
          <CancelButton onClick={onClickCancel} />
        </div>
      </div>
    </div>
  );
};

export default WithdrawPopup;
