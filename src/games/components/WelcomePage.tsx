import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AccountSlice } from "zkwasm-minirollup-browser";
import { loadAudio } from "../audio";
import background from "../images/welcome/welcome_bg.png";
import titleImage from "../images/welcome/welcome_title.png";
import peopleBackground from "../images/welcome/people.png";
import stageBackground from "../images/welcome/stage_bg.png";
import dog1 from "../images/welcome/dog1.png";
import dog2 from "../images/welcome/dog2.png";
import speakerGreenLeft from "../images/animations/welcome/green.png";
import speakerGreenRight from "../images/animations/welcome/green1.png";
import speakerPinkLeft from "../images/animations/welcome/pink.png";
import speakerPinkRight from "../images/animations/welcome/pink1.png";
import speakerYellowLeft from "../images/animations/welcome/yellow.png";
import speakerYellowRight from "../images/animations/welcome/yellow1.png";
import "./WelcomePage.css";
import PlayButton from "./buttons/PlayButton";
import MemeIcon from "./MemeIcon";
import Grid from "./Grid";
import MemeRankingIcon from "./MemeRankingIcon";
import { selectCurrentMemes, selectPreviousMemes } from "../../data/memeDatas";

interface Props {
  onStartGame: () => void;
}

const WelcomePage = ({ onStartGame }: Props) => {
  const previousMemes = useAppSelector(selectPreviousMemes);
  const currentMemes = useAppSelector(selectCurrentMemes);
  const rankingContainerRef = useRef<HTMLDivElement>(null);
  const [memeRankingIconElementWidth, setMemeRankingIconElementWidth] =
    useState<number>(0);
  const nextSeasonContainerRef = useRef<HTMLDivElement>(null);
  const [memeIconElementWidth, setMemeIconElementWidth] = useState<number>(0);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [fontSize, setFontSize] = useState<number>(0);
  const animationContainerRef = useRef<HTMLDivElement>(null);
  const [scaleSize, setScaleSize] = useState<number>(0);

  const adjustSize = () => {
    if (textRef.current) {
      const parentWidth = textRef.current.offsetWidth;
      setFontSize(parentWidth / 25);
    }
    if (rankingContainerRef.current) {
      setMemeRankingIconElementWidth(
        rankingContainerRef.current.offsetWidth / 4
      );
    }
    if (nextSeasonContainerRef.current) {
      setMemeIconElementWidth(nextSeasonContainerRef.current.offsetWidth / 3);
    }
    if (animationContainerRef.current) {
      setScaleSize(animationContainerRef.current.offsetWidth / 300);
    }
  };

  useEffect(() => {
    adjustSize();
    window.addEventListener("resize", adjustSize);
    return () => {
      window.removeEventListener("resize", adjustSize);
    };
  }, []);

  function startGame() {
    loadAudio((ele) => {
      return ele;
    });
    onStartGame();
  }

  const onClickPlay = () => {
    startGame();
  };

  return (
    <div className="welcome-page-container">
      <img className="welcome-page-background" src={background} />
      <div className="welcome-page-stage-container">
        <img className="welcome-page-title" src={titleImage} />
        <img
          className="welcome-page-people-background"
          src={peopleBackground}
        />
        <img className="welcome-page-stage-background" src={stageBackground} />
        <img className="welcome-page-stage-dog-1-image" src={dog1} />
        <img className="welcome-page-stage-dog-2-image" src={dog2} />
        <div className="welcome-page-panel-container">
          <p
            ref={textRef}
            className="welcome-page-panel-text"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            Current season runs until Jan 30, 2025
          </p>
          <div className="welcome-page-panel-play-button">
            <PlayButton onClick={onClickPlay} />
          </div>
        </div>
        <div
          ref={rankingContainerRef}
          className="welcome-page-ranking-container"
        >
          <p
            className="welcome-page-ranking-text"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            Current Season Ranking
          </p>
          <div className="welcome-page-ranking-grid">
            <Grid
              elementWidth={memeRankingIconElementWidth}
              elementHeight={memeRankingIconElementWidth}
              columnCount={4}
              rowCount={3}
              elements={currentMemes.slice(0, 12).map((memeData, index) => (
                <MemeRankingIcon
                  key={index}
                  height={memeRankingIconElementWidth}
                  width={memeRankingIconElementWidth}
                  fontSize={fontSize}
                  image={memeData.avatar}
                  rank={memeData.rank}
                />
              ))}
            />
          </div>
        </div>
        <div
          ref={nextSeasonContainerRef}
          className="welcome-page-next-season-container"
        >
          <p
            className="welcome-page-next-season-text"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            Previous Season
          </p>
          <div className="welcome-page-next-season-grid">
            <Grid
              elementWidth={memeIconElementWidth}
              elementHeight={memeIconElementWidth}
              columnCount={3}
              rowCount={4}
              elements={previousMemes.slice(0, 12).map((memeData, index) => (
                <MemeIcon
                  key={index}
                  height={memeIconElementWidth}
                  width={memeIconElementWidth}
                  image={memeData.avatar}
                />
              ))}
            />
          </div>
        </div>
        <img
          className="welcome-page-speaker-green-left-image"
          src={speakerGreenLeft}
        />
        <img
          className="welcome-page-speaker-green-right-image"
          src={speakerGreenRight}
        />
        <img
          className="welcome-page-speaker-pink-left-image"
          src={speakerPinkLeft}
        />
        <img
          className="welcome-page-speaker-pink-right-image"
          src={speakerPinkRight}
        />
        <img
          className="welcome-page-speaker-yellow-left-image"
          src={speakerYellowLeft}
        />
        <img
          className="welcome-page-speaker-yellow-right-image"
          src={speakerYellowRight}
        />
        <div
          ref={animationContainerRef}
          className="welcome-page-left-white-light-left-animation-container"
        >
          <div
            className="welcome-page-left-white-light-left-animation"
            style={{
              transform: `translate(-50%, -50%) scale(${scaleSize * 100}%)`,
            }}
          />
        </div>
        <div className="welcome-page-left-white-light-right-animation-container">
          <div
            className="welcome-page-left-white-light-right-animation"
            style={{
              transform: `translate(-50%, -50%) scale(${scaleSize * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
