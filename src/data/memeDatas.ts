import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { emptySeasonData, SeasonData } from "../games/season";
import {
	getConfig,
	queryState,
	sendTransaction,
} from "zkwasm-minirollup-browser/src/connect";

interface MemeDatasState {
	previousSeason: SeasonData;
	currentSeason: SeasonData;
}

const initialState: MemeDatasState = {
	previousSeason: emptySeasonData,
	currentSeason: emptySeasonData,
};

export const memeDatasSlice = createSlice({
	name: "memeDatas",
	initialState,
	reducers: {
		setPreviousSeason: (state, action) => {
			state.previousSeason = action.payload.previousSeason;
		},
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

export const selectPreviousMemes = (state: RootState) =>
	state.memeDatas.previousSeason.memes;
export const selectCurrentMemes = (state: RootState) =>
	state.memeDatas.currentSeason.memes;

export const { setPreviousSeason, setCurrentSeason, updateCurrentMemes } = memeDatasSlice.actions;
export default memeDatasSlice.reducer;
