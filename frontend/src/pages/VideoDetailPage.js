import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, TextField, Button, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { useSnackbar } from '../components/SnackbarContext';

function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState('');
  const { showError, showSuccess } = useSnackbar();

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoRes = await api.get(`/videos/${id}`);
        setVideo(videoRes.data);
      } catch (err) {
        console.error(err);
        showError('Failed to load video');
      }
    };

    fetchVideo();
  }, [id, showError]);

  const handleComment = async () => {
    if (!commentText.trim()) return;
    try {
      const res = await api.post(`/comments/${id}`, { text: commentText });
      setVideo(prev => ({
        ...prev,
        comments: prev.comments ? [...prev.comments, res.data] : [res.data],
      }));
      setCommentText('');
      showSuccess('Comment added!');
    } catch (err) {
      console.error(err);
      showError('Failed to post comment');
    }
  };

  if (!video) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: 4 }} className="fade-in">
      <Typography variant="h4" gutterBottom>
        {video.title}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <video width="100%" controls src={video.videoUrl} />
      </Box>
      <Typography variant="body1" sx={{ mb: 2 }}>
        Hashtags: {video.hashtags && video.hashtags.join(', ')}
      </Typography>

      {/* Comments Section Wrapped in a Pale White Box */}
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#f9f9f9' }}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
        {video.comments && video.comments.length > 0 ? (
          video.comments.map((c, idx) => (
            <Box
              key={idx}
              sx={{
                my: 1,
                p: 2,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="body2">{c.text}</Typography>
            </Box>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No comments yet. Be the first to comment!
          </Typography>
        )}
        <Box sx={{ mt: 3 }}>
          <TextField
            label="Add a comment"
            fullWidth
            multiline
            minRows={2}
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            variant="outlined"
          />
          <Button
            variant="contained"
            sx={{ mt: 2 }}
            onClick={handleComment}
            disabled={!commentText.trim()}
          >
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default VideoDetailPage;
