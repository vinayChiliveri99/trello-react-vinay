/* eslint-disable react/prop-types */
import { Alert, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteACheckItem, updateCheckBoxes } from '../API';
import { useState } from 'react';

function CheckItems(props) {
  const { name, id, chekListId, setCheckItemsList, state, cardId } =
    props;

  const [errorMessage, setErrorMessage] = useState(null);

  // deleting a single checkitem from a checklist
  function handleDeleteItem(chekListId, id) {
    // the delete request is being made in API.js file

    deleteACheckItem(chekListId, id)
      .then(() => {
        setCheckItemsList((prevList) =>
          prevList.filter((item) => item.id !== id)
        );
      })
      .catch((error) => {
        console.error('Error deleting check item:', error);
        setErrorMessage(
          `${error} while deleting a checkitem, please try again..`
        );
      });
  }

  // Update the checkbox state

  function handleCheckboxChange(state, cardId, id) {
    const newState = state === 'complete' ? 'incomplete' : 'complete';

    // updatecheckboxes present in API.js file

    updateCheckBoxes(cardId, id, newState)
      .then((updatedItem) => {
        setCheckItemsList((prevList) =>
          prevList.map((item) =>
            item.id === id
              ? { ...item, state: updatedItem.state }
              : item
          )
        );
      })
      .catch((error) => {
        console.error('Error updating checkitem state:', error);
        setErrorMessage(
          `${error} while updating the checkitem state, please try again..`
        );
      });
  }

  if (errorMessage !== null) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <div
      key={id}
      style={{ display: 'flex', justifyContent: 'space-between' }}
    >
      <div>
        <Checkbox
          checked={state === 'complete'}
          onChange={() => handleCheckboxChange(state, cardId, id)}
        ></Checkbox>
        <p
          style={{
            display: 'inline-block',
            textDecoration:
              state === 'complete' ? 'line-through' : 'none',
          }}
        >
          {name}
        </p>
      </div>
      <DeleteIcon
        onClick={() => handleDeleteItem(chekListId, id)}
        style={{ cursor: 'pointer' }}
      ></DeleteIcon>
    </div>
  );
}

export default CheckItems;
