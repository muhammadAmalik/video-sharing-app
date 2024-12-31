import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Typography, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import api from '../services/api';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    api.post('/auth/register', { email, password })
      .then(() => {
        alert('Registration successful');
        window.location.href = '/login';
      })
      .catch((err) => {
        console.error(err);
        alert('Registration failed');
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
        <PersonAddIcon sx={{ fontSize: 60, mb: 2, color: 'secondary.main' }} />
        <Typography variant="h4" gutterBottom>
          Register
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
            color="secondary"
            fullWidth
            sx={{ mt: 3, py: 1.5, fontSize: '1rem' }}
            onClick={handleRegister}
          >
            Sign Up
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#ef5350', fontWeight: 'bold' }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
