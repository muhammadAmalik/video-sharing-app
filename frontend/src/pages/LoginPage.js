// src/pages/LoginPage.js
import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Typography, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import api from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Example: api.post('/auth/login', { email, password })
    //   .then(res => { localStorage.setItem('token', res.data.token); window.location.href = '/'; })
    //   .catch(err => alert('Login failed'));
    alert(`Logging in with ${email} / ${password}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }} elevation={6}>
        <LockIcon sx={{ fontSize: 48, mb: 2, color: 'primary.main' }} />
        <Typography variant="h5" gutterBottom>
          Login
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            variant="outlined"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: '#7b1fa2' }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default LoginPage;
