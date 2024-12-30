import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import api from '../services/api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    api.post('/auth/login', { email, password })
      .then(res => {
        // Save token, redirect, etc.
        localStorage.setItem('token', res.data.token);
        window.location.href = '/';
      })
      .catch(err => {
        console.error(err);
        alert('Login failed');
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Login
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
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
}

export default LoginPage;
