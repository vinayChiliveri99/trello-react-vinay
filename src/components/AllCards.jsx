/* eslint-disable react/prop-types */
import { archiveCard } from '../API';
import Card from './Card';
import { Alert, AlertTitle } from '@mui/material';

import {
  archiveCardInList,
  setErrorMessage,
} from '../app/slices/cardsSlice';
import { useDispatch, useSelector } from 'react-redux';

function AllCards(props) {
  const { listId, listName } = props;

  const dispatch = useDispatch();
  const errorMessage = useSelector(
    (state) => state.cards.errorMessage
  );

  // archiving a card

  function handleArchiveCard(id) {
    archiveCard(id)
      .then(() => {
        dispatch(archiveCardInList({ listId: listId, cardId: id }));
      })
      .catch((err) => {
        console.error('error while archiving the card', err);
        dispatch(
          setErrorMessage(
            `${err} while archiving the card, Please try again..`
          )
        );
      });
  }

  const indCardsList = useSelector((state) => state.cards.data);

  // handling error

  if (errorMessage) {
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
