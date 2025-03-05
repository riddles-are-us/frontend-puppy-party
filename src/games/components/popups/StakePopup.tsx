import { useState } from "react";
import background from "../../images/stake_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { AccountSlice } from "zkwasm-minirollup-browser";
import ConfirmButton from "../buttons/WithdrawConfirmButton";
import CancelButton from "../buttons/WithdrawCancelButton";
import { getStakeTransactionParameter } from "../../api";
import "./StakePopup.css";
import {
  selectTargetMemeIndex,
  selectUIState,
  setPopupDescription,
  setUIState,
  UIState,
} from "../../../data/ui";
import { selectUserState } from "../../../data/state";
import { sendTransaction } from "zkwasm-minirollup-browser/src/connect";
import { selectCurrentMemes, setMemeModelMap } from "../../../data/memeDatas";
import { getMemeModelMap } from "../../express";

const StakePopup = () => {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const userState = useAppSelector(selectUserState);
  const currentMemes = useAppSelector(selectCurrentMemes);
  const targetMemeIndex = useAppSelector(selectTargetMemeIndex);

  const [amountString, setAmountString] = useState("");

  async function stakeRewards(amount: number) {
    dispatch(
      sendTransaction(
        getStakeTransactionParameter(
          l2account!,
          currentMemes[targetMemeIndex].data.id,
          amount,
          BigInt(userState.player!.nonce)
        )
      )
    ).then(async (action) => {
      if (sendTransaction.fulfilled.match(action)) {
        const memeModelMap = await getMemeModelMap();
        dispatch(setMemeModelMap({ memeModelMap }));
        dispatch(setUIState({ uIState: UIState.FinishStake }));
      }
    });
  }

  const stake = (amountString: string) => {
    try {
      const amount = Number(amountString);
      if (amount > userState.player!.data.ticket) {
        dispatch(
          setPopupDescription({
            popupDescription: "Not Enough Balance",
          })
        );
        dispatch(setUIState({ uIState: UIState.ErrorPopup }));
      } else {
        dispatch(setUIState({ uIState: UIState.QueryStake }));
        stakeRewards(amount);
      }
    } catch (e) {
      console.log("Error at stake " + e);
    }
  };

  const onClickConfirm = () => {
    if (uIState == UIState.StakePopup) {
      stake(amountString);
    }
  };

  const onClickCancel = () => {
    if (uIState == UIState.StakePopup) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  };

  return (
    <div className="stake-popup-container">
      <div onClick={onClickCancel} className="stake-popup-mask" />
      <div className="stake-popup-main-container">
        <img src={background} className="stake-popup-main-background" />
        <p className="stake-popup-amount-text">
          Please enter a number between 0 and {userState.player!.data.ticket}.
        </p>
        <input
          type="number"
          className="stake-popup-amount-input"
          value={amountString}
          onChange={(e) => setAmountString(e.target.value)}
          placeholder="Enter amount"
        />
        <div className="stake-popup-confirm-button">
          <ConfirmButton onClick={onClickConfirm} />
        </div>
        <div className="stake-popup-cancel-button">
          <CancelButton onClick={onClickCancel} />
        </div>
      </div>
    </div>
  );
};

export default StakePopup;
