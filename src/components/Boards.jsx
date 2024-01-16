/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import WorkSpaceCard from './WorkSpaceCard';
import {
  Alert,
  Card,
  CardActionArea,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllBoards } from '../API';
import ShimmerLoader from './ShimmerLoader';
import { useDispatch, useSelector } from 'react-redux';
import { setBoards } from '../app/slices/boardsSlice';

function Boards(props) {
  const { handleCreateClick } = props;
  // const [boardsData, setBoardsData] = useState([]);

  // getting boards data from the boardsSlice
  const boardsData = useSelector((state) => state.boards);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // getting the boards data to display boards.
  // getAllBoards is a get req present in API.js
  useEffect(() => {
    getAllBoards()
      .then((data) => {
        // setBoardsData(data);

        // dispatching data to setBoards, which is managed inside boards slice.

        dispatch(setBoards(data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setErrorMessage(
          'Error while getting boards data. Please try again'
        );
      });
  }, [dispatch]);

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

  if (errorMessage !== null) {
    return (
      <Alert variant="filled" severity="error">
        {errorMessage}
      </Alert>
    );
  }

  if (loading) {
    return (
      <div style={{ marginTop: '12vh', marginLeft: '18vw' }}>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            width: '70vw',
            height: '50vh',
            gap: '15px',
          }}
        >
          <ShimmerLoader
            height={100}
            width={200}
            count={10}
            marginRight="10px"
          />
        </div>
      </div>
    );
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
          disabled={boardsData.length === 10}
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
