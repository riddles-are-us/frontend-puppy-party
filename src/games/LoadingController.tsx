import React, { useEffect, useState } from "react";
import { getMemeList } from "./express";
import { setMemeList } from "../data/ui";
import { ConnectController } from "./ConnectController";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { selectNullableConfig, selectNullableUserState } from "../data/state";
import Gameplay from "./components/Gameplay";
import LoadingPage from "./components/LoadingPage";
import LandingPage from "./components/LandingPage";
import { scenario } from "./scenario";
import { selectL2Account } from "zkwasm-minirollup-browser/src/reduxstate";

export function LoadingController() {
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);
  const userState = useAppSelector(selectNullableUserState);
  const config = useAppSelector(selectNullableConfig);
  const l2account = useAppSelector(selectL2Account);

  async function preloadImages(imageUrls: string[]): Promise<void> {
    let loadedCount = 0;
    const loadImage = (url: string) => {
      return new Promise<void>((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
          loadedCount++;
          setProgress(Math.ceil((loadedCount / imageUrls.length) * 8000) / 100);
          resolve();
        };
        img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
      });
    };

    const promises = imageUrls.map((url) => loadImage(url));
    await Promise.all(promises);
  }

  const loadImages = async () => {
    try {
      const requireContext = require.context(
        "./images",
        true,
        /\.(png|jpg|jpeg|gif)$/
      );
      const imageUrls = requireContext.keys().map(requireContext) as string[];
      await preloadImages(imageUrls);
      console.log("All images loaded");
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  const onStart = async () => {
    const res = await getMemeList();
    dispatch(setMemeList({ memeList: res.data }));
    await loadImages();
  };

  useEffect(() => {
    if (l2account) {
      scenario.status = "play";
    }
  }, [l2account]);

  if (config && userState?.player && Object.keys(userState.player).length > 0) {
    return <Gameplay />;
  } else {
    return (
      <ConnectController
        LoadingComponent={LoadingPage}
        WelcomeComponent={LandingPage}
        onStart={onStart}
        progress={progress}
      />
    );
  }
}
