import React from "react";
import "./MemeIcon.css";

interface Props {
  width: number;
  height: number;
  image: string;
}

const MemeIcon = ({ width, height, image }: Props) => {
  return (
    <div
      className="meme-icon-container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
    >
      <img className="meme-icon-image" src={image} />
    </div>
  );
};

export default MemeIcon;
