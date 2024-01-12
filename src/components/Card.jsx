/* eslint-disable react/prop-types */
import { useState } from 'react';
import CardDetail from './CardDetail';

function Card(props) {
  const { cardData, handleArchiveCard, listName } = props;
  const [anchorEl, setAnchorEl] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  function handleCardOptions() {
    setIsOptionsOpen((prev) => !prev);
  }

  const handleClick = (event) => {
    setAnchorEl((prev) => (prev ? null : event.currentTarget));
  };

  const handleClose = () => {
    setAnchorEl(false);
  };

  const cardStyle = {
    padding: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
    boxShadow: isHovered
      ? '0px 0px 10px 0px rgba(0,0,0,0.5)'
      : 'none',
    transition: 'box-shadow',
    border: isHovered ? '1px solid blue' : '',
    borderRadius: isHovered ? '5px' : '',
  };

  const optionsStyle = {
    position: 'absolute',
    width: '100px',
    top: '30px',
    right: '50px',
    background: 'white',
    boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
    zIndex: '1',
  };

  return (
    <div
      key={cardData.id}
      style={cardStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {cardData.name}
      {isHovered && (
        <span
          style={{
            cursor: 'pointer',
          }}
          onClick={handleCardOptions}
        >
          ✎
        </span>
      )}

      {isOptionsOpen && (
        <div style={optionsStyle}>
          <span
            style={{
              cursor: 'pointer',
            }}
            onClick={() => handleArchiveCard(cardData.id)}
          >
            Archive
          </span>
        </div>
      )}

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
