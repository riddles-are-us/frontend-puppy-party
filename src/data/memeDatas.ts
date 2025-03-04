import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { emptySeasonData, SeasonData } from "../games/season";
import {
	getConfig,
	queryState,
	sendTransaction,
} from "zkwasm-minirollup-browser/src/connect";

interface MemeDatasState {
	currentSeason: SeasonData;
}

const initialState: MemeDatasState = {
	currentSeason: emptySeasonData,
};

export const memeDatasSlice = createSlice({
	name: "memeDatas",
	initialState,
	reducers: {
		setCurrentSeason: (state, action) => {
			state.currentSeason = action.payload.currentSeason;
		},
		updateCurrentMemes: (state, action) => {
			state.currentSeason.memes.forEach(
				(meme) => (meme.rank = action.payload.memeMap[meme.id] ?? meme.rank)
			);
		}
	},
});

export const selectCurrentMemes = (state: RootState) =>
	state.memeDatas.currentSeason.memes;

export const { setCurrentSeason, updateCurrentMemes } = memeDatasSlice.actions;
export default memeDatasSlice.reducer;
