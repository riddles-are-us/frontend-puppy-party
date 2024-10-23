import React, { useEffect } from "react";
import "./TopMenu.css";
import WithdrawButton from "./Buttons/WithdrawButton";
import {
  selectBalance,
  selectUIState,
  setUIState,
  UIState,
} from "../../data/puppy_party/properties";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function TopMenu() {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(selectUIState);
  const balance = useAppSelector(selectBalance);

  const onClickWithdraw = () => {
    if (uiState == UIState.Idle) {
      dispatch(setUIState({ uIState: UIState.WithdrawPopup }));
    }
  };

  return (
    <div className="top-menu-container">
      <div className="top-menu-background" />
      <div className="top-menu-withdraw-button">
        <WithdrawButton onClick={onClickWithdraw} />
      </div>
      <div className="top-menu-balance-text">balance: {balance}</div>
    </div>
  );
}

export default TopMenu;
