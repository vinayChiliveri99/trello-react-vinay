/* eslint-disable react/prop-types */
import { Button } from '@mui/material';
import { useState } from 'react';

function AddListForm({ onCancel, onListNameSubmit }) {
  const [listName, setListName] = useState('');

  function handleInputChange(e) {
    setListName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onListNameSubmit(listName);
    setListName('');
  }

  return (
    <div
      style={{
        height: '100px',
        width: '250px',
        backgroundColor: 'white',
        borderRadius: '15px',
        padding: '10px',
        flexShrink: '0',
      }}
    >
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={listName}
          onChange={handleInputChange}
          placeholder="Enter list title..."
          required
          style={{ height: '40px', width: '180px' }}
        />

        <Button variant="contained" type="submit">
          Add List
        </Button>
        <button
          type="button"
          onClick={onCancel}
          style={{
            border: 'none',
            backgroundColor: 'inherit',
            cursor: 'pointer',
          }}
        >
          X
        </button>
      </form>
    </div>
  );
}

export default AddListForm;
