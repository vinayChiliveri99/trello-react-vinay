/* eslint-disable react/prop-types */
import { Button } from '@mui/material';

function AddCheckItem(props) {
  const { handleCancel, setItemValue, handleAddItem } = props;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 0',
      }}
    >
      <input
        style={{ width: '100%', height: '70px' }}
        type="text"
        placeholder="Add an item"
        onChange={(e) => setItemValue(e.target.value)}
      />
      <div style={{ margin: '20px 0' }}>
        <Button
          onClick={handleAddItem}
          variant="contained"
          style={{ margin: '0 10px' }}
        >
          Add
        </Button>
        <Button variant="outlined" onClick={handleCancel}>
          cancel
        </Button>
      </div>
    </div>
  );
}

export default AddCheckItem;
