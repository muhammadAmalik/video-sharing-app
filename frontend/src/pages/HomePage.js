import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import api from '../services/api';
import VideoCard from '../components/VideoCard';
import { useSnackbar } from '../components/SnackbarContext';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const { showError } = useSnackbar();

  useEffect(() => {
    api.get('/videos/latest')
      .then(res => setVideos(res.data))
      .catch(err => {
        console.error(err);
        showError('Failed to load videos');
      });
  }, [showError]);

  return (
    <Container sx={{ mt: 4 }} className="fade-in">
      <Typography variant="h4" gutterBottom>
        Latest Videos
      </Typography>
      <Grid container spacing={3}>
        {videos.map(video => (
          <Grid item xs={12} sm={6} md={4} key={video._id}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
