import React from "react";
import "./MemeRankingIcon.css";
import selectingImage from "../images/welcome/tick.png";

interface Props {
  width: number;
  height: number;
  fontSize: number;
  image: string;
  rank: number;
  isSelect: boolean;
  onClick: () => void;
}

const MemeRankingIcon = ({
  width,
  height,
  fontSize,
  image,
  rank,
  isSelect,
  onClick,
}: Props) => {
  return (
    <div
      className="meme-ranking-icon-container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      onClick={onClick}
    >
      <div className="meme-ranking-icon-margin-container">
        <img className="meme-ranking-icon-image" src={image} />
        {isSelect && (
          <img className="meme-ranking-selecting-image" src={selectingImage} />
        )}
        <div className="meme-ranking-vote-container">
          <p
            className="meme-ranking-vote-text"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            {rank.toString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemeRankingIcon;
