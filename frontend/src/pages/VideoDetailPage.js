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
  const [loadingVideo, setLoadingVideo] = useState(true);
  const [loadingComments, setLoadingComments] = useState(true);

  useEffect(() => {
    const fetchVideoAndComments = async () => {
      try {
        const videoResponse = await api.get(`/videos/${id}`);
        setVideo(videoResponse.data);
        setLoadingVideo(false);

        const commentsResponse = await api.get(`/comments/${id}`);
        setVideo(prevVideo => ({
          ...prevVideo,
          comments: commentsResponse.data,
        }));
        setLoadingComments(false);
      } catch (error) {
        console.error(error);
        showError('Failed to load video or comments');
        setLoadingVideo(false);
        setLoadingComments(false);
      }
    };

    fetchVideoAndComments();
  }, [id, showError]);

  const handleComment = async () => {
    if (!commentText.trim()) return;

    try {
      const response = await api.post(`/comments/${id}`, { text: commentText });

      setVideo(prevVideo => ({
        ...prevVideo,
        comments: prevVideo.comments ? [...prevVideo.comments, response.data] : [response.data],
      }));

      setCommentText('');
      showSuccess('Comment added!');
    } catch (error) {
      console.error(error);
      showError('Failed to post comment');
    }
  };

  if (loadingVideo) return <p>Loading video...</p>;

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
      <Paper elevation={3} sx={{ p: 3, backgroundColor: '#fdfdfd' }}>
        <Typography variant="h5" gutterBottom>
          Comments
        </Typography>
        {loadingComments ? (
          <Typography variant="body2">Loading comments...</Typography>
        ) : video.comments && video.comments.length > 0 ? (
          video.comments.map(c => (
            <Box
              key={c.id} // Ensure each comment has a unique 'id'
              sx={{
                my: 1,
                p: 2,
                borderRadius: 1,
                backgroundColor: '#ffffff',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
            >
              <Typography variant="body2">{c.text}</Typography>
              {/* Optional: Display author and timestamp */}
              {/* <Typography variant="caption" color="textSecondary">
                {c.author} • {new Date(c.createdAt).toLocaleString()}
              </Typography> */}
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
