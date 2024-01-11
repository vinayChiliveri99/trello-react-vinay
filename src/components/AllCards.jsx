/* eslint-disable react/prop-types */
import Card from './Card';

function AllCards(props) {
  const { indCardsList, setIndCardsList } = props;

  const ApiKey = `8595f1e78e95986a8b549202c4381a5f`;
  const ApiToken = `ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889`;

  function handleArchiveCard(id) {
    // console.log('card clicked: ', id);
    // setIsOptionsOpen(false);
    fetch(
      `https://api.trello.com/1/cards/${id}?key=${ApiKey}&token=${ApiToken}`,
      {
        method: 'DELETE',
      }
    )
      .then((response) => {
        if (response.ok) {
          setIndCardsList(
            indCardsList.filter((ele) => ele.id !== id)
          );
        } else {
          throw new Error('error while deleting a card');
        }
      })
      .catch((err) => console.error(err));
  }

  return (
    <section style={{ maxHeight: '400px', overflowY: 'auto' }}>
      {indCardsList.map((ele) => (
        <Card
          key={ele.id}
          cardData={ele}
          handleArchiveCard={handleArchiveCard}
        />
      ))}
    </section>
  );
}

export default AllCards;
