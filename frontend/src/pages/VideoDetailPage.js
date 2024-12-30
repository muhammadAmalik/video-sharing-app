import React, { useEffect, useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import api from '../services/api';
import { useParams } from 'react-router-dom';

function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    api.get(`/videos/${id}`)
      .then(res => setVideo(res.data))
      .catch(err => console.error(err));
  }, [id]);

  const handleCommentSubmit = () => {
    const token = localStorage.getItem('token');
    api.post(`/comments/${id}`, { text: commentText }, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        setVideo(prev => ({ ...prev, comments: [...prev.comments, res.data] }));
        setCommentText('');
      })
      .catch(err => console.error(err));
  };

  if (!video) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {video.title}
      </Typography>
      <video width="100%" controls src={video.videoUrl}>
        Your browser does not support the video tag.
      </video>
      <Typography variant="body1" sx={{ mt: 2 }}>
        Hashtags: {video.hashtags.join(', ')}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Comments
      </Typography>
      {video.comments && video.comments.map((c, index) => (
        <Typography key={index} variant="body2" sx={{ mt: 1 }}>
          - {c.text}
        </Typography>
      ))}

      <TextField
        label="Add a comment"
        fullWidth
        margin="normal"
        value={commentText}
        onChange={e => setCommentText(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleCommentSubmit}>
        Comment
      </Button>
    </Container>
  );
}

export default VideoDetailPage;
