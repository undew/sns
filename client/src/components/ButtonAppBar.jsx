import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Login from './Login';
import Avatar from '@mui/material/Avatar';

const Header = styled.header`
  position:fixed;
  width:100%;
  z-index:9;
`
export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const [log, setLog] = React.useState(false);
  console.log(open);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLogChange = () => setLog(log ? false : true);

  return (
    <>
      <Header>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                News
              </Typography>
              {log
                ? <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                : <Button color="inherit" onClick={handleClickOpen}>Login</Button>}
            </Toolbar>
          </AppBar>
        </Box>
      </Header>
      <Login open={open} handleClose={handleClose} log={handleLogChange} />
    </>
  );
}

