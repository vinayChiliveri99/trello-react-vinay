/* eslint-disable react/prop-types */
import {
  CssBaseline,
  List,
  ListItem,
  Typography,
} from '@mui/material';
import ArchivePopOver from './ArchivePopOver';
import { useState } from 'react';
import AllCards from '../AllCards';

function BoardList(props) {
  const { ele, handleArchive } = props;

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // console.log(ele);

  const handleClose = () => {
    setAnchorEl(null);
  };

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
        <AllCards listId={ele.id} />
        <div>+ Add a card</div>
      </List>
    </>
  );
  // return <div style={listStyle}>{ele.name}</div>;
}

export default BoardList;
