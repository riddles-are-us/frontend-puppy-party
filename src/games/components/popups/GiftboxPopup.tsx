import React, { useEffect, useRef, useState } from "react";
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
import note1 from "../../images/note/note1.png";
import note2 from "../../images/note/note2.png";
import note3 from "../../images/note/note3.png";
import note4 from "../../images/note/note4.png";
import note5 from "../../images/note/note5.png";
import note6 from "../../images/note/note6.png";
import note7 from "../../images/note/note7.png";
import note8 from "../../images/note/note8.png";
import note9 from "../../images/note/note9.png";
import note10 from "../../images/note/note10.png";
import { getTransactionCommandArray } from "../../rpc";
import GiftboxNotes from "./GiftboxNotes";

const LOTTERY = 6n;

interface GiftboxNoteProps {
  startPosition: { x: number; y: number };
  popupAnimationDelay: number;
  rewardAnimationDelay: number;
  noteImagePath: string;
}

const giftboxNotesProps: GiftboxNoteProps[] = [
  {
    startPosition: { x: 15, y: 26 },
    popupAnimationDelay: 0.0,
    rewardAnimationDelay: 0.0,
    noteImagePath: note1,
  },
  {
    startPosition: { x: 11, y: 38 },
    popupAnimationDelay: 0.05,
    rewardAnimationDelay: 0.1,
    noteImagePath: note2,
  },
  {
    startPosition: { x: 32, y: 30 },
    popupAnimationDelay: 0.1,
    rewardAnimationDelay: 0.2,
    noteImagePath: note3,
  },
  {
    startPosition: { x: 10, y: 36 },
    popupAnimationDelay: 0.15,
    rewardAnimationDelay: 0.3,
    noteImagePath: note4,
  },
  {
    startPosition: { x: 0, y: 29 },
    popupAnimationDelay: 0.2,
    rewardAnimationDelay: 0.4,
    noteImagePath: note5,
  },
  {
    startPosition: { x: 4, y: 21 },
    popupAnimationDelay: 0.25,
    rewardAnimationDelay: 0.5,
    noteImagePath: note6,
  },
  {
    startPosition: { x: 20, y: 30 },
    popupAnimationDelay: 0.3,
    rewardAnimationDelay: 0.6,
    noteImagePath: note7,
  },
  {
    startPosition: { x: 15, y: 26 },
    popupAnimationDelay: 0.35,
    rewardAnimationDelay: 0.7,
    noteImagePath: note8,
  },
  {
    startPosition: { x: 32, y: 38 },
    popupAnimationDelay: 0.4,
    rewardAnimationDelay: 0.8,
    noteImagePath: note9,
  },
  {
    startPosition: { x: 6, y: 37 },
    popupAnimationDelay: 0.45,
    rewardAnimationDelay: 0.9,
    noteImagePath: note10,
  },
];

const GiftboxPopup = () => {
  const dispatch = useAppDispatch();
  const uIState = useAppSelector(selectUIState);
  const nonce = useAppSelector(selectNonce);
  const l2account = useAppSelector(selectL2Account);
  const [rewardAnimation, setRewardAnimation] = useState(false);
  const [finishQuery, setFinishQuery] = useState(false);
  const parentRef = useRef<HTMLDivElement | null>(null);

  const getEndPosition = (parentContainer: HTMLDivElement | null) => {
    return parentContainer == null
      ? {
          x: 0,
          y: 0,
        }
      : {
          x: parentContainer.clientWidth / 2 - 340,
          y: -(parentContainer.clientHeight / 2 + 30),
        };
  };
  const endPosition = getEndPosition(parentRef && parentRef.current);

  const onClickConfirm = () => {
    console.log(uIState);
    if (uIState == UIState.GiftboxPopup) {
      setFinishQuery(false);
      setRewardAnimation(true);
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
                setFinishQuery(true);
              }
            }
          );
        }
      });
    }
  };

  const onAnimationEnd = () => {
    setRewardAnimation(false);
  };

  useEffect(() => {
    if (!rewardAnimation && finishQuery) {
      dispatch(setUIState({ uIState: UIState.Idle }));
    }
  }, [rewardAnimation, finishQuery]);

  return (
    <>
      <link rel="preload" href={giftbox_image} as="image" />
      <div ref={parentRef} className="giftbox-popup-container">
        <div className="giftbox-popup-main-container">
          <div className="giftbox-popup-main-animation" />
          <img src={giftbox_title} className="giftbox-popup-title-image" />

          <div className="giftbox-popup-notes-animation-container">
            {giftboxNotesProps.map((prop, index) => (
              <GiftboxNotes
                animationIndex={index}
                rewardAnimation={rewardAnimation}
                onAnimationEnd={
                  index == giftboxNotesProps.length - 1
                    ? onAnimationEnd
                    : () => {
                        /* */
                      }
                }
                startPosition={prop.startPosition}
                endPosition={endPosition}
                popupAnimationDelay={prop.popupAnimationDelay}
                rewardAnimationDelay={prop.rewardAnimationDelay}
                noteImagePath={prop.noteImagePath}
              />
            ))}
          </div>

          <div className="giftbox-popup-confirm-button">
            <GiftboxConfirmButton onClick={onClickConfirm} />
          </div>
        </div>
      </div>
    </>
  );
};

export default GiftboxPopup;
