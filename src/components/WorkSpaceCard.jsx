/* eslint-disable react/prop-types */
import { Card, CardActionArea, Typography } from '@mui/material';

function WorkSpaceCard(props) {
  const { name, cardStyle, contentStyle, handleBoardOpening } = props;

  // console.log(boardsData);

  return (
    <>
      <CardActionArea style={cardStyle} onClick={handleBoardOpening}>
        <Card style={cardStyle}>
          <Typography variant="subtitle1" style={contentStyle}>
            {name}
          </Typography>
        </Card>
      </CardActionArea>
    </>
  );
}

export default WorkSpaceCard;
