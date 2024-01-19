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
  createNewList,
  getListsInABoard,
  archiveList,
  getBoardDetails,
} from '../API';
import ShimmerLoader from './ShimmerLoader';

import { useSelector, useDispatch } from 'react-redux';
import {
  setListInBoard,
  addListToBoard,
  archiveListInBoard,
  setErrorMessage,
  setLoading,
} from '../app/slices/listsSlice';

function BoardDisplay() {
  let { id } = useParams();

  const [isAddingList, setIsAddingList] = useState(false);
  const [boardDetails, setBoardDetails] = useState({});

  const listsInBoard = useSelector((state) => state.lists.data);
  const errorMessage = useSelector(
    (state) => state.lists.errorMessage
  );
  const loading = useSelector((state) => state.lists.isLoading);

  const dispatch = useDispatch();

  useEffect(() => {
    function fetchData() {
      // getting the boards in the list.
      getListsInABoard(id)
        .then((listsData) => {
          dispatch(setListInBoard({ data: listsData }));
          return getBoardDetails(id);
        })
        .then((boardDetailsData) => {
          setBoardDetails(boardDetailsData);
        })
        .catch((error) => {
          console.error('Error while fetching data:', error);
          dispatch(
            setErrorMessage(
              `${error} while fetching lists in a board, Please try again..`
            )
          );
        })
        .finally(() => {
          dispatch(setLoading(false));
        });
    }

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCreateNewList() {
    setIsAddingList(true);
  }

  function handleCancelAddList() {
    setIsAddingList(false);
  }

  function handleAddListSubmit(listName) {
    createNewList(listName, id)
      .then((data) => dispatch(addListToBoard(data)))
      .catch((err) => {
        console.log('Error while creating the list', err);
        dispatch(setErrorMessage(`${err} while creating the list`));
      });
  }

  function handleArchive(listId) {
    archiveList(listId)
      // eslint-disable-next-line no-unused-vars
      .then((data) => {
        dispatch(archiveListInBoard({ id: listId }));
      })
      .catch((error) => {
        console.error('Error while archiving the list', error);
        dispatch(
          setErrorMessage(
            `${error} while archiving the list, please try again..`
          )
        );
      });
  }

  if (errorMessage) {
    return (
      <Alert variant="filled" severity="error">
        {errorMessage}
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
        <Typography variant="h5">
          {boardDetails && boardDetails.name}
        </Typography>
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
            {listsInBoard &&
              listsInBoard.map((ele) => (
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
