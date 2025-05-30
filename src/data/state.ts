import { createStateSlice, PropertiesState, ConnectState } from "zkwasm-minirollup-browser";
import {RootState} from '../app/store';

interface PlayerInfo {
  nonce: number;
  data: {
    balance: number;
    ticket: number;
    lottery_info: number;
    action: bigint;
    last_lottery_timestamp: number;
    last_action_timestamp: number;
    progress: number;
    stack: number[];
  }
}

export interface MemeListElement {
  rank: number,
}

interface GlobalState {
  meme_list: MemeListElement[],
  counter: number,
}

const initialState: PropertiesState<PlayerInfo, GlobalState, any> = {
		connectState: ConnectState.Init,
		isConnected: false,
		userState: null,
		lastError: null,
		config: null,
};


export const propertiesSlice = createStateSlice(initialState);

export const selectConnectState = (state: RootState) => state.state.connectState;
export const selectNullableUserState = (state: RootState) => state.state.userState;
export const selectUserState = (state: RootState) => state.state.userState!;
export const selectLastError = (state: RootState) => state.state.lastError;
export const selectNullableConfig = (state: RootState) => state.state.config;
export const selectConfig = (state: RootState) => state.state.config!;

export const { setConnectState } = propertiesSlice.actions;
export default propertiesSlice.reducer;
