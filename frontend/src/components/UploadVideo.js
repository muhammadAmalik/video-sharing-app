import React, { useState } from 'react';
import { Container, TextField, Button, Typography } from '@mui/material';
import api from '../services/api';

function UploadVideo() {
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [videoFile, setVideoFile] = useState(null);

  const handleUpload = () => {
    if (!videoFile) return alert('Please select a video file');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('hashtags', hashtags);
    formData.append('video', videoFile);

    const token = localStorage.getItem('token');

    api.post('/videos/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(res => {
        alert('Video uploaded successfully');
        window.location.href = '/';
      })
      .catch(err => {
        console.error(err);
        alert('Upload failed');
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Upload Video
      </Typography>
      <TextField
        label="Title"
        fullWidth
        margin="normal"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <TextField
        label="Hashtags (comma separated)"
        fullWidth
        margin="normal"
        value={hashtags}
        onChange={e => setHashtags(e.target.value)}
      />
      <TextField
        type="file"
        fullWidth
        margin="normal"
        onChange={e => setVideoFile(e.target.files[0])}
      />
      <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleUpload}>
        Upload
      </Button>
    </Container>
  );
}

export default UploadVideo;
