import React from "react";
import "./Popups.css";
import WithdrawPopup from "./popups/WithdrawPopup";
import { selectUIState, UIState } from "../../data/puppy_party/properties";
import { useAppSelector } from "../../app/hooks";
import GiftboxPopup from "./popups/GiftboxPopup";
import DepositPopup from "./popups/DepositPopup";

const Popups = () => {
  const uIState = useAppSelector(selectUIState);
  const showWithdrawPopup = uIState == UIState.WithdrawPopup;
  const showDepositPopup = uIState == UIState.DepositPopup;
  const showGiftboxPopup =
    uIState == UIState.GiftboxPopup || uIState == UIState.QueryGiftbox;

  return (
    <>
      {showWithdrawPopup && <WithdrawPopup />}
      {showDepositPopup && <DepositPopup />}
      {showGiftboxPopup && <GiftboxPopup />}
    </>
  );
};

export default Popups;
