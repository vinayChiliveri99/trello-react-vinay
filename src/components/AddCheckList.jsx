/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { useState } from 'react';
import { addNewCheckList } from '../API';

function AddCheckList(props) {
  const { cardId, setCheckListData, setAddNewCheckList } = props;
  const [checklistName, setChecklistName] = useState('Checklist');

  function closeNewCheckList() {
    setAddNewCheckList(false);
  }

  function handleAddNewCheckList(checklistName, cardId) {
    // creating a new checklist to the card

    addNewCheckList(checklistName, cardId)
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
        border: '1px solid black',
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
        <Button
          onClick={() => handleAddNewCheckList(checklistName, cardId)}
          variant="contained"
        >
          Add
        </Button>
      </div>
    </div>
  );
}

export default AddCheckList;
