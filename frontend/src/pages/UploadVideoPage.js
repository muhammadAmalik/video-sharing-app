// src/pages/UploadVideoPage.js
import React, { useState } from 'react';
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  LinearProgress,
  Box,
  IconButton,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import api from '../services/api';

const HiddenInput = styled('input')({
  display: 'none',
});

function UploadVideoPage() {
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const handleFileSelect = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      alert('Please select a video file!');
      return;
    }
    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('hashtags', hashtags);
      formData.append('video', videoFile);

      // Example: if your backend expects Bearer token, set it here
      // const token = localStorage.getItem('token');

      await api.post('/videos/upload', formData, {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
        headers: {
          'Content-Type': 'multipart/form-data',
          // Authorization: `Bearer ${token}`,
        },
      });

      alert('Video uploaded successfully!');
      setTitle('');
      setHashtags('');
      setVideoFile(null);
      setUploadProgress(0);
    } catch (err) {
      console.error(err);
      alert('Video upload failed!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 6 }} className="fade-in">
      <Card
        sx={{
          p: 3,
          borderRadius: '20px',
          background:
            'linear-gradient(45deg, rgba(255,255,255,0.8), rgba(255,255,255,0.9))',
          boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
        }}
      >
        <CardContent>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
            Upload a New Video
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              margin="normal"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              label="Hashtags (comma separated)"
              fullWidth
              margin="normal"
              variant="outlined"
              value={hashtags}
              onChange={(e) => setHashtags(e.target.value)}
            />

            <Box
              sx={{
                mt: 3,
                p: 3,
                border: '2px dashed #ccc',
                borderRadius: '12px',
                textAlign: 'center',
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 60, color: '#aaa' }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Drag and drop a file here or click the button below to select a video.
              </Typography>
              <label htmlFor="video-upload">
                <HiddenInput
                  accept="video/*"
                  id="video-upload"
                  type="file"
                  onChange={handleFileSelect}
                />
                <Button
                  variant="contained"
                  startIcon={<CloudUploadIcon />}
                  component="span"
                  sx={{ mb: 2 }}
                >
                  Choose Video
                </Button>
              </label>
              {videoFile && (
                <Typography variant="body1" sx={{ mt: 1 }}>
                  Selected: {videoFile.name}
                </Typography>
              )}
            </Box>

            {uploading && (
              <Box sx={{ mt: 3 }}>
                <LinearProgress variant="determinate" value={uploadProgress} />
                <Typography sx={{ mt: 1 }}>{uploadProgress}%</Typography>
              </Box>
            )}

            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 4 }}
              onClick={handleUpload}
              disabled={uploading}
            >
              {uploading ? 'Uploading...' : 'Upload Video'}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}

export default UploadVideoPage;