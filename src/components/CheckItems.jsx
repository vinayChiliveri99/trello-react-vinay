/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteACheckItem, updateCheckBoxes } from '../API';

function CheckItems(props) {
  const { name, id, chekListId, setCheckItemsList, state, cardId } =
    props;

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
      });
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
