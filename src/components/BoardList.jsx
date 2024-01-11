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

  useEffect(() => {
    const ApiKey = `8595f1e78e95986a8b549202c4381a5f`;
    const ApiToken = `ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889`;

    fetch(
      `https://api.trello.com/1/lists/${ele.id}/cards?key=${ApiKey}&token=${ApiToken}`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(`HTTP error! Status: ${response.status}`);
      })
      .then((data) => {
        setIndCardsList(data);
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });
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
