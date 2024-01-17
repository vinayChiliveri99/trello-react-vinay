import { configureStore } from '@reduxjs/toolkit';
import boardReducer from '../app/slices/boardsSlice';
import listReducer from '../app/slices/listsSlice';
import cardReducer from '../app/slices/cardsSlice';
import checkListReducer from '../app/slices/checkListSlice';
import checkItemsReducer from './slices/checkItemsSlice';

export const store = configureStore({
  reducer: {
    boards: boardReducer,
    lists: listReducer,
    cards: cardReducer,
    checklist: checkListReducer,
    checkitems: checkItemsReducer,
  },
});
