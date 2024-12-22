import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./SponsorPopup.css";
import {
  resetLotteryInfoDiff,
  selectLotteryInfoDiff,
  setUIState,
  UIState,
} from "../../../data/puppy_party/properties";
import GiftboxConfirmButton from "../buttons/GiftboxConfirmButton";
import sponsor_image from "../../images/animations/sponsor.png";
import { SponsorLogo } from "../../config";

const SponsorPopup = () => {
  const dispatch = useAppDispatch();
  const lotteryInfoDiff = useAppSelector(selectLotteryInfoDiff);

  const onClickConfirm = () => {
    dispatch(setUIState({ uIState: UIState.Idle }));
    dispatch(resetLotteryInfoDiff({}));
  };

  return (
    <>
      <link rel="preload" href={sponsor_image} as="image" />
      <div className="sponsor-popup-container">
        <div className="sponsor-popup-main-container">
          <div className="sponsor-popup-main-animation" />
          <p className="sponsor-popup-description-text">
            Lottery pool has reached ${lotteryInfoDiff}
          </p>
          <p className="sponsor-popup-sponsor-text">Sponsored by</p>
          <img src={SponsorLogo} className="sponsor-popup-sponsor-image" />
          <div className="sponsor-popup-confirm-button">
            <GiftboxConfirmButton onClick={onClickConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default SponsorPopup;
