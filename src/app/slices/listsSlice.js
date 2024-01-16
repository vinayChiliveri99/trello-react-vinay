// listsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const listsSlice = createSlice({
  name: 'lists',
  initialState: [],
  reducers: {
    setListInBoard: (state, action) => {
      return action.payload;
    },
    addListToBoard: (state, action) => {
      return [...state, action.payload];
    },
    archiveListInBoard: (state, action) => {
      return state.filter((ele) => ele.id !== action.payload.id);
    },
  },
});

export const { setListInBoard, addListToBoard, archiveListInBoard } =
  listsSlice.actions;
export default listsSlice.reducer;
