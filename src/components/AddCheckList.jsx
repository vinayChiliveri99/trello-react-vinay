/* eslint-disable react/prop-types */
import { Alert, AlertTitle, Button } from '@mui/material';
import { useReducer } from 'react';
import { addNewCheckList } from '../API';

// Reducer function
const addCheckListReducer = (state, action) => {
  switch (action.type) {
    case 'set_checklist_name':
      return { ...state, checklistName: action.payload };
    case 'set_error_message':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

function AddCheckList(props) {
  const { cardId, setCheckListData, setAddNewCheckList } = props;

  const initialState = {
    checklistName: 'Checklist',
    errorMessage: null,
  };

  const [state, dispatch] = useReducer(
    addCheckListReducer,
    initialState
  );
  const { checklistName, errorMessage } = state;

  function closeNewCheckList() {
    setAddNewCheckList(false);
  }

  function handleAddNewCheckList() {
    // creating a new checklist for the card

    addNewCheckList(checklistName, cardId)
      .then((data) =>
        setCheckListData((checkListData) => [...checkListData, data])
      )
      .catch((err) => {
        console.log(
          'error while creating/adding a new checklist',
          err
        );
        dispatch({
          type: 'set_error_message',
          payload:
            'Failed to add a new checklist, Please try again..',
        });
      });

    dispatch({ type: 'set_checklist_name', payload: 'Checklist' });
    closeNewCheckList();
  }

  if (errorMessage !== null) {
    return (
      <Alert severity="error" variant="filled">
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>
    );
  }

  const addStyles = {
    position: 'absolute',
    top: '100%',
    zIndex: '100',
    height: '250px',
    width: '250px',
    border: '1px solid black',
    padding: '5px',
  };

  const titleStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
    marginLeft: '20px',
  };

  return (
    <div style={addStyles}>
      <p style={{ display: 'flex', justifyContent: 'space-around' }}>
        Add checklist <span onClick={closeNewCheckList}>X</span>
      </p>
      <div style={titleStyles}>
        <p>Title</p>
        <input
          type="text"
          style={{ height: '40px', marginBottom: '10px' }}
          value={checklistName}
          autoFocus
          onChange={(e) =>
            dispatch({
              type: 'set_checklist_name',
              payload: e.target.value,
            })
          }
        />
        <Button onClick={handleAddNewCheckList} variant="contained">
          Add
        </Button>
      </div>
    </div>
  );
}

export default AddCheckList;
