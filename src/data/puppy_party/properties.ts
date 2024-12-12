import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, sendTransaction, queryState } from "../../games/request"
import {scenario} from '../../games/scenario';

export enum UIState{
  Init,
  Preloading,
  QueryConfig,
  WelcomePage,
  QueryState,
  CreatePlayer,
  ConnectionError,
  Idle,  // from this point we have prepared all info for the main game stage
  QueryWithdraw,
  WithdrawPopup,
  QueryDeposit,
  DepositPopup,
  QueryGiftbox,
  GiftboxPopup,
  SponsorPopup,
  ConfirmPopup,
  ErrorPopup,
}

interface PlayerState {
  nonce: number;
  data: {
    balance: number;
    ticket: number;
    lottery_info: number;
    action: bigint;
    last_lottery_timestamp: number;
    last_action_timestamp: number;
    progress: number;
  }
}

export interface MemeListElement {
  rank: number,
}

interface PropertiesState {
  uIState: UIState;
  player: PlayerState;
  lastTxResult: string | number,
  globalTimer: number;
  targetMemeIndex: number;
  memeList: MemeListElement[];
  giftboxShake: boolean;
  progressReset: boolean;
  popupDescription: string;
  showProgressBarGoodJob: boolean;
  showProgressBarNice: boolean;
  lotteryInfoDiff: number;
}

const SWAY = 0n;

const initialState: PropertiesState = {
    uIState: UIState.Init,
    player: {
      nonce: 0,
      data: {
        balance: 0,
        lottery_info: 0,
        ticket: 0,
        action: SWAY,
        last_lottery_timestamp: 0,
        last_action_timestamp: 0,
        progress: 0,
      }
    },
    lastTxResult: "",
    globalTimer: 0,
    targetMemeIndex: 0,
    memeList: [],
    giftboxShake: false,
    progressReset: false,
    popupDescription: "",
    showProgressBarGoodJob: false,
    showProgressBarNice: false,
    lotteryInfoDiff: 0,
  };

export const propertiesSlice = createSlice({
  name: 'properties',
  initialState,
  reducers: {
    setTargetMemeIndex: (state, action) => {
      state.targetMemeIndex = action.payload;
      scenario.setSelectedMeme(state.targetMemeIndex);
    },

    setUIState: (state, action) => {
      state.uIState = action.payload.uIState;
    },
    setLastTxResult: (state, action) => {
      state.lastTxResult = action.payload.lastTxResult;
    },
    setGiftboxShake: (state, action) => {
      state.giftboxShake = action.payload.giftboxShake;
    },
    setProgressReset: (state, action) => {
      state.progressReset = action.payload.progressReset;
    },
    setPopupDescription: (state, action) => {
      state.popupDescription = action.payload.popupDescription;
    },
    setShowProgressBarGoodJob: (state, action) => {
      state.showProgressBarGoodJob = action.payload.showProgressBarGoodJob;
    },
    setShowProgressBarNice: (state, action) => {
      state.showProgressBarNice = action.payload.showProgressBarNice;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConfig.fulfilled, (state, action) => {
        state.uIState = UIState.WelcomePage;
        state.memeList = action.payload;
        console.log("query config fulfilled");
      })
      .addCase(getConfig.rejected, (state, action) => {
        state.uIState = UIState.ConnectionError;
        console.log(`query config rejected: ${action.payload}`);
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        if (state.uIState == UIState.CreatePlayer){
          state.uIState = UIState.QueryState;
        }
        state.memeList = action.payload.memeList;
        state.globalTimer = action.payload.globalTimer;
        state.lotteryInfoDiff = state.player.data.lottery_info == 0 
          ? 0 
          : state.lotteryInfoDiff + (action.payload.player.data.lottery_info - state.player.data.lottery_info);
        state.player = action.payload.player;
        state.lastTxResult = action.payload.globalTimer;
        console.log("send transaction fulfilled. The command processed at:", action.payload);
      })
      .addCase(sendTransaction.rejected, (state, action) => {
        if (state.uIState == UIState.QueryWithdraw){
          state.lastTxResult = action.payload!.message;
        }
        state.uIState = UIState.QueryState;
        console.log(`send transaction rejected: ${action.payload}`);
      })
      .addCase(queryState.fulfilled, (state, action) => {
        if (state.uIState == UIState.QueryState){
          state.uIState = UIState.Idle;
        }

        state.memeList = action.payload.memeList;
        state.globalTimer = action.payload.globalTimer;
        state.lotteryInfoDiff = state.player.data.lottery_info == 0 
          ? 0 
          : state.lotteryInfoDiff + (action.payload.player.data.lottery_info - state.player.data.lottery_info);
        state.player = action.payload.player;
        console.log("state player:", state.player);
        console.log("query state fulfilled");
      })
      .addCase(queryState.rejected, (state, action) => {
        if (state.uIState == UIState.QueryState){
          state.uIState = UIState.CreatePlayer;
        }
        console.log(`query state rejected: ${action.payload}`);
      });
  }
});

export const selectUIState = (state: RootState) => state.puppyParty.properties.uIState;
export const selectGlobalTimer = (state: RootState) => state.puppyParty.properties.globalTimer;
export const selectNonce = (state: RootState) => BigInt(state.puppyParty.properties.player.nonce);
export const selectMemeList = (state: RootState) => state.puppyParty.properties.memeList;
export const selectBalance = (state: RootState) => state.puppyParty.properties.player.data.balance;
export const selectTicket = (state: RootState) => state.puppyParty.properties.player.data.ticket ?? 0;
export const selectLotteryInfoDiff = (state: RootState) => state.puppyParty.properties.lotteryInfoDiff;
export const selectAction = (state: RootState) => state.puppyParty.properties.player.data.action;
export const selectLastLotteryTimestamp = (state: RootState) => state.puppyParty.properties.player.data.last_lottery_timestamp;
export const selectLastActionTimestamp = (state: RootState) => state.puppyParty.properties.player.data.last_action_timestamp;
export const selectProgress = (state: RootState) => state.puppyParty.properties.player.data.progress;
export const selectLastTxResult = (state: RootState) => state.puppyParty.properties.lastTxResult;
export const selectTargetMemeIndex = (state: RootState) => state.puppyParty.properties.targetMemeIndex;
export const selectGiftboxShake = (state: RootState) => state.puppyParty.properties.giftboxShake;
export const selectProgressReset = (state: RootState) => state.puppyParty.properties.progressReset;
export const selectPopupDescription = (state: RootState) => state.puppyParty.properties.popupDescription;
export const selectShowProgressBarGoodJob = (state: RootState) => state.puppyParty.properties.showProgressBarGoodJob;
export const selectShowProgressBarNice = (state: RootState) => state.puppyParty.properties.showProgressBarNice;

export const { setTargetMemeIndex, setUIState, setLastTxResult, setGiftboxShake, setProgressReset, setPopupDescription, setShowProgressBarGoodJob, setShowProgressBarNice } = propertiesSlice.actions;
export default propertiesSlice.reducer;
