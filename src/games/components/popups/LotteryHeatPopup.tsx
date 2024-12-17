import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./LotteryHeatPopup.css";
import { sendTransaction } from "../../request";
import { AccountSlice } from "zkwasm-minirollup-browser";
import {
  resetLotteryInfoDiff,
  selectLotteryInfo,
  selectLotteryInfoDiff,
  selectNonce,
  setUIState,
  UIState,
} from "../../../data/puppy_party/properties";
import GiftboxConfirmButton from "../buttons/GiftboxConfirmButton";
import sponsor_image from "../../images/animations/sponsor.png";
import sponsor_logo from "../../images/sponsor_logo.png";
import { getWithdrawLotteryTransactionParameter } from "../../api";

const LotteryHeatPopup = () => {
  const dispatch = useAppDispatch();
  const nonce = useAppSelector(selectNonce);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const l1account = useAppSelector(AccountSlice.selectL1Account);
  const lotteryInfo = useAppSelector(selectLotteryInfo);

  const withdrawLottery = () => {
    dispatch(
      sendTransaction(
        getWithdrawLotteryTransactionParameter(
          l1account!,
          l2account!,
          BigInt(lotteryInfo),
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
      <div className="lottery-heat-popup-container">
        <div className="lottery-heat-popup-main-container">
          <div className="lottery-heat-popup-main-animation" />
          <p className="lottery-heat-popup-sponsor-text">Cash out</p>
          <img
            src={sponsor_logo}
            className="lottery-heat-popup-sponsor-image"
          />
          <p className="lottery-heat-popup-description-text">$ {lotteryInfo}</p>
          <div className="lottery-heat-popup-confirm-button">
            <GiftboxConfirmButton onClick={onClickConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default LotteryHeatPopup;
