import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AccountSlice } from "zkwasm-minirollup-browser";
import { selectUserState } from "../../data/state";
import { loadAudio } from "../audio";
import { MemeSeasonCurrent, MemeSeasonPrevious } from "../config";
import background from "../images/landing/landing_bg.png";
import titleImage from "../images/landing/landing_title.png";
import peopleBackground from "../images/landing/people.png";
import stageBackground from "../images/landing/stage_bg.png";
import dog1 from "../images/landing/dog1.png";
import dog2 from "../images/landing/dog2.png";
import speakerGreenLeft from "../images/animations/landing/green.png";
import speakerGreenRight from "../images/animations/landing/green1.png";
import speakerPinkLeft from "../images/animations/landing/pink.png";
import speakerPinkRight from "../images/animations/landing/pink1.png";
import speakerYellowLeft from "../images/animations/landing/yellow.png";
import speakerYellowRight from "../images/animations/landing/yellow1.png";
import "./LandingPage.css";
import PlayButton from "./buttons/PlayButton";
import JoinButton from "./buttons/JoinButton";
import MemeIcon from "./MemeIcon";
import Grid from "./Grid";
import MemeRankingIcon from "./MemeRankingIcon";
import { selectMemeList } from "../../data/ui";

const LandingPage = () => {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectUserState);
  const memeList = useAppSelector(selectMemeList);
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

  const account = useAppSelector(AccountSlice.selectL1Account);

  function startGame(index: number) {
    console.log(index);
    if (index < MemeSeasonCurrent.memeInfoList.length) {
      dispatch(AccountSlice.loginL2AccountAsync(account!.address));
      loadAudio((ele) => {
        return ele;
      });
    }
  }

  const onClickPlay = () => {
    startGame(0);
  };

  const onClickJoin = () => {
    /**/
  };

  return (
    <div className="landing-page-container">
      <img className="landing-page-background" src={background} />
      <div className="landing-page-stage-container">
        <img className="landing-page-title" src={titleImage} />
        <img
          className="landing-page-people-background"
          src={peopleBackground}
        />
        <img className="landing-page-stage-background" src={stageBackground} />
        <img className="landing-page-stage-dog-1-image" src={dog1} />
        <img className="landing-page-stage-dog-2-image" src={dog2} />
        <div className="landing-page-panel-container">
          <p
            ref={textRef}
            className="landing-page-panel-text"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            Current season runs until Jan 30, 2025
          </p>
          <div className="landing-page-panel-play-button">
            <PlayButton onClick={onClickPlay} />
          </div>
          {/* disable join meme temporary  */}
          {/* <div className="landing-page-panel-join-button">
						<JoinButton onClick={onClickJoin} />
					</div> */}
        </div>
        <div
          ref={rankingContainerRef}
          className="landing-page-ranking-container"
        >
          <p
            className="landing-page-ranking-text"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            Current Season Ranking
          </p>
          <div className="landing-page-ranking-grid">
            <Grid
              elementWidth={memeRankingIconElementWidth}
              elementHeight={memeRankingIconElementWidth}
              columnCount={4}
              rowCount={3}
              elements={MemeSeasonCurrent.memeInfoList
                .slice(0, 12)
                .map((memeInfo, index) => (
                  <MemeRankingIcon
                    key={index}
                    height={memeRankingIconElementWidth}
                    width={memeRankingIconElementWidth}
                    fontSize={fontSize}
                    image={memeInfo.cover}
                    rank={memeList[memeInfo.index].rank}
                  />
                ))}
            />
          </div>
        </div>
        <div
          ref={nextSeasonContainerRef}
          className="landing-page-next-season-container"
        >
          <p
            className="landing-page-next-season-text"
            style={{
              fontSize: `${fontSize}px`,
            }}
          >
            Previous Season
          </p>
          <div className="landing-page-next-season-grid">
            <Grid
              elementWidth={memeIconElementWidth}
              elementHeight={memeIconElementWidth}
              columnCount={3}
              rowCount={4}
              elements={MemeSeasonPrevious.memeInfoList
                .slice(0, 12)
                .map((memeInfo, index) => (
                  <MemeIcon
                    key={index}
                    height={memeIconElementWidth}
                    width={memeIconElementWidth}
                    image={memeInfo.cover}
                  />
                ))}
            />
          </div>
        </div>
        <img
          className="landing-page-speaker-green-left-image"
          src={speakerGreenLeft}
        />
        <img
          className="landing-page-speaker-green-right-image"
          src={speakerGreenRight}
        />
        <img
          className="landing-page-speaker-pink-left-image"
          src={speakerPinkLeft}
        />
        <img
          className="landing-page-speaker-pink-right-image"
          src={speakerPinkRight}
        />
        <img
          className="landing-page-speaker-yellow-left-image"
          src={speakerYellowLeft}
        />
        <img
          className="landing-page-speaker-yellow-right-image"
          src={speakerYellowRight}
        />
        <div
          ref={animationContainerRef}
          className="landing-page-left-white-light-left-animation-container"
        >
          <div
            className="landing-page-left-white-light-left-animation"
            style={{
              transform: `translate(-50%, -50%) scale(${scaleSize * 100}%)`,
            }}
          />
        </div>
        <div className="landing-page-left-white-light-right-animation-container">
          <div
            className="landing-page-left-white-light-right-animation"
            style={{
              transform: `translate(-50%, -50%) scale(${scaleSize * 100}%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
