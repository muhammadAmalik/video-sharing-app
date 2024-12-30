// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import VideoCard from '../components/VideoCard';
import api from '../services/api';

function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // In real scenario, you'd fetch from your backend: api.get('/videos/latest')
    // Mock data for demonstration:
    setVideos([
      { _id: '1', title: 'Cool Video #1', thumbnailUrl: '', hashtags: ['#cool', '#fun'] },
      { _id: '2', title: 'Travel Vlog', thumbnailUrl: '', hashtags: ['#travel', '#vlog'] },
      // ...
    ]);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Latest Videos
      </Typography>
      <Grid container spacing={3}>
        {videos.map((video) => (
          <Grid item xs={12} sm={6} md={4} key={video._id}>
            <VideoCard video={video} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default HomePage;
