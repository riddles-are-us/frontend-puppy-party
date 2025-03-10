import React, { useEffect } from "react";
import "./TopMenu.css";
import WithdrawButton from "./buttons/WithdrawButton";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import DepositButton from "./buttons/DepositButton";
import ticketIcon from "../images/ticket_icon.png";
import balanceIcon from "../images/balance_icon.png";
import { setUIState, UIState } from "../../data/ui";
import { selectConnectState, selectUserState } from "../../data/state";
import { selectCurrentMemes } from "../../data/memeDatas";
import JoinButton from "./buttons/JoinButton";
import { ConnectState } from "zkwasm-minirollup-browser";

interface Props {
  targetMemeIndex: number;
}

function TopMenu({ targetMemeIndex }: Props) {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUserState);
  const connectState = useAppSelector(selectConnectState);
  const currentMemes = useAppSelector(selectCurrentMemes);

  const onClickJoin = () => {
    if (connectState == ConnectState.Idle) {
      dispatch(setUIState({ uIState: UIState.UploadMemePopup }));
    }
  };

  const onClickWithdraw = () => {
    if (connectState == ConnectState.Idle) {
      dispatch(setUIState({ uIState: UIState.WithdrawPopup }));
    }
  };

  const onClickDeposit = () => {
    if (connectState == ConnectState.Idle) {
      dispatch(setUIState({ uIState: UIState.DepositPopup }));
    }
  };

  return (
    <div className="top-menu-container">
      <div className="top-menu-background" />
      <div className="top-menu-join-button">
        <JoinButton onClick={onClickJoin} />
      </div>
      <div className="top-menu-withdraw-button">
        <WithdrawButton onClick={onClickWithdraw} />
      </div>
      <div className="top-menu-deposit-button">
        <DepositButton onClick={onClickDeposit} />
      </div>
      <div className="top-menu-ticket-text">
        Ticket: {userState.player!.data.ticket}
      </div>
      <img src={ticketIcon} className="top-menu-ticket-icon"></img>
      <div className="top-menu-balance-text">
        DiscoNote: {userState.player!.data.balance}
      </div>
      <img src={balanceIcon} className="top-menu-balance-icon"></img>
      <div className="top-menu-vote-text">
        Vote: {currentMemes[targetMemeIndex].model.rank}
      </div>
      <img
        src={currentMemes[targetMemeIndex].data.avatar}
        className="top-menu-vote-icon"
      ></img>
    </div>
  );
}

export default TopMenu;
