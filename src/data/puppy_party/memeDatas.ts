import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { emptySeasonData, SeasonData } from '../../games/season';
import { getConfig, queryState, sendTransaction } from '../../games/request';

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
          meme.rank = action.payload.memeRanks[index].rank
        });
      })
      .addCase(sendTransaction.fulfilled, (state, action) => {
        state.currentSeason.memes.forEach((meme, index) => {
          meme.rank = action.payload.memeRanks[index].rank
        });
      })
      .addCase(queryState.fulfilled, (state, action) => {
        state.currentSeason.memes.forEach((meme, index) => {
          meme.rank = action.payload.memeRanks[index].rank
        });
      })
      }
  },
);

export const selectPreviousMemes = (state: RootState) => state.puppyParty.memeDatas.previousSeason.memes;
export const selectCurrentMemes = (state: RootState) => state.puppyParty.memeDatas.currentSeason.memes;
    
export const { setPreviousSeason, setCurrentSeason } = memeDatasSlice.actions;
export default memeDatasSlice.reducer;