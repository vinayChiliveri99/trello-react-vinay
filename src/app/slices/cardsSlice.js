import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: {} };

const cardsSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    setCardsInList: (state, action) => {
      //   console.log(action.payload.data);
      state.data = {
        ...state.data,
        [action.payload.id]: action.payload.data,
      };
    },
    addCard: (state, action) => {
      console.log(state.data[action.payload.id]);
      console.log(action.payload.data);
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
  },
});

export default cardsSlice.reducer;
export const { setCardsInList, addCard, archiveCardInList } =
  cardsSlice.actions;
