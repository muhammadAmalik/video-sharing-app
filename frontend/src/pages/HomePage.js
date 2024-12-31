import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import VideoCard from '../components/VideoCard';
import HashtagList from '../components/HashtagList';
import api from '../services/api';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [hashtags, setHashtags] = useState([]);

  useEffect(() => {
    // Real call to fetch latest videos
    api.get('/videos/latest')
      .then((res) => setVideos(res.data))
      .catch((err) => console.error(err));

    // If you have an endpoint for trending hashtags, call it
    // or just set dummy data
    setHashtags(['#travel', '#tech', '#food', '#music', '#funny']);
  }, []);

  return (
    <Container sx={{ mt: 4 }} className="fade-in">
      <Typography variant="h4" gutterBottom>
        Latest Videos
      </Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
        {/* VIDEO GRID */}
        <Box sx={{ flex: 3 }}>
          <Grid container spacing={3}>
            {videos.map((video) => (
              <Grid item xs={12} sm={6} md={4} key={video._id}>
                <VideoCard video={video} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* HASHTAG LIST */}
        <Box sx={{ flex: 1, display: { xs: 'none', md: 'block' } }}>
          <HashtagList hashtags={hashtags} />
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
