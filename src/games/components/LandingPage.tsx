import React, { useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { AccountSlice } from "zkwasm-minirollup-browser";
import { setTargetMemeIndex } from "../../data/puppy_party/properties";
import { loadAudio } from "../audio";
import { memeInfoList } from "../config";
import background from "../images/landing/landing_bg.png";
import titleImage from "../images/landing/landing_title.png";
import stageBackground from "../images/landing/stage_bg.png";
import "./LandingPage.css";
import PlayButton from "./buttons/PlayButton";
import JoinButton from "./buttons/JoinButton";

const divLayout = [
  [-693, -343, 80],
  [-559, -394, 120],
  [-388, -356, 140],
  [-203, -377, 168],
  [-3, -417, 84],
  [10, -300, 120],
  [181, -364, 120],
  [351, -332, 80],
  [485, -373, 80],
  [-773, -232, 84],
  [-733, -109, 118],
  [-581, -219, 140],
  [-545, -32, 80],
  [-397, -178, 204],
  [-148, -148, 296],
  [192, -201, 180],
  [414, -184, 140],
  [601, -232, 80],
  [-676, 65, 80],
  [-551, 91, 120],
  [-378, 70, 140],
  [181, 26, 140],
  [360, 7, 140],
  [544, -1, 92],
  [-638, 265, 80],
  [-511, 249, 114],
  [-460, 403, 94],
  [-329, 250, 140],
  [-147, 188, 140],
  [-122, 360, 80],
  [32, 215, 204],
  [286, 215, 120],
  [277, 384, 90],
  [442, 316, 84],
  [465, 188, 80],
  [617, 132, 80],
];

function sortLayout<T>(
  array: Array<T>,
  sz: number
): Array<{ index: number; value: T }> {
  let retArray: Array<T> = [...array];

  retArray.sort((a: any, b: any) => {
    return a[2] - b[2];
  }); // accending order

  retArray = retArray.slice(36 - sz);

  const len = retArray.length - 1;

  const ret = retArray.map((v, index) => {
    return {
      index: len - index,
      value: v,
    };
  });
  return ret;
}

function stageDivStyle(layout: Array<number>, index: number) {
  const divStyle = {
    position: "absolute" as const, // ensures type is 'absolute' for TS
    backgroundImage: `url('${memeInfoList[index].cover}')`,
    top: `${layout[1]}px`,
    left: `${layout[0]}px`,
    width: `${layout[2]}px`,
    height: `${layout[2]}px`,
    backgroundColor: "gray",
    border: "1px solid black",
  };
  return divStyle;
}

const shuffled = sortLayout(divLayout, 18);
const installedDiv: JSX.Element[] = [];

interface Props {
  memeList: Array<any>;
}

interface LayoutInfo {
  divs: JSX.Element[];
}

const LandingPage = ({ memeList }: Props) => {
  const dispatch = useAppDispatch();
  const layoutRef = useRef<LayoutInfo | null>(null);
  const [memelayout, setMemeLayout] = useState<LayoutInfo>({
    divs: [],
  });

  /* Not sorting now
    let indexedMemeList = prop.memeList.map((v, index) => {
      return {
        index: index,
        value: v,
      };
    });
  
    indexedMemeList.sort((a: any, b: any) => {
      return b.value.rank - a.value.rank;
    });
     */

  useEffect(() => {
    // Set up an interval that adds a new div every 1 second
    setTimeout(() => {
      setMemeLayout((m) => {
        if (shuffled.length > 0) {
          const l = shuffled.pop();
          const style = stageDivStyle(l!.value, l!.index);
          installedDiv.push(
            <div
              key={installedDiv.length}
              style={style}
              onClick={() => startGame(memeInfoList[l!.index].index)}
            ></div>
          );
          return {
            divs: installedDiv,
          };
        } else {
          return m;
        }
      });
    }, 100);
  }, [memelayout]);

  // Update the ref value whenever `progress` changes
  useEffect(() => {
    layoutRef.current = memelayout;
    return;
  }, []);

  const account = useAppSelector(AccountSlice.selectL1Account);

  function startGame(index: number) {
    console.log(index);
    if (index < memeInfoList.length) {
      dispatch(setTargetMemeIndex(index));
      dispatch(AccountSlice.loginL2AccountAsync(account!));
      loadAudio((ele) => {
        return ele;
      });
    }
  }

  const onClickPlay = () => {
    /**/
  };

  const onClickJoin = () => {
    /**/
  };

  return (
    <div className="landing-page-container">
      <img className="landing-page-background" src={background} />
      <img className="landing-page-title" src={titleImage} />
      <img className="landing-page-stage-background" src={stageBackground} />
      <div className="landing-page-panel-container">
        <p className="landing-page-panel-text">
          Current Season Ends in {"00:00:00"}
        </p>
        <div className="landing-page-panel-play-button">
          <PlayButton onClick={onClickPlay} />
        </div>
        <div className="landing-page-panel-join-button">
          <JoinButton onClick={onClickJoin} />
        </div>
      </div>

      {/* <div className="landing-page-meme-container">{memelayout.divs}</div> */}
    </div>
  );
};

export default LandingPage;
