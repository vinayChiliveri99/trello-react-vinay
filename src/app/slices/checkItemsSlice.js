import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: {},
  completedItems: {},
};

const checkitemsSlice = createSlice({
  name: 'checkitems',
  initialState,
  reducers: {
    setCheckItems: (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.id]: action.payload.data,
      };
      state.completedItems = {
        ...state.completedItems,
        [action.payload.id]: action.payload.data.map(),
      };
    },
    addCheckitem: (state, action) => {
      state.data = {
        ...state.data,
        [action.payload.id]: [
          ...state.data[action.payload.id],
          action.payload.data,
        ],
      };
    },
    deleteCheckItem: (state, action) => {
      const temp = state.data[action.payload.checkListId].filter(
        (checkitem) => {
          return checkitem.id !== action.payload.checkItemId;
        }
      );
      state.data[action.payload.checkListId] = temp;
    },
    updateCheckItem: (state, action) => {
      const temp = state.data[action.payload.checkListId].map(
        (checkitem) => {
          if (checkitem.id === action.payload.checkItemId) {
            if (checkitem.state === 'complete') {
              return { ...checkitem, state: 'incomplete' };
            } else {
              return { ...checkitem, state: 'complete' };
            }
          } else {
            return checkitem;
          }
        }
      );

      state.data[action.payload.checkListId] = temp;
    },
  },
});

export const {
  addCheckitem,
  deleteCheckItem,
  setCheckItems,
  updateCheckItem,
} = checkitemsSlice.actions;
export default checkitemsSlice.reducer;

// created but not used..
