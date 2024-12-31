import React, { useEffect, useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import api from '../services/api';
import { useSnackbar } from '../components/SnackbarContext';

function ProfilePage() {
  const [user, setUser] = useState(null);
  const { showError } = useSnackbar();

  useEffect(() => {
    api.get('/users/profile')
      .then(res => setUser(res.data))
      .catch(err => {
        showError('Failed to load profile');
      });
  }, [showError]);

  if (!user) return <p>Loading profile...</p>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }} className="fade-in">
      <Paper
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: '20px',
          backgroundColor: 'rgba(255,255,255,0.85)',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Profile
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Username:</strong> {user.username}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Email:</strong> {user.email}
          </Typography>
          <Typography variant="body1">
            <strong>Role:</strong> {user.role}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
}

export default ProfilePage;
