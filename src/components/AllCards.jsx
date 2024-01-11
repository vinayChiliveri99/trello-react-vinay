/* eslint-disable react/prop-types */
import { archiveCard } from '../API';
import Card from './Card';

function AllCards(props) {
  const { indCardsList, setIndCardsList, listName } = props;

  // archiving a card

  function handleArchiveCard(id) {
    archiveCard(id)
      .then(() => {
        setIndCardsList(indCardsList.filter((ele) => ele.id !== id));
      })
      .catch((err) =>
        console.error('error while archiving the card', err)
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
