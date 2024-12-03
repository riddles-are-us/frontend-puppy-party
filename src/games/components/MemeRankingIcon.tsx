import React from "react";
import "./MemeRankingIcon.css";

interface Props {
  width: number;
  height: number;
  image: string;
  rank: number;
}

const MemeRankingIcon = ({ width, height, image, rank }: Props) => {
  return (
    <div
      className="meme-ranking-icon-container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <div className="meme-ranking-icon-margin-container">
        <img className="meme-ranking-icon-image" src={image} />
        <div className="meme-ranking-vote-container">
          <p className="meme-ranking-vote-text">{rank}</p>
        </div>
      </div>
    </div>
  );
};

export default MemeRankingIcon;
