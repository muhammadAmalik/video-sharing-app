import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <IconButton sx={{ color: '#fff', mr: 2 }}>
          <VideoLibraryIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            MiniTik
          </Link>
        </Typography>
        {/* Additional nav items like Login/Register can go here */}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
