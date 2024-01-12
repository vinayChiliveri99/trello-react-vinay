/* eslint-disable react/prop-types */
import { Button, Card, CardContent, Input } from '@mui/material';
import { useState } from 'react';
import { createCard } from '../API';

function CardInput({
  listId,
  onClose,
  setIndCardsList,
  indCardsList,
}) {
  const [cardText, setCardText] = useState('');

  // function to create a new card, after giving some value
  // need to handle error, when user gives a empty value to name

  function handleAddCard(listId, cardText) {
    // Make a POST request to the create card via API
    // createCard is a function making post request in API.js file

    cardText.length !== 0
      ? createCard(listId, cardText)
          .then((data) => {
            // console.log('Card created', data);
            setIndCardsList([...indCardsList, data]);
          })
          .catch((error) => {
            console.error('Error creating card:', error);
          })
      : onClose();

    setCardText('');
  }

  return (
    <Card style={{ border: '2px solid black' }}>
      <CardContent>
        <Input
          type="text"
          value={cardText}
          onChange={(e) => setCardText(e.target.value)}
          placeholder="Enter a title for this card..."
          fullWidth
          variant="outlined"
          style={{ marginBottom: '8px' }}
        />
        <Button
          variant="contained"
          onClick={() => handleAddCard(listId, cardText)}
          style={{ marginRight: '8px' }}
        >
          Add Card
        </Button>
        <Button onClick={onClose}>X</Button>
      </CardContent>
    </Card>
  );
}

export default CardInput;
