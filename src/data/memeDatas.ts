import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import {
  emptySeasonData,
  emptyMemeData,
  MemeData,
  MemeModel,
  SeasonData,
  emptyMemeModel,
  MemeProp,
  StakeInfo,
} from "../games/season";

import {
    queryStake
} from "../games/api";


interface MemeDatasState {
  seasonData: SeasonData;
  memeDataMap: { [key: number]: MemeData };
  memeModelMap: { [key: number]: MemeModel };
  memeStakeMap: { [key: number]: number };
  currentMemeIds: number[];
}

const initialState: MemeDatasState = {
  seasonData: emptySeasonData,
  memeDataMap: {},
  memeModelMap: {},
  memeStakeMap: {},
  currentMemeIds: Array(12).fill(0),
};

export const memeDatasSlice = createSlice({
  name: "memeDatas",
  initialState,
  reducers: {
    setSeasonData: (state, action) => {
      state.seasonData = action.payload.seasonData;
      state.memeDataMap = action.payload.seasonData.memes.reduce(
        (acc: { [key: number]: MemeData }, data: MemeData) => {
          acc[data.id] = data;
          return acc;
        },
        {} as { [key: number]: MemeData }
      );
    },
    setMemeModelMap: (state, action) => {
      state.memeModelMap = action.payload.memeModelMap;
    },
    addCurrentMemeId: (state, action) => {
      const currentNotEmptyMemeIds = state.currentMemeIds
        .filter((id) => id !== 0)
        .concat(action.payload.memeId)
        .slice(0, 12);
      state.currentMemeIds = currentNotEmptyMemeIds.concat(
        Array(12 - currentNotEmptyMemeIds.length).fill(0)
      );
    },
    removeCurrentMemeId: (state, action) => {
      const currentNotEmptyMemeIds = state.currentMemeIds
        .filter((id) => id !== 0 && id !== action.payload.memeId)
        .slice(0, 12);
      state.currentMemeIds = currentNotEmptyMemeIds.concat(
        Array(12 - currentNotEmptyMemeIds.length).fill(0)
      );
    },
    fillCurrentMemeIds: (state, action) => {
      const availableMemeIds = state.seasonData.memes
        .filter((memeData) => !state.currentMemeIds.includes(memeData.id))
        .map((memeData) => memeData.id);
      availableMemeIds.sort(() => Math.random() - 0.5);
      const currentNotEmptyMemeIds = state.currentMemeIds.filter(
        (id) => id !== 0
      );
      state.currentMemeIds = currentNotEmptyMemeIds.concat(
        availableMemeIds.slice(0, 12 - currentNotEmptyMemeIds.length)
      );
    },
  },
  extraReducers: (builder) => {
      builder
      /*
      .addCase(queryStake.pending, (state, action) => {
      })
      */
      .addCase(queryStake.fulfilled, (state, action) => {
          for (const r of action.payload) {
              state.memeStakeMap[Number(r.object_index)] = r.data[0];
          }
      })
      /*
      .addCase(queryStake.rejected, (state, action) => {
          state.lastError = {
              errorInfo: `query config rejected: ${action.payload}`,
              payload: action.payload,
          }
      })
      */

  }

});

export const selectAllMemes = (state: RootState) =>
  state.memeDatas.seasonData.memes.filter((data) => state.memeDatas.currentMemeIds.includes(data.id))
  .concat(state.memeDatas.seasonData.memes.filter((data) => !state.memeDatas.currentMemeIds.includes(data.id)))
  .map((data) => {
    return {
      data: data,
      model: state.memeDatas.memeModelMap
        ? state.memeDatas.memeModelMap[data.id] ?? emptyMemeModel
        : emptyMemeModel,
    } as MemeProp;
  });
export const selectCurrentMemes = (state: RootState) =>
  state.memeDatas.currentMemeIds.map((id) => {
    return {
      data: state.memeDatas.memeDataMap[id] ?? emptyMemeData,
      model: state.memeDatas.memeModelMap[id] ?? emptyMemeModel,
    } as MemeProp;
  });

export const { setSeasonData, setMemeModelMap, addCurrentMemeId, removeCurrentMemeId, fillCurrentMemeIds } =
  memeDatasSlice.actions;
export default memeDatasSlice.reducer;
