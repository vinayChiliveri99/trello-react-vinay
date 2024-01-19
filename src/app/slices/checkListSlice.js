import { createSlice } from '@reduxjs/toolkit';

const checkListSlice = createSlice({
  name: 'checklist',
  initialState: { data: {}, errorMessage: null },
  reducers: {
    setCheckList: (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.id]: action.payload.data,
      };
    },
    addCheckList: (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.id]: [
          ...state.data[action.payload.id],
          action.payload.data,
        ],
      };
    },
    archiveCheckList: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.cardId]: action.payload.data,
        },
      };
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export default checkListSlice.reducer;
export const {
  setCheckList,
  addCheckList,
  archiveCheckList,
  setErrorMessage,
} = checkListSlice.actions;

// created but not used yet.
