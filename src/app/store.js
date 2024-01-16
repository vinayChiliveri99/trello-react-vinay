import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../app/slices/boardsSlice';
import errorReducer from '../app/slices/errorSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    error: errorReducer,
  },
});
