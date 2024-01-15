/* eslint-disable react/prop-types */
import { Alert, Button, CardActionArea } from '@mui/material';
import CheckItems from './CheckItems';
import { useEffect, useReducer, useState } from 'react';
import AddCheckItem from './AddCheckItem';
import {
  addNewCheckItem,
  deleteCheckList,
  getCheckItemsData,
} from '../API';

// Define the actions for the reducer
function reducer(state, action) {
  switch (action.type) {
    case 'SET_ADD_CHECK_ITEM':
      return { ...state, addCheckItem: action.payload };
    case 'SET_ITEM_VALUE':
      return { ...state, itemValue: action.payload };
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}

const CheckList = (props) => {
  const { singleCheckListData, setCheckListData, cardId } = props;
  const [checkItemsList, setCheckItemsList] = useState([]);

  const initialState = {
    addCheckItem: false,
    itemValue: '',
    errorMessage: null,
  };

  // Use the reducer hook
  const [state, dispatch] = useReducer(reducer, initialState);

  // Destructure state
  const { addCheckItem, itemValue, errorMessage } = state;

  // to delete a checklist from a card.

  function handleDeleteCheckList(checkListId, CardId) {
    deleteCheckList(CardId, checkListId)
      .then((data) => setCheckListData(data))
      .catch((err) => {
        console.log('error while deleting the checklist', err);
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: `${err} while deleting the checklist, please try again..`,
        });
      });
  }

  // getting the check items data of a checklist, getCheckItemsData is a get request

  useEffect(() => {
    getCheckItemsData(singleCheckListData.id)
      .then((data) => {
        // console.log('data', data);
        setCheckItemsList(data);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: `${err} while fetching the checkitems data, please try again..`,
        });
      });
  }, [singleCheckListData.id]);

  // the popover, used to enter a checkItem (new task)
  function handleAddCheckItem() {
    // Dispatch action to toggle addCheckItem
    dispatch({ type: 'SET_ADD_CHECK_ITEM', payload: !addCheckItem });
  }

  // cancel button in the popover, where we enter a checkitem (new task)
  function handleCancel() {
    // Dispatch action to set addCheckItem to false
    dispatch({ type: 'SET_ADD_CHECK_ITEM', payload: false });
  }

  // adding check item to the checklist, addNewCheckItem is a post request.
  // Dispatch action to set itemValue

  function handleAddItem() {
    dispatch({ type: 'SET_ITEM_VALUE', payload: '' });

    addNewCheckItem(singleCheckListData.id, itemValue)
      .then((data) => {
        setCheckItemsList([...checkItemsList, data]);
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'SET_ERROR_MESSAGE',
          payload: `${err} while adding the checkItem (task) to the checklist, please try again..`,
        });
      });
  }

  if (errorMessage !== null) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <div
      style={{
        width: '40vw',
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'space-evenly',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '5px',
        }}
      >
        <p style={{ fontWeight: '900', fontSize: '18px' }}>
          {singleCheckListData.name}
        </p>
        <Button
          onClick={() =>
            handleDeleteCheckList(
              singleCheckListData.id,
              singleCheckListData.idCard
            )
          }
        >
          Delete
        </Button>
      </div>

      {checkItemsList.map((ele) => (
        <div key={ele.id}>
          <CheckItems
            id={ele.id}
            chekListId={singleCheckListData.id}
            name={ele.name}
            state={ele.state}
            cardId={cardId}
            setCheckItemsList={setCheckItemsList}
          />
        </div>
      ))}

      <CardActionArea>
        <div
          onClick={handleAddCheckItem}
          style={{
            cursor: 'pointer',
            height: '50px',
            padding: '20px',
            fontSize: '16px',
          }}
        >
          Add an item
        </div>
      </CardActionArea>
      {addCheckItem && (
        <AddCheckItem
          handleCancel={handleCancel}
          setItemValue={(value) =>
            dispatch({ type: 'SET_ITEM_VALUE', payload: value })
          }
          handleAddItem={handleAddItem}
          itemValue={itemValue}
        />
      )}
    </div>
  );
};

export default CheckList;
