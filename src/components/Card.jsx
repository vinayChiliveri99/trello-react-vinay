/* eslint-disable react/prop-types */
import { useState } from 'react';
import CardDetail from './CardDetail';
import { Button } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';

function Card(props) {
  const { cardData, handleArchiveCard, listName } = props;
  const [anchorEl, setAnchorEl] = useState(false);

  const handleClick = (event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  return (
    <div className="card" key={cardData.id} onClick={handleClick}>
      {cardData.name}

      <Button
        onClick={(e) => {
          e.stopPropagation();
          handleArchiveCard(cardData.id);
        }}
      >
        <ArchiveIcon />
      </Button>

      <CardDetail
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        listName={listName}
        cardData={cardData}
      />
    </div>
  );
}

export default Card;
