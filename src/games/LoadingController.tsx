import React, { useEffect, useState } from "react";
import { getMemeList } from "./express";
import { setMemeList } from "../data/ui";
import { GameController } from "../games/controller";
import { useAppDispatch } from "../app/hooks";
import { getConfig } from "zkwasm-minirollup-browser/src/connect";

export function LoadingController() {
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);

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

  return <GameController onStart={onStart} progress={progress} />;
}
