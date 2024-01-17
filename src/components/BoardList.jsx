/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  Alert,
  CssBaseline,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import ArchivePopOver from './ArchivePopOver';
import AllCards from './AllCards';
import AddCard from './AddCard';
import { fetchCardsList } from '../API';
import { setCardsInList } from '../app/slices/cardsSlice';
import { useDispatch } from 'react-redux';

function BoardList(props) {
  const { ele, handleArchive } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // getting the cards of a list.
  useEffect(() => {
    const fetchData = () => {
      fetchCardsList(ele.id)
        .then((data) => {
          // setIndCardsList(data);
          dispatch(setCardsInList({ id: ele.id, data: data }));
        })
        .catch((error) => {
          console.log('error while setting cards data', error);
          setErrorMessage(
            'Error while getting the cards data of a list'
          );
        });
    };

    fetchData();
  }, [ele.id, dispatch]);

  const listStyle = {
    width: '250px',
    maxHeight: '500px',
    backgroundColor: 'white',
    borderRadius: '10px',
  };

  if (errorMessage !== null) {
    return <Alert severity="error">{errorMessage}</Alert>;
  }

  return (
    <>
      <CssBaseline />
      <List style={listStyle}>
        <ListItem
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            variant="subtitle1"
            style={{
              fontWeight: '600',
            }}
          >
            {ele.name}
          </Typography>

          <ArchivePopOver
            handleArchive={handleArchive}
            listId={ele.id}
            handleClick={handleClick}
            anchorEl={anchorEl}
            handleClose={handleClose}
          />
        </ListItem>
        <AllCards listId={ele.id} listName={ele.name} />
        <AddCard listId={ele.id} />
      </List>
    </>
  );
}

export default BoardList;
