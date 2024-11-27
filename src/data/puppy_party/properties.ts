import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { getConfig, sendTransaction, queryState, SERVER_TICK_TO_SECOND } from "../../games/request"
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
}

interface PlayerState {
  nonce: number;
  data: {
    balance: number;
    ticket: number;
    action: bigint;
    last_lottery_timestamp: number;
    last_action_timestamp: number;
    progress: number;
  }
}

interface MemeListElement {
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
}

const SWAY = 0n;

const initialState: PropertiesState = {
    uIState: UIState.Init,
    player: {
      nonce: 0,
      data: {
        balance: 0,
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
export const selectGlobalTimer = (state: RootState) => state.puppyParty.properties.globalTimer * SERVER_TICK_TO_SECOND;
export const selectNonce = (state: RootState) => BigInt(state.puppyParty.properties.player.nonce);
export const selectMemeList = (state: RootState) => state.puppyParty.properties.memeList;
export const selectBalance = (state: RootState) => state.puppyParty.properties.player.data.balance;
export const selectTicket = (state: RootState) => state.puppyParty.properties.player.data.ticket ?? 0;
export const selectAction = (state: RootState) => state.puppyParty.properties.player.data.action;
export const selectLastLotteryTimestamp = (state: RootState) => state.puppyParty.properties.player.data.last_lottery_timestamp * SERVER_TICK_TO_SECOND;
export const selectLastActionTimestamp = (state: RootState) => state.puppyParty.properties.player.data.last_action_timestamp * SERVER_TICK_TO_SECOND;
export const selectProgress = (state: RootState) => state.puppyParty.properties.player.data.progress;
export const selectLastTxResult = (state: RootState) => state.puppyParty.properties.lastTxResult;
export const selectTargetMemeIndex = (state: RootState) => state.puppyParty.properties.targetMemeIndex;
export const selectGiftboxShake = (state: RootState) => state.puppyParty.properties.giftboxShake;
export const { setTargetMemeIndex, setUIState, setLastTxResult, setGiftboxShake } = propertiesSlice.actions;
export default propertiesSlice.reducer;
