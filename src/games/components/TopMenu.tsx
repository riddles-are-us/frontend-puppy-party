import React, { useEffect } from "react";
import "./TopMenu.css";
import WithdrawButton from "./buttons/WithdrawButton";
import {
  selectBalance,
  selectTicket,
  selectUIState,
  setUIState,
  UIState,
} from "../../data/puppy_party/properties";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCover, memeInfoList } from "../config";
import DepositButton from "./buttons/DepositButton";
import ticketIcon from "../images/ticket_icon.png";
import balanceIcon from "../images/balance_icon.png";

interface Props {
  targetMemeIndex: number;
  targetMemeRank: number;
}

function TopMenu({ targetMemeIndex, targetMemeRank }: Props) {
  const dispatch = useAppDispatch();
  const uiState = useAppSelector(selectUIState);
  const balance = useAppSelector(selectBalance);
  const ticket = useAppSelector(selectTicket);
  const onClickWithdraw = () => {
    if (uiState == UIState.Idle) {
      dispatch(setUIState({ uIState: UIState.WithdrawPopup }));
    }
  };

  const onClickDeposit = () => {
    if (uiState == UIState.Idle) {
      dispatch(setUIState({ uIState: UIState.DepositPopup }));
    }
  };

  return (
    <div className="top-menu-container">
      <div className="top-menu-background" />
      <div className="top-menu-withdraw-button">
        <WithdrawButton onClick={onClickWithdraw} />
      </div>
      <div className="top-menu-deposit-button">
        <DepositButton onClick={onClickDeposit} />
      </div>
      <div className="top-menu-ticket-text">ticket: {ticket}</div>
      <img src={ticketIcon} className="top-menu-ticket-icon"></img>
      <div className="top-menu-balance-text">balance: {balance}</div>
      <img src={balanceIcon} className="top-menu-balance-icon"></img>
      <div className="top-menu-vote-text">Vote: {targetMemeRank}</div>
      <img src={getCover(targetMemeIndex)} className="top-menu-vote-icon"></img>
    </div>
  );
}

export default TopMenu;
