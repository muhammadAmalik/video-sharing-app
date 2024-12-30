import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import api from '../services/api';

function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = () => {
    api.post('/auth/register', { email, password })
      .then(res => {
        alert('Registration successful. Please login.');
        window.location.href = '/login';
      })
      .catch(err => {
        console.error(err);
        alert('Registration failed');
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
}

export default RegisterPage;
