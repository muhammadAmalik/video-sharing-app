import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import VideoCard from '../components/VideoCard';

function HomePage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // fetch videos from your backend
    // e.g. fetch('/api/videos/latest')
    //   .then(res => res.json())
    //   .then(data => setVideos(data))
    //   .catch(err => console.error(err));

    // Dummy data for demonstration
    setVideos([
      { _id: '1', title: 'Fun Video #1', thumbnailUrl: '', hashtags: ['#fun', '#video'] },
      { _id: '2', title: 'Cool Shorts', thumbnailUrl: '', hashtags: ['#cool', '#shorts'] },
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
