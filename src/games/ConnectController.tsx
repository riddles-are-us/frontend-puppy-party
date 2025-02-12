import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  selectConnectState,
  selectNullableUserState,
  setConnectState,
} from "../data/state";
import { AccountSlice, ConnectState } from "zkwasm-minirollup-browser";
import "./style.scss";
import { CREATE_PLAYER } from "./api";
import {
  getConfig,
  queryInitialState,
  queryState,
  sendTransaction,
} from "zkwasm-minirollup-browser/src/connect";
import { createCommand } from "zkwasm-minirollup-rpc";

interface Props {
  LoadingComponent: React.ComponentType<{ message: string; progress: number }>;
  WelcomeComponent: React.ComponentType<{ onStartGame: () => void }>;
  onStart: () => Promise<void>;
  onStartGameplay: () => void;
}

export function ConnectController({
  LoadingComponent,
  WelcomeComponent,
  onStart,
  onStartGameplay,
}: Props) {
  const dispatch = useAppDispatch();
  const [progress, setProgress] = useState(0);
  const l1account = useAppSelector(AccountSlice.selectL1Account);
  const l2account = useAppSelector(AccountSlice.selectL2Account);
  const connectState = useAppSelector(selectConnectState);

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

  useEffect(() => {
    dispatch(AccountSlice.loginL1AccountAsync());
  }, []);

  useEffect(() => {
    if (connectState == ConnectState.Init) {
      dispatch(setConnectState(ConnectState.OnStart));
    }
  }, [l1account]);

  useEffect(() => {
    if (l2account) {
      dispatch(queryState(l2account!.getPrivateKey()));
      onStartGameplay();
    }
  }, [l2account]);

  useEffect(() => {
    if (connectState == ConnectState.OnStart) {
      onStart().then(() => {
        dispatch(setConnectState(ConnectState.Preloading));
      });
    } else if (connectState == ConnectState.Preloading) {
      loadImages().then(() => {
        dispatch(getConfig());
      });
    } else if (connectState == ConnectState.InstallPlayer) {
      const command = createCommand(0n, CREATE_PLAYER, []);
      dispatch(
        sendTransaction({
          cmd: command,
          prikey: l2account!.getPrivateKey(),
        })
      );
    }
  }, [connectState]);

  const onStartGame = () => {
    dispatch(AccountSlice.loginL2AccountAsync(l1account!.address));
  };

  if (connectState == ConnectState.Init) {
    return <LoadingComponent message={"Initialising"} progress={0} />;
  } else if (connectState == ConnectState.OnStart) {
    return <LoadingComponent message={"Starting"} progress={0} />;
  } else if (connectState == ConnectState.Preloading) {
    return (
      <LoadingComponent message={"Preloading Textures"} progress={progress} />
    );
  } else if (connectState == ConnectState.Idle) {
    return <WelcomeComponent onStartGame={onStartGame} />;
  } else if (connectState == ConnectState.QueryConfig) {
    return <LoadingComponent message={"Querying Config"} progress={0} />;
  } else if (connectState == ConnectState.QueryState) {
    return <LoadingComponent message={"Querying State"} progress={0} />;
  } else if (connectState == ConnectState.ConnectionError) {
    return <LoadingComponent message={"Error"} progress={0} />;
  } else {
    return <LoadingComponent message={"Loading"} progress={0} />;
  }
}
