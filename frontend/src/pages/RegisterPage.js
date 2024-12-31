import React, { useState } from 'react';
import {
  Container, Paper, Box, TextField, Typography,
  Button, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useSnackbar } from '../components/SnackbarContext';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('consumer');
  const navigate = useNavigate();
  const { showSuccess, showError } = useSnackbar();

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', { username, email, password, role });
      showSuccess('Registration successful. Please log in.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      showError('Registration failed');
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

          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              label="Role"
              onChange={(e) => setRole(e.target.value)}
            >
              <MenuItem value="consumer">Consumer</MenuItem>
              <MenuItem value="creator">Creator</MenuItem>
            </Select>
          </FormControl>

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
