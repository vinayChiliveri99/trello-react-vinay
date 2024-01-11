/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import CheckItems from './CheckItems';
import { useEffect, useState } from 'react';
import AddCheckItem from './AddCheckItem';
import {
  addNewCheckItem,
  deleteCheckList,
  getCheckItemsData,
} from '../API';

function CheckList(props) {
  const { singleCheckListData, setCheckListData, cardId } = props;

  const [checkItemsList, setCheckItemsList] = useState([]);
  const [addCheckItem, setAddCheckItem] = useState(false);
  const [itemValue, setItemValue] = useState('');

  // to delete a checklist from a card.

  function handleDeleteCheckList(checkListId, CardId) {
    deleteCheckList(CardId, checkListId)
      .then((data) => setCheckListData(data))
      .catch((err) =>
        console.log('error while deleting the checklist', err)
      );
  }

  // getting the check items data of a checklist, getCheckItemsData is a get request

  useEffect(() => {
    getCheckItemsData(singleCheckListData.id)
      .then((data) => {
        // console.log('data', data);
        setCheckItemsList(data);
      })
      .catch((err) => console.log(err));
  }, [singleCheckListData.id]);

  // the popover, used to enter a checkItem (new task)

  function handleAddCheckItem() {
    setAddCheckItem(!addCheckItem);
  }

  // cancel button in the popover, where we enter a checkitem (new task)
  function handleCancel() {
    setAddCheckItem(false);
  }

  // adding check item to the checklist, addNewCheckItem is a post request.

  function handleAddItem() {
    // checking if the task is empty, if so it wont add it to the checklist.
    // need to add an error state here.

    itemValue.length !== 0
      ? addNewCheckItem(singleCheckListData.id, itemValue)
          .then((data) => {
            setCheckItemsList([...checkItemsList, data]);
            setItemValue('');
          })
          .catch((err) => console.log(err))
      : console.log('input cannot be empty');
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

      {/* <div>
        <span>
          <LinearProgress variant="determinate" value={progress} />
        </span>
      </div> */}

      {/* <div>Progress bar</div> */}

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

      <div onClick={handleAddCheckItem} style={{ cursor: 'pointer' }}>
        Add an item
      </div>
      {addCheckItem && (
        <AddCheckItem
          handleCancel={handleCancel}
          setItemValue={setItemValue}
          handleAddItem={handleAddItem}
          itemValue={itemValue}
        />
      )}
    </div>
  );
}

export default CheckList;
