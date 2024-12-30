// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import VideoCard from '../components/VideoCard';
import HashtagList from '../components/HashtagList';
import api from '../services/api';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    // For demonstration, local mock data:
    setVideos([
      { _id: '1', title: 'Awesome Travel', thumbnailUrl: '', hashtags: ['#travel', '#adventure'] },
      { _id: '2', title: 'Cooking Tips', thumbnailUrl: '', hashtags: ['#food', '#cooking'] },
      { _id: '3', title: 'Tech Review', thumbnailUrl: '', hashtags: ['#tech', '#gadgets'] },
    ]);

    setHashtags(['#travel', '#food', '#tech', '#funny', '#music', '#sports']);
  }, []);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Latest Videos
      </Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Box sx={{ flex: 3 }}>
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video._id}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={{ flex: 1 }}>
          <HashtagList hashtags={hashtags} />
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
