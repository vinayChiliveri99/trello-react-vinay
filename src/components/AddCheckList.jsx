/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { useState } from 'react';

function AddCheckList(props) {
  const { cardId, setCheckListData, setAddNewCheckList } = props;
  const [checklistName, setChecklistName] = useState('Checklist');

  const ApiKey = '8595f1e78e95986a8b549202c4381a5f';
  const ApiToken =
    'ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889';

  function closeNewCheckList() {
    setAddNewCheckList(false);
  }

  function handleAddNewCheckList() {
    fetch(
      `https://api.trello.com/1/cards/${cardId}/checklists?key=${ApiKey}&token=${ApiToken}&name=${checklistName}`,
      { method: 'POST' }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('error while creating new checklist');
      })
      .then((data) =>
        setCheckListData((ChekListData) => [...ChekListData, data])
      )
      .catch((err) => console.log(err));

    setChecklistName('Checklist');
    closeNewCheckList();
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: '100%',
        zIndex: '100',
        height: '250px',
        width: '250px',
        border: '1px solid red',
        padding: '5px',
      }}
    >
      <p style={{ display: 'flex', justifyContent: 'space-around' }}>
        Add checklist <span onClick={closeNewCheckList}>X</span>
      </p>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-evenly',
          marginLeft: '20px',
        }}
      >
        <p>Title</p>
        <input
          type="text"
          style={{ height: '40px', marginBottom: '10px' }}
          value={checklistName}
          onChange={(e) => setChecklistName(e.target.value)}
        />
        <Button onClick={handleAddNewCheckList} variant="contained">
          Add
        </Button>
      </div>
    </div>
  );
}

export default AddCheckList;
