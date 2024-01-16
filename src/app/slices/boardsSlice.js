import { createSlice } from '@reduxjs/toolkit';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: [],
  reducers: {
    setBoards: (state, action) => {
      return action.payload;
    },
    addBoard: (state, action) => {
      state.push(action.payload);
    },
  },
});

export const { setBoards, addBoard } = boardsSlice.actions;
export default boardsSlice.reducer;

/*
 addNewBoard: (state, action) => {
      state.push(action.payload);
    },
 */
