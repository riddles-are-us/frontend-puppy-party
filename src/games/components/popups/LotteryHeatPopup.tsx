import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./LotteryHeatPopup.css";
import { AccountSlice } from "zkwasm-minirollup-browser";
import GiftboxConfirmButton from "../buttons/GiftboxConfirmButton";
import sponsor_image from "../../images/animations/sponsor.png";
import { getWithdrawLotteryTransactionParameter } from "../../api";
import {
  resetLotteryInfoDiff,
  selectUIState,
  setUIState,
  UIState,
} from "../../../data/ui";
import { selectUserState } from "../../../data/state";
import { sendTransaction } from "zkwasm-minirollup-browser/src/connect";

const LotteryHeatPopup = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUserState);
  const uIState = useAppSelector(selectUIState);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const l1account = useAppSelector(AccountSlice.selectL1Account);

  const withdrawLottery = () => {
    dispatch(
      sendTransaction(
        getWithdrawLotteryTransactionParameter(
          l1account!,
          l2account!,
          BigInt(userState.player!.data.lottery_info),
          BigInt(userState.player!.nonce)
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
    if (uIState == UIState.LotteryHeatPopup) {
      dispatch(setUIState({ uIState: UIState.QueryLotteryHeat }));
      withdrawLottery();
    }
  };

  return (
    <>
      <link rel="preload" href={sponsor_image} as="image" />
      <div className="lottery-heat-popup-container">
        <div className="lottery-heat-popup-main-container">
          <div className="lottery-heat-popup-main-animation" />
          <p className="lottery-heat-popup-sponsor-text">Cash out</p>
          <p className="lottery-heat-popup-description-text">
            {userState.player!.data.lottery_info}
          </p>
          <div className="lottery-heat-popup-confirm-button">
            <GiftboxConfirmButton onClick={onClickConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LotteryHeatPopup;
