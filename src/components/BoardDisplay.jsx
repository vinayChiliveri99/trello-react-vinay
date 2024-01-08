import { useParams } from 'react-router-dom';

function BoardDisplay() {
  let { id } = useParams();

  console.log(id);
  // using this id we need to fetch the lists present in accordance with this id
  return <div>This is Board with ID: {id}</div>;
}

export default BoardDisplay;
