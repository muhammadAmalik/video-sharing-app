// src/components/Navbar.js
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Link } from 'react-router-dom';

function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => setDrawerOpen(!drawerOpen);

  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          <IconButton sx={{ color: '#fff', mr: 2 }} onClick={toggleDrawer}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
              MegaVideo
            </Link>
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/upload"
            startIcon={<CloudUploadIcon />}
            sx={{ mr: 2 }}
          >
            Upload
          </Button>
          <Button color="inherit" component={Link} to="/login" sx={{ mr: 1 }}>
            Login
          </Button>
          <Button variant="outlined" color="inherit" component={Link} to="/register">
            Register
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <Box sx={{ width: 250, mt: 2 }}>
          <List>
            <ListItem button component={Link} to="/" onClick={toggleDrawer}>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button component={Link} to="/upload" onClick={toggleDrawer}>
              <ListItemText primary="Upload" />
            </ListItem>
            <ListItem button component={Link} to="/login" onClick={toggleDrawer}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register" onClick={toggleDrawer}>
              <ListItemText primary="Register" />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
