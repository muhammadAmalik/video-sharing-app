// src/pages/VideoDetailPage.js
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Example: api.get(`/videos/${id}`).then(res => setVideo(res.data))
    // For demonstration:
    setVideo({
      _id: id,
      title: 'Sample Video Title',
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      hashtags: ['#sample', '#video'],
      comments: [{ text: 'Nice video!' }, { text: 'Cool!' }],
    });
  }, [id]);

  const handleComment = () => {
    // Post comment: api.post(`/comments/${id}`, { text: commentText })
    // Then set state:
    if (!commentText) return;
    setVideo((prev) => ({
      ...prev,
      comments: [...prev.comments, { text: commentText }],
    }));
    setCommentText('');
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

      <Typography variant="h6" sx={{ mt: 2 }}>
        Comments
      </Typography>
      {video.comments.map((c, idx) => (
        <Typography key={idx} sx={{ ml: 2, mt: 1 }}>
          • {c.text}
        </Typography>
      ))}
      <Box sx={{ mt: 2 }}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleComment}
        >
          Submit
        </Button>
      </Box>
    </Container>
  );
}

export default VideoDetailPage;
