import React, { useState } from "react";
import background from "../../images/deposit_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./DepositPopup.css";
import { sendTransaction } from "../../request";
import { AccountSlice } from "zkwasm-minirollup-rpc";
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

  async function depositRewards(amount: bigint, nonce: bigint) {
    const address = l1account!.address.slice(2);
    const addressBN = new BN(address, 16);
    const addressBE = addressBN.toArray("be", 20); // 20 bytes = 160 bits and split into 4, 8, 8
    console.log("address is", address);
    console.log("address big endian is", addressBE);
    const firstLimb = BigInt(
      "0x" + bytesToHex(addressBE.slice(0, 4).reverse())
    );
    const sndLimb = BigInt("0x" + bytesToHex(addressBE.slice(4, 12).reverse()));
    const thirdLimb = BigInt(
      "0x" + bytesToHex(addressBE.slice(12, 20).reverse())
    );

    /*
    (32 bit amount | 32 bit highbit of address)
    (64 bit mid bit of address (be))
    (64 bit tail bit of address (be))
    */

    console.log("first is", firstLimb);
    console.log("snd is", sndLimb);
    console.log("third is", thirdLimb);

    dispatch(
      sendTransaction({
        cmd: getTransactionCommandArray(WITHDRAW, nonce, [
          (firstLimb << 32n) + amount,
          sndLimb,
          thirdLimb,
        ]),
        prikey: l2account!.address,
      })
    ).then((action) => {
      if (sendTransaction.fulfilled.match(action)) {
        dispatch(setUIState({ uIState: UIState.Idle }));
      }
    });
  }

  const deposit = (amount: string) => {
    try {
      dispatch(setUIState({ uIState: UIState.QueryDeposit }));
      depositRewards(BigInt(amount), nonce);
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
