/* eslint-disable react/prop-types */
import { useState } from 'react';
import CardInput from './CardInput';

function AddCard(props) {
  const { listId, setIndCardsList, indCardsList } = props;
  const [isCardOpen, setIsCardOpen] = useState(false);

  function handleAddCardClick() {
    setIsCardOpen(true);
  }

  function handleCloseCard() {
    setIsCardOpen(false);
  }

  return (
    <div>
      <div
        onClick={handleAddCardClick}
        style={{ cursor: 'pointer', padding: '15px' }}
      >
        + Add a card
      </div>
      {isCardOpen && (
        <CardInput
          listId={listId}
          onClose={handleCloseCard}
          indCardsList={indCardsList}
          setIndCardsList={setIndCardsList}
        />
      )}
    </div>
  );
}

export default AddCard;
