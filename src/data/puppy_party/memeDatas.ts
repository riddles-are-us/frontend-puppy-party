import { createSlice } from '@reduxjs/toolkit';
import { RootState } from "../../app/store";
import { MemeData } from '../../games/config';

interface MemeDatasState {
    previousMemeDatas: MemeData[];
}

const initialState: MemeDatasState = {
    previousMemeDatas: [],
};

export const memeDatasSlice = createSlice({
    name: 'memeDatas',
    initialState,
    reducers: {
      setPreviousMemeDatas: (state, action) => {
        state.previousMemeDatas = action.payload.previousMemeDatas;
      },
    },
  },
);

export const selectPreviousMemeDatas = (state: RootState) => state.puppyParty.memeDatas.previousMemeDatas;
    
export const { setPreviousMemeDatas } = memeDatasSlice.actions;
export default memeDatasSlice.reducer;