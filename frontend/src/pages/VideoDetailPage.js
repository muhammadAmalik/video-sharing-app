// src/pages/VideoDetailPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import api from '../services/api';

function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // In real scenario: api.get(`/videos/${id}`)
    setVideo({
      _id: id,
      title: 'Sample Video Title',
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      hashtags: ['#sample', '#video'],
      comments: [
        { user: 'Alice', text: 'Great video!' },
        { user: 'Bob', text: 'Awesome content!' },
      ],
    });
  }, [id]);

  const handleAddComment = (text) => {
    // Example: api.post(`/comments/${id}`, { text })
    // Then update state
    if (!text) return;
    setVideo((prev) => ({
      ...prev,
      comments: [...prev.comments, { user: 'You', text }],
    }));
  };

  if (!video) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {video.title}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <video controls width="100%" src={video.videoUrl} />
      </Box>
      <Typography variant="body1" gutterBottom>
        Hashtags: {video.hashtags.join(' ')}
      </Typography>
      <CommentSection comments={video.comments} onAddComment={handleAddComment} />
    </Container>
  );
}

export default VideoDetailPage;
