import { useEffect, useState } from "react";
import { getMemeModelMap } from "./express";
import sanityClient from "./sanityClient";
import { SeasonData } from "./season";
import {
  setSeasonData,
  setMemeModelMap,
  fillCurrentMemeIds,
} from "../data/memeDatas";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  selectConnectState,
  selectNullableConfig,
  selectNullableUserState,
  setConnectState,
} from "../data/state";
import Gameplay from "./components/Gameplay";
import LoadingPage from "./components/LoadingPage";
import WelcomePage from "./components/WelcomePage";
import { selectL2Account } from "zkwasm-minirollup-browser/src/reduxstate";
import {
  queryInitialState,
  queryState,
} from "zkwasm-minirollup-browser/src/connect";
import { ConnectState } from "zkwasm-minirollup-browser";
import "./style.scss";
import { ConnectController } from "./components/common/ConnectController";

export function LoadingController() {
  const dispatch = useAppDispatch();
  const userState = useAppSelector(selectNullableUserState);
  const config = useAppSelector(selectNullableConfig);
  const l2account = useAppSelector(selectL2Account);
  const connectState = useAppSelector(selectConnectState);
  const [inc, setInc] = useState(0);

  // update State
  function updateState() {
    if (connectState == ConnectState.Init && userState == null) {
      dispatch(queryInitialState("1"));
    }
    setInc(inc + 1);
  }

  useEffect(() => {
    setTimeout(() => {
      updateState();
    }, 5000);
  }, [inc]);

  const requireContext = require.context(
    "./images",
    true,
    /\.(png|jpg|jpeg|gif)$/
  );
  const imageUrls = requireContext.keys().map(requireContext) as string[];

  const querySanity = async () => {
    const query = `
		*[_type == "season" && (isCurrentSeason == true || isPreviousSeason == true)] {
			name,
			seasonEndDate,
			"isCurrentSeason": coalesce(isCurrentSeason, false),
			"isPreviousSeason": coalesce(isPreviousSeason, false),
			"memes": coalesce(memes[]->{
				id,
				name,
				"avatar": avatar.asset->url,
				"spriteSheet": spriteSheet.asset->url
			}, [])
		}`;

    const seasonDatas: SeasonData[] = await sanityClient
      .fetch(query)
      .catch((error: any) => {
        console.error("Error fetching data:", error);
      });

    const seasonData = seasonDatas.find((season) => season.isCurrentSeason);
    if (seasonData) {
      dispatch(setSeasonData({ seasonData }));
    }
  };

  const onStart = async () => {
    await querySanity();
    const memeModelMap = await getMemeModelMap();
    dispatch(setMemeModelMap({ memeModelMap }));
  };

  const onStartGameplay = () => {
    dispatch(fillCurrentMemeIds({}));
  };

  if (
    config &&
    userState?.player &&
    Object.keys(userState.player!).length > 0
  ) {
    return <Gameplay />;
  } else {
    return (
      <ConnectController
        imageUrls={imageUrls}
        onStart={onStart}
        onStartGameplay={onStartGameplay}
      />
    );
  }
}
