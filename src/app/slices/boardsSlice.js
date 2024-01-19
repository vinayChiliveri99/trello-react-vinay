import { createSlice } from '@reduxjs/toolkit';

const boardsSlice = createSlice({
  name: 'boards',
  initialState: { data: [], errorMessage: null, isLoading: true },
  reducers: {
    setBoards: (state, action) => {
      return action.payload;
    },
    addBoard: (state, action) => {
      state.data.push(action.payload);
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setBoards, addBoard, setErrorMessage, setLoading } =
  boardsSlice.actions;
export default boardsSlice.reducer;

/*
 addNewBoard: (state, action) => {
      state.push(action.payload);
    },
 */
