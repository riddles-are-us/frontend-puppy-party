import React from "react";
import "./Popups.css";
import WithdrawPopup from "./popups/WithdrawPopup";
import {
  selectPopupDescription,
  selectUIState,
  UIState,
} from "../../data/puppy_party/properties";
import { useAppSelector } from "../../app/hooks";
import GiftboxPopup from "./popups/GiftboxPopup";
import DepositPopup from "./popups/DepositPopup";
import ConfirmPopup from "./popups/ConfirmPopup";
import ErrorPopup from "./popups/ErrorPopup";
import SponsorPopup from "./popups/SponsorPopup";

const Popups = () => {
  const uIState = useAppSelector(selectUIState);
  const showWithdrawPopup = uIState == UIState.WithdrawPopup;
  const showDepositPopup = uIState == UIState.DepositPopup;
  const showConfirmPopup = uIState == UIState.ConfirmPopup;
  const showErrorPopup = uIState == UIState.ErrorPopup;
  const showGiftboxPopup =
    uIState == UIState.GiftboxPopup || uIState == UIState.QueryGiftbox;
  const showSponsorPopup = uIState == UIState.SponsorPopup;
  const popupDescription = useAppSelector(selectPopupDescription);

  return (
    <>
      {showWithdrawPopup && <WithdrawPopup />}
      {showDepositPopup && <DepositPopup />}
      {showGiftboxPopup && <GiftboxPopup />}
      {showSponsorPopup && <SponsorPopup />}
      {showConfirmPopup && <ConfirmPopup description={popupDescription} />}
      {showErrorPopup && <ErrorPopup description={popupDescription} />}
    </>
  );
};

export default Popups;
