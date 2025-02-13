import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../app/store";
import { emptySeasonData, SeasonData } from '../games/season';
import { getConfig, queryState, sendTransaction } from 'zkwasm-minirollup-browser/src/connect';

interface MemeDatasState {
		previousSeason: SeasonData;
		currentSeason: SeasonData;
}

const initialState: MemeDatasState = {
	previousSeason: emptySeasonData,
	currentSeason: emptySeasonData,
};

export const memeDatasSlice = createSlice({
		name: 'memeDatas',
		initialState,
		reducers: {
			setPreviousSeason: (state, action) => {
				state.previousSeason = action.payload.previousSeason;
			},
			setCurrentSeason: (state, action) => {
				state.currentSeason = action.payload.currentSeason;
			},
		},
		extraReducers: (builder) => {
			builder
			.addCase(getConfig.fulfilled, (state, action) => {
				state.currentSeason.memes.forEach((meme, index) => {
					meme.rank = action.payload[index]?.rank ?? 0 ;
				});
			})
			.addCase(sendTransaction.fulfilled, (state, action) => {
				state.currentSeason.memes.forEach((meme, index) => {
					meme.rank = action.payload[index]?.rank ?? 0 ;
				});
			})
			.addCase(queryState.fulfilled, (state, action) => {
				state.currentSeason.memes.forEach((meme, index) => {
					meme.rank = action.payload[index]?.rank ?? 0 ;
				});
			})
			}
	},
);

export const selectPreviousMemes = (state: RootState) => state.memeDatas.previousSeason.memes;
export const selectCurrentMemes = (state: RootState) => state.memeDatas.currentSeason.memes;
		
export const { setPreviousSeason, setCurrentSeason } = memeDatasSlice.actions;
export default memeDatasSlice.reducer;