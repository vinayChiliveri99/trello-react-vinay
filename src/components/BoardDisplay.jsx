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

function BoardDisplay() {
  // this is the board id
  let { id } = useParams();
  const ApiKey = `8595f1e78e95986a8b549202c4381a5f`;
  const ApiToken = `ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889`;

  const [listsInBoard, setListsInBoard] = useState([]);
  const [boardDetails, setBoardDetails] = useState({});
  const [isAddingList, setIsAddingList] = useState(false);

  // console.log(listsInBoard);

  useEffect(() => {
    function fetchListsInBoard() {
      fetch(
        `https://api.trello.com/1/boards/${id}/lists?key=${ApiKey}&token=${ApiToken}`
      )
        .then((res) => res.json())
        .then((data) => setListsInBoard(data))
        .catch((err) =>
          console.log('Error while fetching lists in a board', err)
        );
    }

    fetchListsInBoard();

    function fetchBoardDetails() {
      fetch(
        `https://api.trello.com/1/boards/${id}?key=${ApiKey}&token=${ApiToken}`
      )
        .then((res) => res.json())
        .then((data) => setBoardDetails(data))
        .catch((err) =>
          console.log('error while fetching board details', err)
        );
    }
    fetchBoardDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const newListStyle = {
    height: '50px',
    width: '250px',
    backgroundColor: 'white',
    borderRadius: '15px',
    cursor: 'pointer',
  };

  function handleCreateNewList() {
    setIsAddingList(true);
  }

  const handleCancelAddList = () => {
    setIsAddingList(false);
  };

  // to handle the submitted list name
  const handleAddListSubmit = (listName) => {
    console.log(listName);
    fetch(
      `https://api.trello.com/1/lists?name=${listName}&idBoard=${id}&key=${ApiKey}&token=${ApiToken}`,
      {
        method: 'POST',
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to create list');
      })
      .then((data) => setListsInBoard([...listsInBoard, data]));

    // setIsAddingList(false);
  };

  function handleArchive(listId) {
    // console.log(listId);
    fetch(
      `https://api.trello.com/1/lists/${listId}/closed?key=${ApiKey}&token=${ApiToken}&value=true`,
      { method: 'PUT' }
    )
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('Failed to archive list');
      })
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
