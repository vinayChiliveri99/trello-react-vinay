/* eslint-disable react/prop-types */
import {
  AppBar,
  Button,
  CssBaseline,
  Grid,
  Toolbar,
} from '@mui/material';
import CreatePopover from './CreatePopover';

function Header(props) {
  const {
    handleCreateClick,
    createPopoverAnchor,
    handleCreateClose,
  } = props;
  return (
    <>
      <CssBaseline />
      <AppBar
        position="relative"
        style={{ backgroundColor: 'white', height: '70px' }}
      >
        <Toolbar>
          <Grid
            container
            justifyContent="space-between"
            style={{ margin: '0 30px' }}
          >
            <p className="logo"></p>
            <Button
              variant="contained"
              onClick={handleCreateClick}
              style={{ height: '30px', alignSelf: 'center' }}
            >
              Create
            </Button>
            <CreatePopover
              createPopoverAnchor={createPopoverAnchor}
              handleCreateClose={handleCreateClose}
            />
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
