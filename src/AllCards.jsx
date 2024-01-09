/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Card from './components/Card';
function AllCards(props) {
  // use this list id, to fetch the cards inside the list.
  const { listId } = props;
  // console.log(listId);

  const [indCardsList, setIndCardsList] = useState([]);

  const ApiKey = `8595f1e78e95986a8b549202c4381a5f`;
  const ApiToken = `ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889`;

  useEffect(() => {
    fetch(
      `https://api.trello.com/1/lists/${listId}/cards?key=${ApiKey}&token=${ApiToken}`
    )
      .then((res) => res.json())
      .then((data) => setIndCardsList(data));
  }, []);

  // console.log('individual card list', indCardsList);
  return (
    <section>
      {indCardsList.map((ele) => (
        <Card key={ele.id} cardData={ele} />
      ))}
    </section>
  );
}

export default AllCards;
