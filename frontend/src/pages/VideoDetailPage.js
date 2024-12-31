import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../services/api';

function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    api.get(`/videos/${id}`)
      .then(res => setVideo(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleComment = () => {
    if (!commentText.trim()) return;
    api.post(`/comments/${id}`, { text: commentText })
      .then(res => {
        if (!video.comments) video.comments = [];
        video.comments.push(res.data);
        setVideo({ ...video });
        setCommentText('');
      })
      .catch(err => console.error(err));
  };

  if (!video) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: 4 }} className="fade-in">
      <Typography variant="h4" gutterBottom>
        {video.title}
      </Typography>
      <Box sx={{ mb: 2 }}>
        {/* If storing in Azure Blob, the videoUrl is an https link to that blob */}
        <video width="100%" controls src={video.videoUrl} />
      </Box>
      <Typography variant="body1" gutterBottom>
        Hashtags: {video.hashtags && video.hashtags.join(', ')}
      </Typography>

      {/* Comments */}
      <Box sx={{ mt: 4 }}>
        <Typography variant="h5">Comments</Typography>
        {video.comments && video.comments.map((c, idx) => (
          <Box key={idx} sx={{ my: 1, p: 1, border: '1px solid #ccc' }}>
            <Typography variant="body2">{c.text}</Typography>
          </Box>
        ))}
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Add a comment"
            fullWidth
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
          />
          <Button variant="contained" sx={{ mt: 1 }} onClick={handleComment}>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default VideoDetailPage;
