// src/pages/RegisterPage.js
import React, { useState } from 'react';
import { Container, Paper, Box, TextField, Typography, Button } from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import api from '../services/api';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    // Example: api.post('/auth/register', { email, password })
    //   .then(() => { alert('Registration successful'); window.location.href = '/login'; })
    //   .catch(err => alert('Registration failed'));
    alert(`Registering with ${email} / ${password}`);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4, textAlign: 'center' }} elevation={6}>
        <PersonAddIcon sx={{ fontSize: 48, mb: 2, color: 'secondary.main' }} />
        <Typography variant="h5" gutterBottom>
          Register
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
            color="secondary"
            fullWidth
            sx={{ mt: 3 }}
            onClick={handleRegister}
          >
            Sign Up
          </Button>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: '#f50057' }}>
            Login
          </Link>
        </Typography>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
