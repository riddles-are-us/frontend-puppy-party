import React, { useEffect, useMemo, useRef, useState, memo } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { selectL2Account, selectL1Account, loginL2AccountAsync, loginL1AccountAsync } from "../data/accountSlice";
import { loadAudio } from "./audio";

import {
  setTargetMemeIndex,
} from "../data/puppy_party/properties";


const divLayout = [
  [-693,-343, 80],
  [-559, -394, 120],
  [-388, -356, 140],
  [-203, -377, 168],
  [-3, -417, 84],
  [10,-300, 120],
  [181,-364, 120],
  [351,-332, 80],
  [485,-373, 80],
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
  [-638,265, 80],
  [-511,249, 114],
  [-460,403, 94],
  [-329,250, 140],
  [-147,188, 140],
  [-122,360, 80],
  [32,215, 204],
  [286, 215, 120],
  [277, 384, 90],
  [442, 316, 84],
  [465, 188, 80],
  [617, 132, 80]
];

function shuffleArray<T>(array: T[]): T[] {
  //Loop through the array from the last element to the first
  const retArray:T[] = [];
  const sourceArray = [...array];
  while (sourceArray.length > 0) {
      const j = Math.floor(Math.random() * (sourceArray.length));
      const ele = sourceArray.splice(j, 1);
      retArray.push(ele[0]);
  }
  return retArray;
}

function sortLayout<T>(array: Array<T>): Array<T> {
  const retArray: Array<T> = [...array];
  retArray.sort((a:any, b:any) => {
     return a[2] - b[2];
  });
  return retArray;
}


function stageDivStyle(layout: Array<number>) {
  const divStyle = {
     position: 'absolute' as const, // ensures type is 'absolute' for TS
     top: `${layout[1]}px`,
     left: `${layout[0]}px`,
     width: `${layout[2]}px`,
     height: `${layout[2]}px`,
     backgroundColor: 'gray',
     border: '1px solid black',
  };
  return divStyle;
}

interface LayoutInfo {
  divs: JSX.Element[];
}

const shuffled = sortLayout(divLayout);
const installedDiv: JSX.Element[] = [];

export function GameLanding() {
  const dispatch = useAppDispatch();
  const layoutRef = useRef<LayoutInfo | null>(null);
  const [memelayout, setMemeLayout] = useState<LayoutInfo>({
    divs:[],
  });

  useEffect(() => {
      // Set up an interval that adds a new div every 1 second
    setTimeout(() => {
        setMemeLayout(m => {
          if (shuffled.length > 0) {
            const l = shuffled.pop();
            const style = stageDivStyle(l!);
            installedDiv.push(
             <div style={style} onClick={()=>startGame(shuffled.length)}></div>
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

  const account = useAppSelector(selectL1Account);
  function startGame(index: number) {
      dispatch(setTargetMemeIndex(index));
      dispatch(loginL2AccountAsync(account!));
      loadAudio((ele) => {return ele;});
  }


  return (<div className="loading" id="stage">{memelayout.divs}</div>);
}
