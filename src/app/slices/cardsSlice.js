import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: {}, errorMessage: null };

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsInList: (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.id]: action.payload.data,
      };
    },
    addCard: (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.id]: [
          ...state.data[action.payload.id],
          action.payload.data,
        ],
      };
    },
    archiveCardInList: (state, action) => {
      const temp = state.data[action.payload.listId].filter(
        (card) => {
          return card.id !== action.payload.cardId;
        }
      );
      state.data[action.payload.listId] = temp;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export default cardsSlice.reducer;
export const {
  setCardsInList,
  addCard,
  archiveCardInList,
  setErrorMessage,
} = cardsSlice.actions;
