import React, { useEffect, useRef } from "react";
import "./GiftboxNotes.css";

interface Props {
  animationIndex: number;
  rewardAnimation: boolean;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  popupAnimationDelay: number;
  rewardAnimationDelay: number;
  shakeAnimationDelay: number;
  noteImagePath: string;
  opacity: number;
  onAnimationEnd: () => void;
}

const GiftboxNotes = ({
  animationIndex,
  rewardAnimation,
  startPosition,
  endPosition,
  popupAnimationDelay,
  rewardAnimationDelay,
  shakeAnimationDelay,
  opacity,
  noteImagePath,
  onAnimationEnd,
}: Props) => {
  const getParabolaXStartPositionString = () => {
    return `translate(0px, 0px)`;
  };

  const getParabolaXEndPositionString = () => {
    return `translate(${endPosition.x - startPosition.x}px, 0px)`;
  };

  const getParabolaYStartPositionString = () => {
    return `translate(0px, 0px)`;
  };

  const getParabolaYEndPositionString = () => {
    return `translate(0px, ${endPosition.y - startPosition.y}px)`;
  };

  const popUpRef = useRef<HTMLDivElement | null>(null);
  const parabolaXRef = useRef<HTMLDivElement | null>(null);
  const parabolaYRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const popUpAnimationName = `GiftboxNotePopUp-${animationIndex}`;
  const parabolaXAnimationName = `GiftboxNoteParabolaX-${animationIndex}`;
  const parabolaYAnimationName = `GiftboxNoteParabolaY-${animationIndex}`;
  const enlargeAnimationName = `GiftboxNoteEnlarge-${animationIndex}`;

  const onIconAnimationEnd = (setEndPosition: () => void) => {
    removeAnimation();
    setEndPosition();
  };

  const removeAnimation = () => {
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i] as CSSKeyframesRule;
      if (
        rule.name == popUpAnimationName ||
        rule.name == parabolaYAnimationName ||
        rule.name == parabolaYAnimationName ||
        rule.name == enlargeAnimationName
      ) {
        styleSheet.deleteRule(i);
      }
    }
  };

  const InitPopupAnimation = () => {
    const popUpContainer = popUpRef.current;
    if (popUpContainer) {
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const popUpkeyframes = `
        @keyframes ${popUpAnimationName} {
            0% {
                opacity: 0;
                transform: translateY(50px);
            }
            50% {
                opacity: ${opacity / 2};
                transform: translateY(-15px);
            }
            100% {
                opacity: ${opacity};
                transform: translateY(0);
            }
        }
        `;
      popUpContainer.style.animation = `${popUpAnimationName} 1s ease forwards`;
      popUpContainer.style.animationDelay = `${popupAnimationDelay}s`;
      styleSheet.insertRule(popUpkeyframes, styleSheet.cssRules.length);
    }
  };

  const InitRewardAnimation = () => {
    const parabolaXContainer = parabolaXRef.current;
    const parabolaYContainer = parabolaYRef.current;
    const imageRefContainer = imageRef.current;
    if (parabolaXContainer && parabolaYContainer && imageRefContainer) {
      const parabolaXStartPositionString = getParabolaXStartPositionString();
      const parabolaXEndPositionString = getParabolaXEndPositionString();
      const parabolaYStartPositionString = getParabolaYStartPositionString();
      const parabolaYEndPositionString = getParabolaYEndPositionString();
      const styleSheet = document.styleSheets[0] as CSSStyleSheet;
      const parabolaXKeyframes = `
          @keyframes ${parabolaXAnimationName} {
            0% { transform: ${parabolaXStartPositionString}; }
            10% { transform: ${parabolaXStartPositionString}; }
            100% { transform: ${parabolaXEndPositionString}; }
          }
        `;
      parabolaXContainer.style.animation = `${parabolaXAnimationName} 0.5s linear`;
      parabolaXContainer.style.animationDelay = `${rewardAnimationDelay}s`;
      const parabolaYKeyframes = `
          @keyframes ${parabolaYAnimationName} {
            0% { transform: ${parabolaYStartPositionString}; }
            10% { transform: ${parabolaYStartPositionString}; }
            100% { transform: ${parabolaYEndPositionString}; }
          }
        `;
      parabolaYContainer.style.animation = `${parabolaYAnimationName} 0.5s cubic-bezier(.5,0,.8,.5)`;
      parabolaYContainer.style.animationDelay = `${rewardAnimationDelay}s`;
      const enlargeKeyframes = `
          @keyframes ${enlargeAnimationName} {
            0% { transform: translate(-50%, -50%) scale(100%, 100%); }
            50% { transform: translate(-50%, -50%) scale(100%, 100%); }
            100% { transform: translate(-50%, -50%) scale(150%, 150%); }
          }
        `;
      imageRefContainer.style.animation = `${enlargeAnimationName} 0.5s linear`;
      imageRefContainer.style.animationDelay = `${rewardAnimationDelay}s`;

      styleSheet.insertRule(parabolaXKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(parabolaYKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(enlargeKeyframes, styleSheet.cssRules.length);

      const setEndPosition = () => {
        parabolaXContainer.style.transform = parabolaXEndPositionString;
        parabolaYContainer.style.transform = parabolaYEndPositionString;
      };

      parabolaXContainer.removeEventListener("animationend", () =>
        onIconAnimationEnd(setEndPosition)
      );
      parabolaXContainer.addEventListener("animationend", () =>
        onIconAnimationEnd(setEndPosition)
      );
    }
  };

  useEffect(() => {
    InitPopupAnimation();
  }, []);

  useEffect(() => {
    if (rewardAnimation) {
      InitRewardAnimation();
    }
  }, [rewardAnimation]);

  //   return <div>GiftboxNotes</div>;
  return (
    <div
      className="giftbox-popup-note-container"
      style={{
        left: `calc(50% + ${startPosition.x}px)`,
        top: `calc(50% + ${startPosition.y}px)`,
      }}
    >
      <div
        ref={parabolaXRef}
        className={"giftbox-popup-note-animation-container"}
        onAnimationEnd={onAnimationEnd}
      >
        <div
          ref={parabolaYRef}
          className={"giftbox-popup-note-animation-container"}
        >
          <div ref={popUpRef} className="giftbox-popup-note-pop-up-animation">
            <div
              className={"giftbox-popup-note-shake-animation"}
              style={{ animationDelay: `${shakeAnimationDelay}s` }}
            >
              <div
                ref={imageRef}
                className="giftbox-popup-note-image"
                style={{
                  backgroundImage: `url(${noteImagePath})`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftboxNotes;
