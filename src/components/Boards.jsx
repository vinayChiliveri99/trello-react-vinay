/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import WorkSpaceCard from './WorkSpaceCard';
import { Card, CardActionArea, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Boards(props) {
  const { handleCreateClick } = props;
  const [boardsData, setBoardsData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    function fetchBoards() {
      fetch(
        'https://api.trello.com/1/members/6597ebc98f968c8e9bd02250/boards?key=8595f1e78e95986a8b549202c4381a5f&token=ATTA4d7d74fc6a6c36f86451b56a6f76d81e787ef0b601deba8c15bbff6c5179b25973C5D889'
      )
        .then((res) => res.json())
        .then((data) => setBoardsData(data))
        .catch((err) => console.log(err));
    }

    fetchBoards();
  }, []);

  const createCardStyle = {
    height: '100px',
    width: '200px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  function handleBoardOpening(id) {
    navigate(`/boards/${id}`);
  }

  return (
    <section className="boards-outer">
      <h4>YOUR WORKSPACE</h4>
      <section className="boards-container">
        {boardsData.map((board) => {
          let backgroundImage = board.prefs.backgroundImage;
          if (board.prefs.backgroundImageScaled) {
            backgroundImage =
              board.prefs.backgroundImageScaled[2].url;
          }

          const cardStyle = {
            height: '100px',
            width: '200px',
            color: 'white',
            borderRadius: '5px',
            ...board.prefs,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'auto',
            backgroundPosition: 'center',
          };

          const contentStyle = { margin: '10px', fontWeight: '700' };

          return (
            <div key={board.id}>
              <WorkSpaceCard
                handleBoardOpening={() =>
                  handleBoardOpening(board.id)
                }
                name={board.name}
                cardStyle={cardStyle}
                contentStyle={contentStyle}
              />
            </div>
          );
        })}
        <CardActionArea
          style={createCardStyle}
          onClick={handleCreateClick}
        >
          <Card style={createCardStyle}>
            <Typography>Create new board</Typography>
            <p>{10 - boardsData.length} remaining</p>
          </Card>
        </CardActionArea>
      </section>
    </section>
  );
}

export default Boards;
