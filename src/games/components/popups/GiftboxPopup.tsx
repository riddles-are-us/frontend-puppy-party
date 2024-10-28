import React, { useEffect, useState } from "react";
import background from "../../images/withdraw_frame.png";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import "./GiftboxPopup.css";
import { queryState, sendTransaction } from "../../request";
import { selectL1Account, selectL2Account } from "../../../data/accountSlice";
import {
  selectNonce,
  selectUIState,
  setUIState,
  UIState,
} from "../../../data/puppy_party/properties";
import GiftboxConfirmButton from "../buttons/GiftboxConfirmButton";
import giftbox_image from "../../images/animations/giftbox.png";
import giftbox_title from "../../images/giftbox_title.png";
import { getTransactionCommandArray } from "../../rpc";

const LOTTERY = 6n;

const GiftboxPopup = () => {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);
  const nonce = useAppSelector(selectNonce);
  const l2account = useAppSelector(selectL2Account);

  const onClickConfirm = () => {
    if (uIState == UIState.GiftboxPopup) {
      dispatch(setUIState({ uIState: UIState.QueryGiftbox }));

      dispatch(
        sendTransaction({
          cmd: getTransactionCommandArray(LOTTERY, nonce, [0n, 0n, 0n]),
          prikey: l2account!.address,
        })
      ).then((action) => {
        if (sendTransaction.fulfilled.match(action)) {
          dispatch(queryState({ cmd: [], prikey: l2account!.address })).then(
            (action) => {
              if (queryState.fulfilled.match(action)) {
                dispatch(setUIState({ uIState: UIState.Idle }));
              }
            }
          );
        }
      });
    }
  };

  return (
    <>
      <link rel="preload" href={giftbox_image} as="image" />
      <div className="giftbox-popup-container">
        <div className="giftbox-popup-main-container">
          <div className="giftbox-popup-main-animation" />
          <img src={giftbox_title} className="giftbox-popup-title-image" />
          <div className="giftbox-popup-confirm-button">
            <GiftboxConfirmButton onClick={onClickConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftboxPopup;
