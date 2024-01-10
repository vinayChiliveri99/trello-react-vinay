/* eslint-disable react/prop-types */
import { useState } from 'react';

function Card(props) {
  const { cardData, handleArchiveCard } = props;
  const [isHovered, setIsHovered] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  function handleCardOptions() {
    setIsOptionsOpen((prev) => !prev);
  }

  return (
    <div
      key={cardData.id}
      style={{
        padding: '10px',
        display: 'flex',
        justifyContent: 'space-between',
        position: 'relative',
        boxShadow: isHovered
          ? '0px 0px 10px 0px rgba(0,0,0,0.5)'
          : 'none',
        transition: 'box-shadow 0.3s',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
        <div
          style={{
            position: 'absolute',
            width: '100px',
            top: '30px',
            right: '50px',
            background: 'white',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.5)',
            zIndex: '1',
          }}
        >
          <span
            style={{ cursor: 'pointer' }}
            onClick={() => handleArchiveCard(cardData.id)}
          >
            Archive
          </span>
        </div>
      )}
    </div>
  );
}

export default Card;
