import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  AppBar,
  CssBaseline,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import BoardList from './BoardList';
import AddListForm from './AddListForm';
import {
  archiveList,
  createNewList,
  getBoardDetails,
  getListsInABoard,
} from '../API';

function BoardDisplay() {
  // this is the board id
  let { id } = useParams();

  const [listsInBoard, setListsInBoard] = useState([]);
  const [boardDetails, setBoardDetails] = useState({});
  const [isAddingList, setIsAddingList] = useState(false);

  // console.log(listsInBoard);

  useEffect(() => {
    // getting the lists present in a board.

    function fetchListsInBoard() {
      getListsInABoard(id)
        .then((data) => setListsInBoard(data))
        .catch((err) =>
          console.log('Error while fetching lists in a board', err)
        );
    }

    fetchListsInBoard();

    // getting board details

    function fetchBoardDetails() {
      getBoardDetails(id)
        .then((data) => setBoardDetails(data))
        .catch((err) =>
          console.log('error while fetching board details', err)
        );
    }
    fetchBoardDetails();
  }, [id]);

  const newListStyle = {
    height: '50px',
    width: '250px',
    backgroundColor: 'white',
    borderRadius: '15px',
    cursor: 'pointer',
    flexShrink: '0',
  };

  function handleCreateNewList() {
    setIsAddingList(true);
  }

  const handleCancelAddList = () => {
    setIsAddingList(false);
  };

  // to handle the submitted list name
  const handleAddListSubmit = (listName) => {
    // console.log(listName);

    // creating a new list in a board

    createNewList(listName, id)
      .then((data) => setListsInBoard([...listsInBoard, data]))
      .catch((err) =>
        console.log('error while creating the list', err)
      );
  };

  function handleArchive(listId) {
    // console.log(listId);
    archiveList(listId)
      .then((data) => {
        if (data.id) {
          setListsInBoard(
            listsInBoard.filter((ele) => ele.id !== data.id)
          );
        } else {
          throw new Error('Invalid response from Trello API');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <section>
      <CssBaseline />
      <AppBar
        position="relative"
        style={{
          height: '7vh',
          display: 'flex',
          justifyContent: 'center',
          padding: '30px',
        }}
      >
        <Typography variant="h5">{boardDetails.name}</Typography>
      </AppBar>
      <div
        style={{
          display: 'flex',
          width: '100vw',
          height: '83vh',
          overflowX: 'scroll',
          backgroundColor: '#0179BF',
          gap: '15px',
          padding: '20px',
        }}
      >
        {listsInBoard.map((ele) => (
          <div key={ele.id}>
            <BoardList
              ele={ele}
              handleArchive={() => handleArchive(ele.id)}
            />
          </div>
        ))}

        {isAddingList ? (
          <AddListForm
            onCancel={handleCancelAddList}
            onListNameSubmit={handleAddListSubmit}
          />
        ) : (
          <List style={newListStyle} onClick={handleCreateNewList}>
            <ListItem>+ Add another list</ListItem>
          </List>
        )}
      </div>
    </section>
  );
}

export default BoardDisplay;
