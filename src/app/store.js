import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../app/slices/boardsSlice';
import listReducer from '../app/slices/listsSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    lists: listReducer,
  },
});
