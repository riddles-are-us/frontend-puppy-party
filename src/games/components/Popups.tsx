import React from "react";
import "./Popups.css";
import WithdrawPopup from "./popups/WithdrawPopup";
import { selectUIState, UIState } from "../../data/puppy_party/properties";
import { useAppSelector } from "../../app/hooks";
import GiftboxPopup from "./popups/GiftboxPopup";

const Popups = () => {
  const uIState = useAppSelector(selectUIState);
  const showWithdrawPopup = uIState == UIState.WithdrawPopup;
  const showGiftboxPopup = uIState == UIState.GiftboxPopup;

  return (
    <>
      {showWithdrawPopup && <WithdrawPopup />}
      {showGiftboxPopup && <GiftboxPopup />}
    </>
  );
};

export default Popups;
