import { createSlice } from '@reduxjs/toolkit';

const listsSlice = createSlice({
  name: 'lists',
  initialState: { data: [], errorMessage: null, isLoading: true },
  reducers: {
    setListInBoard: (state, action) => {
      return action.payload;
    },
    addListToBoard: (state, action) => {
      return { ...state, data: [...state.data, action.payload] };
    },
    archiveListInBoard: (state, action) => {
      return {
        ...state,
        data: state.data.filter(
          (ele) => ele.id !== action.payload.id
        ),
      };
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setListInBoard,
  addListToBoard,
  archiveListInBoard,
  setErrorMessage,
  setLoading,
} = listsSlice.actions;
export default listsSlice.reducer;
