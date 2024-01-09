/* eslint-disable react/prop-types */
function Card(props) {
  const { cardData } = props;
  // console.log(cardData);
  return (
    <div key={cardData.id} style={{ border: '1px solid red' }}>
      {cardData.name}
    </div>
  );
}

export default Card;
