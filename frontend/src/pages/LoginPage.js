import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Typography, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Link } from 'react-router-dom';
import api from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    api.post('/auth/login', { email, password })
      .then((res) => {
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
      })
      .catch((err) => {
        console.error(err);
        alert('Login failed');
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }} className="fade-in">
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: '20px',
          backgroundColor: 'rgba(255,255,255,0.8)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        }}
      >
        <LockIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box sx={{ mt: 2 }}>
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
            sx={{ mt: 3, py: 1.5, fontSize: '1rem' }}
            onClick={handleLogin}
          >
            Sign In
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Don’t have an account?{' '}
          <Link to="/register" style={{ color: '#6a1b9a', fontWeight: 'bold' }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default LoginPage;
