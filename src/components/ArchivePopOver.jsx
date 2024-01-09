/* eslint-disable react/prop-types */
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

export default function ArchivePopOver(props) {
  const {
    anchorEl,
    handleClick,
    handleClose,
    listId,
    handleArchive,
  } = props;
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        style={{ fontWeight: '900', color: 'black' }}
      >
        ...
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <div
          style={{
            height: '50px',
            width: '250px',
            display: 'flex',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={() => handleArchive(listId)}
        >
          <p>Archive this list</p>
        </div>
      </Popover>
    </div>
  );
}
