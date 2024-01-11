/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import {
  CssBaseline,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import ArchivePopOver from './ArchivePopOver';
import AllCards from './AllCards';
import AddCard from './AddCard';
import { fetchCardsList } from '../API';

function BoardList(props) {
  const { ele, handleArchive } = props;
  const [anchorEl, setAnchorEl] = useState(null);
  const [indCardsList, setIndCardsList] = useState([]);

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
          setIndCardsList(data);
        })
        .catch((error) => {
          console.log('error while setting cards data', error);
        });
    };

    fetchData();
  }, [ele.id]);

  const listStyle = {
    width: '250px',
    maxHeight: '500px',
    backgroundColor: 'white',
    borderRadius: '10px',
  };

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
        <AllCards
          indCardsList={indCardsList}
          setIndCardsList={setIndCardsList}
          listName={ele.name}
        />
        <AddCard
          listId={ele.id}
          indCardsList={indCardsList}
          setIndCardsList={setIndCardsList}
        />
      </List>
    </>
  );
}

export default BoardList;
