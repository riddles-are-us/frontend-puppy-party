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
} from "../games/season";

interface MemeDatasState {
  seasonData: SeasonData;
  memeDataMap: { [key: number]: MemeData };
  memeModelMap: { [key: number]: MemeModel };
  currentMemeIds: number[];
}

const initialState: MemeDatasState = {
  seasonData: emptySeasonData,
  memeDataMap: {},
  memeModelMap: {},
  currentMemeIds: Array(12),
};

export const memeDatasSlice = createSlice({
  name: "memeDatas",
  initialState,
  reducers: {
    setSeasonData: (state, action) => {
      state.seasonData = action.payload.seasonData;
      state.memeDataMap = action.payload.seasonData.memes.reduce(
        (
          acc: { [key: number]: MemeData },
          data: MemeData
        ) => {
          acc[data.id] = data;
          return acc;
        },
        {} as { [key: number]: MemeData }
      );
    },
    setMemeModelMap: (state, action) => {
      state.memeModelMap = action.payload.memeModelMap;
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
});

export const selectAllMemes = (state: RootState) =>
  state.memeDatas.seasonData.memes.map((data) => {
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

export const { setSeasonData, setMemeModelMap, fillCurrentMemeIds } =
  memeDatasSlice.actions;
export default memeDatasSlice.reducer;
