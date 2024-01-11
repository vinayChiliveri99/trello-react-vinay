/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import CheckItems from './CheckItems';
import { useEffect, useState } from 'react';
import AddCheckItem from './AddCheckItem';

function CheckList(props) {
  const { singleCheckListData, setCheckListData, cardId } = props;

  const [checkItemsList, setCheckItemsList] = useState([]);
  const [addCheckItem, setAddCheckItem] = useState(false);
  let [itemValue, setItemValue] = useState('');

  //   console.log('checkitemslist', checkItemsList);

  const ApiKey = '8595f1e78e95986a8b549202c4381a5f';
  const ApiToken =
    'ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889';

  function handleDeleteCheckList(checkListId, CardId) {
    fetch(
      `https://api.trello.com/1/cards/${CardId}/checklists/${checkListId}?key=${ApiKey}&token=${ApiToken}`,
      {
        method: 'DELETE',
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('error while deleting checklist');
      })
      .then((data) => setCheckListData(data));
  }

  useEffect(() => {
    fetch(
      `https://api.trello.com/1/checklists/${singleCheckListData.id}/checkItems?key=${ApiKey}&token=${ApiToken}`
    )
      .then((res) => res.json())
      .then((data) => setCheckItemsList(data))
      .catch((err) => console.log(err));
  }, [singleCheckListData.id]);

  function handleAddCheckItem() {
    setAddCheckItem(!addCheckItem);
  }

  function handleCancel() {
    setAddCheckItem(false);
  }

  function handleAddItem() {
    itemValue.length !== 0
      ? fetch(
          `https://api.trello.com/1/checklists/${singleCheckListData.id}/checkItems?name=${itemValue}&key=${ApiKey}&token=${ApiToken}`,
          {
            method: 'POST',
          }
        )
          .then((res) => {
            if (res.ok) return res.json();
            throw new Error('error while adding checkItem');
          })
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
        }}
      >
        <p>{singleCheckListData.name}</p>
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
      <div>Progress bar</div>

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
        />
      )}
    </div>
  );
}

export default CheckList;
