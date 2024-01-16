import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../app/slices/boardsSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
  },
});
