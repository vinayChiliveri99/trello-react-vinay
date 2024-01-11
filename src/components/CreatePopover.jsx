/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, Container, Popover } from '@mui/material';
import cardsPhoto from '../../assets/cards.png';
import { useNavigate } from 'react-router-dom';
import { addNewBoard } from '../API';

function CreatePopover(props) {
  const navigate = useNavigate();
  const { createPopoverAnchor, handleCreateClose } = props;

  const [boardName, setBoardName] = useState('');

  function handleCreateBoard(e) {
    e.preventDefault();

    if (boardName.length === 0) {
      // console.log('give some value');
      return;
    }
    // resetting the input value to be empty after submit & closing the popover
    setBoardName('');
    handleCreateClose();

    // addNewBoard is in API.js file
    addNewBoard(boardName)
      .then((data) => {
        // redirecting to open the board in a new page
        navigate(`/boards/${data.id}`);
      })
      .catch((error) => {
        console.log('error while creating a new board', error);
      });
  }

  const containerStyle = {
    height: '65vh',
    width: '300px',
    border: 'none',
    display: 'flex',
    flexDirection: 'column',
  };

  const imageStyle = { height: '200px', width: '250px' };

  let isCreatePopoverOpen = Boolean(createPopoverAnchor);
  const createPopoverId = isCreatePopoverOpen
    ? 'create-popover'
    : undefined;

  return (
    <Popover
      id={createPopoverId}
      open={isCreatePopoverOpen}
      anchorEl={createPopoverAnchor}
      onClose={handleCreateClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
    >
      <Container style={containerStyle}>
        <h4 style={{ alignSelf: 'center' }}>Create board</h4>
        <img src={cardsPhoto} style={imageStyle} alt="cards image" />
        <form onSubmit={(e) => handleCreateBoard(e)}>
          <label htmlFor="title" style={{ display: 'block' }}>
            Board title*
          </label>
          <input
            type="text"
            name="boardName"
            autoComplete="off"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            style={{ width: '250px', margin: '10px 0 0 0' }}
          />
          <p>👋 Board title is required</p>
          <Button
            type="submit"
            variant="contained"
            style={{ marginLeft: '75px' }}
          >
            Create
          </Button>
        </form>
      </Container>
    </Popover>
  );
}

export default CreatePopover;
