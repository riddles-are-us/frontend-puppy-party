import React from "react";
import "./WelcomeMeme.css";
import empty1 from "../images/welcome/people/1.png";
import empty2 from "../images/welcome/people/2.png";
import empty3 from "../images/welcome/people/3.png";
import empty4 from "../images/welcome/people/4.png";
import empty5 from "../images/welcome/people/5.png";
import empty6 from "../images/welcome/people/6.png";
import { MemeProp } from "../season";

const emptyImages = [empty1, empty2, empty3, empty4, empty5, empty6];

interface Props {
  index: number;
  meme: MemeProp;
}

const WelcomeMeme = ({ index, meme }: Props) => {
  return (
    <div className="welcome-meme-container">
      {meme.data.spriteSheet == "" ? (
        <img
          className="welcome-meme-empty-image"
          src={emptyImages[index % emptyImages.length]}
        />
      ) : (
        <img className="welcome-meme-image" src={meme.data.spriteSheet} />
      )}
    </div>
  );
};

export default WelcomeMeme;
