import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';
import CommentSection from '../components/CommentSection';
import api from '../services/api';

function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    // Fetch single video details
    api.get(`/videos/${id}`)
      .then((res) => setVideo(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  // Add comment
  const handleAddComment = (text) => {
    if (!text.trim()) return;
    api.post(`/comments/${id}`, { text })
      .then((res) => {
        // The new comment is in res.data
        setVideo((prev) => ({
          ...prev,
          comments: [...(prev.comments || []), res.data],
        }));
      })
      .catch((err) => console.error(err));
  };

  if (!video) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: 4 }} className="fade-in">
      <Typography variant="h4" gutterBottom>
        {video.title}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <video controls width="100%" src={video.videoUrl} />
      </Box>
      <Typography variant="body1" gutterBottom>
        Hashtags: {video.hashtags && video.hashtags.join(' ')}
      </Typography>

      <CommentSection
        comments={video.comments || []}
        onAddComment={handleAddComment}
      />
    </Container>
  );
}

export default VideoDetailPage;
