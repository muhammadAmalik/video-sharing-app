import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import api from '../services/api';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { username, email, password });
      alert('Registration successful. Please log in.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }} className="fade-in">
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: '20px',
          backgroundColor: 'rgba(255,255,255,0.85)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        }}
      >
        <PersonAddIcon sx={{ fontSize: 60, color: 'secondary.main', mb: 2 }} />
        <Typography variant="h4" gutterBottom>
          Register
        </Typography>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <Link to="/login" style={{ color: '#ff4081', fontWeight: 'bold' }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
