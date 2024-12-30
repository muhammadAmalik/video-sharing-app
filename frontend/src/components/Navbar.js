// src/components/Navbar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton sx={{ color: '#fff', mr: 2 }}>
          <PlayCircleFilledWhiteIcon fontSize="large" />
        </IconButton>
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            MiniTik
          </Link>
        </Typography>
        <Button color="inherit" component={Link} to="/login" sx={{ mr: 2 }}>
          Login
        </Button>
        <Button variant="outlined" color="inherit" component={Link} to="/register">
          Register
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
