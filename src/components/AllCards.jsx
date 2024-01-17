/* eslint-disable react/prop-types */
import { useState } from 'react';
import { archiveCard } from '../API';
import Card from './Card';
import { Alert, AlertTitle } from '@mui/material';

import { archiveCardInList } from '../app/slices/cardsSlice';
import { useDispatch, useSelector } from 'react-redux';

function AllCards(props) {
  const { listId, listName } = props;

  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();

  // archiving a card

  function handleArchiveCard(id) {
    archiveCard(id)
      .then(() => {
        // setIndCardsList(indCardsList.filter((ele) => ele.id !== id));
        dispatch(archiveCardInList({ listId: listId, cardId: id }));
      })
      .catch((err) => {
        console.error('error while archiving the card', err);
        setErrorMessage(
          'Error while archiving the card, Please try again..'
        );
      });
  }

  const indCardsList = useSelector((state) => state.cards.data);
  // console.log(indCardsList);

  // handling error

  if (errorMessage !== null) {
    return (
      <Alert severity="error">
        <AlertTitle>Error</AlertTitle>
        {errorMessage}
      </Alert>
    );
  }

  if (
    Object.keys(indCardsList).length !== 0 &&
    indCardsList[listId]
  ) {
    return (
      <section style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {indCardsList[listId].map((ele) => (
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
}

export default AllCards;
