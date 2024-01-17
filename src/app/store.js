import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../app/slices/boardsSlice';
import listReducer from '../app/slices/listsSlice';
import cardReducer from '../app/slices/cardsSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    lists: listReducer,
    cards: cardReducer,
  },
});
