import React, { useState } from 'react';
import {
  AppBar, Toolbar, Typography, TextField, IconButton,
  Avatar, Menu, MenuItem, Box, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleProfile = () => {
    setAnchorEl(null);
    navigate('/profile');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleSearch = () => {
    alert(`Searching for: ${searchQuery}`);
  };

  return (
    <AppBar position="static" sx={{ px: 2 }}>
      <Toolbar>
        <Typography variant="h5" sx={{ fontWeight: 'bold', flexGrow: 0, mr: 2 }}>
          <Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>
            MegaVideo
          </Link>
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search..."
            sx={{ backgroundColor: '#fff', borderRadius: 1, mr: 1, width: { xs: 150, sm: 250 } }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <IconButton onClick={handleSearch} sx={{ color: '#fff' }}>
            <SearchIcon />
          </IconButton>
        </Box>

        {/* Upload button */}
        <Button
          component={Link}
          to="/upload"
          variant="outlined"
          color="inherit"
          sx={{ mr: 2 }}
        >
          Upload
        </Button>

        {/* Avatar */}
        <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
          <Avatar sx={{ bgcolor: '#fff', color: 'primary.main' }} />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
