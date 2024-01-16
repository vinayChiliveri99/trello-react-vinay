import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Alert,
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
import ShimmerLoader from './ShimmerLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setError } from '../app/slices/errorSlice';

function BoardDisplay() {
  let { id } = useParams();

  const [listsInBoard, setListsInBoard] = useState([]);
  const [boardDetails, setBoardDetails] = useState({});
  const [isAddingList, setIsAddingList] = useState(false);
  const [loading, setLoading] = useState(true);

  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    function fetchData() {
      // getting the boards in the list.
      getListsInABoard(id)
        .then((listsData) => {
          setListsInBoard(listsData);
          return getBoardDetails(id);
        })
        .then((boardDetailsData) => {
          setBoardDetails(boardDetailsData);
        })
        .catch((error) => {
          console.error('Error while fetching data:', error);
          setError(
            dispatch(
              `${error} while fetching lists in a board, Please try again..`
            )
          );
        })
        .finally(() => {
          setLoading(false);
        });
    }

    fetchData();
  }, [id, dispatch]);

  function handleCreateNewList() {
    setIsAddingList(true);
  }

  function handleCancelAddList() {
    setIsAddingList(false);
  }

  function handleAddListSubmit(listName) {
    createNewList(listName, id)
      .then((data) => setListsInBoard([...listsInBoard, data]))
      .catch((err) => {
        console.log('Error while creating the list', err);
        setError('Error while creating the list');
      });
  }

  function handleArchive(listId) {
    archiveList(listId)
      .then((data) => {
        if (data.id) {
          setListsInBoard(
            listsInBoard.filter((ele) => ele.id !== data.id)
          );
        }
      })
      .catch((error) => {
        console.error('Error while archiving the list', error);
        setError(
          'Error while archiving the list, please try again..'
        );
      });
  }

  if (error !== null) {
    return (
      <Alert variant="filled" severity="error">
        {error}
      </Alert>
    );
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
        {loading ? (
          // <p>Loading...</p>
          <ShimmerLoader
            count={4}
            width={250}
            height={100}
            marginRight="15px"
          />
        ) : (
          <>
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
              <List
                style={{
                  height: '50px',
                  width: '250px',
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  cursor: 'pointer',
                  flexShrink: '0',
                }}
                onClick={handleCreateNewList}
              >
                <ListItem>+ Add another list</ListItem>
              </List>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default BoardDisplay;
