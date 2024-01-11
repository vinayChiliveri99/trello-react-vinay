/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

function CheckItems(props) {
  const { name, id, chekListId, setCheckItemsList, state, cardId } =
    props;

  //   console.log('single checklist id', chekListId, id);

  const ApiKey = '8595f1e78e95986a8b549202c4381a5f';
  const ApiToken =
    'ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889';

  function handleDeleteItem(id) {
    console.log('delete clicked', id, chekListId);
    fetch(
      `https://api.trello.com/1/checklists/${chekListId}/checkItems/${id}?key=${ApiKey}&token=${ApiToken}`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('error while deleting a checkitem');
      })
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

  function handleCheckboxChange() {
    const newState = state === 'complete' ? 'incomplete' : 'complete';

    fetch(
      `https://api.trello.com/1/cards/${cardId}/checkItem/${id}?state=${newState}&key=${ApiKey}&token=${ApiToken}`,
      {
        method: 'PUT',
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('error while updating checkitem state');
      })
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
          onChange={handleCheckboxChange}
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
        onClick={() => handleDeleteItem(id)}
        style={{ cursor: 'pointer' }}
      ></DeleteIcon>
    </div>
  );
}

export default CheckItems;
