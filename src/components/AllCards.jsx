/* eslint-disable react/prop-types */
import { useState } from 'react';
import { archiveCard } from '../API';
import Card from './Card';
import { Alert, AlertTitle } from '@mui/material';

function AllCards(props) {
  const { indCardsList, setIndCardsList, listName } = props;

  const [errorMessage, setErrorMessage] = useState(null);

  // archiving a card

  function handleArchiveCard(id) {
    archiveCard(id)
      .then(() => {
        setIndCardsList(indCardsList.filter((ele) => ele.id !== id));
      })
      .catch((err) => {
        console.error('error while archiving the card', err);
        setErrorMessage(
          `${err} while archiving the card, Please try again..`
        );
      });
  }

  // handling error

  if (errorMessage !== null) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>
    );
  }

  return (
    <section style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {indCardsList.map((ele) => (
        <Card
          key={ele.id}
          cardData={ele}
          listName={listName}
          handleArchiveCard={handleArchiveCard}
        />
      ))}
    </section>
  );
}

export default AllCards;
