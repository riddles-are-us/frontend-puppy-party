import React, { useEffect, useRef } from "react";
import "./GiftboxNotes.css";

interface Props {
  animationIndex: number;
  rewardAnimation: boolean;
  startPosition: { x: number; y: number };
  endPosition: { x: number; y: number };
  popupAnimationDelay: number;
  rewardAnimationDelay: number;
  noteImagePath: string;
  onAnimationEnd: () => void;
}

const GiftboxNotes = ({
  animationIndex,
  rewardAnimation,
  startPosition,
  endPosition,
  popupAnimationDelay,
  rewardAnimationDelay,
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

  const parabolaXRef = useRef<HTMLDivElement | null>(null);
  const parabolaYRef = useRef<HTMLDivElement | null>(null);
  const parabolaXAnimationName = `GiftboxNoteParabolaX-${animationIndex}`;
  const parabolaYAnimationName = `GiftboxNoteParabolaY-${animationIndex}`;

  const onIconAnimationEnd = (setEndPosition: () => void) => {
    removeAnimation();
    setEndPosition();
  };

  const removeAnimation = () => {
    const styleSheet = document.styleSheets[0] as CSSStyleSheet;
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
      const rule = styleSheet.cssRules[i] as CSSKeyframesRule;
      if (
        rule.name == parabolaXAnimationName ||
        rule.name == parabolaYAnimationName
      ) {
        styleSheet.deleteRule(i);
      }
    }
  };

  const InitAnimation = () => {
    const parabolaXContainer = parabolaXRef.current;
    const parabolaYContainer = parabolaYRef.current;
    if (parabolaXContainer && parabolaYContainer) {
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
      parabolaXContainer.style.transform = parabolaXStartPositionString;
      parabolaXContainer.style.animation = `${parabolaXAnimationName} 0.5s linear ${rewardAnimationDelay}s`;
      const parabolaYKeyframes = `
          @keyframes ${parabolaYAnimationName} {
            0% { transform: ${parabolaYStartPositionString}; }
            10% { transform: ${parabolaYStartPositionString}; }
            100% { transform: ${parabolaYEndPositionString}; }
          }
        `;
      parabolaYContainer.style.transform = parabolaYStartPositionString;
      parabolaYContainer.style.animation = `${parabolaYAnimationName} 0.5s cubic-bezier(.5,0,.8,.5) ${rewardAnimationDelay}s`;

      styleSheet.insertRule(parabolaXKeyframes, styleSheet.cssRules.length);
      styleSheet.insertRule(parabolaYKeyframes, styleSheet.cssRules.length);

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
    if (rewardAnimation) {
      InitAnimation();
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
          <div
            className="giftbox-popup-note-pop-up-animation"
            style={{ animationDelay: `${popupAnimationDelay}s` }}
          >
            <img src={noteImagePath} className="giftbox-popup-note-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftboxNotes;
