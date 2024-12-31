import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Typography, Button } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useSnackbar } from '../components/SnackbarContext';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();

  const handleLogin = async () => {
    try {
      const res = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);

      showSuccess('Login successful!');
      // *** Force navigate to home page ***
      navigate('/');
    } catch (err) {
      console.error(err);
      showError('Login failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: '20px',
          backgroundColor: 'rgba(255,255,255,0.85)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        }}
      >
        <LockIcon sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
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
          <Link to="/register" style={{ color: '#8e24aa', fontWeight: 'bold' }}>
            Register
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default LoginPage;
