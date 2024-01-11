/* eslint-disable react/prop-types */
import { Button, Card, CardContent, Input } from '@mui/material';
import { useState } from 'react';

function CardInput({
  listId,
  onClose,
  setIndCardsList,
  indCardsList,
}) {
  const [cardText, setCardText] = useState('');
  const ApiKey = `8595f1e78e95986a8b549202c4381a5f`;
  const ApiToken = `ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889`;

  function handleAddCard() {
    // Make a POST request to the create card API
    fetch(
      `https://api.trello.com/1/cards?idList=${listId}&key=${ApiKey}&token=${ApiToken}`,
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: cardText,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log('Card created successfully:', data);
        setIndCardsList([...indCardsList, data]);
      })
      .catch((error) => {
        console.error('Error creating card:', error);
      });

    setCardText('');
  }

  return (
    <Card>
      <CardContent>
        <Input
          type="text"
          value={cardText}
          onChange={(e) => setCardText(e.target.value)}
          placeholder="Enter a title for this card..."
          fullWidth
          multiline
          rows={2}
          variant="outlined"
          style={{ marginBottom: '8px' }}
        />
        <Button
          variant="contained"
          onClick={handleAddCard}
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
