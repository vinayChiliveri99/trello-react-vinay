/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import WorkSpaceCard from './WorkSpaceCard';
import { Card, CardActionArea, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllBoards } from '../API';

function Boards(props) {
  const { handleCreateClick } = props;
  const [boardsData, setBoardsData] = useState([]);

  const navigate = useNavigate();

  // getting the boards data to display boards.
  // getAllBoards is a get req present in API.js
  useEffect(() => {
    getAllBoards()
      .then((data) => setBoardsData(data))
      .catch((err) => console.log(err));
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

          const contentStyle = {
            margin: '10px',
            fontWeight: '700',
          };

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
