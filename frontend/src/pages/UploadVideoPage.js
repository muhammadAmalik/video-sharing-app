import React, { useState } from 'react';
import {
  Container, Card, CardContent, Typography,
  TextField, Button, LinearProgress, Box
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import api from '../services/api';
import { useSnackbar } from '../components/SnackbarContext';

const HiddenInput = styled('input')({
  display: 'none',
});

function UploadVideoPage() {
  const [title, setTitle] = useState('');
  const [hashtags, setHashtags] = useState('');
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const { showSuccess, showError } = useSnackbar();

  const handleFileSelect = (e) => {
    setVideoFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!videoFile) {
      showError('No video selected!');
      return;
    }
    setUploading(true);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('hashtags', hashtags);
      formData.append('video', videoFile);

      await api.post('/videos/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });

      showSuccess('Upload successful!');
      setTitle('');
      setHashtags('');
      setVideoFile(null);
      setUploadProgress(0);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        showError('Only creators can upload videos');
      } else {
        showError('Upload failed');
      }
    } finally {
      setUploading(false);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Card
        sx={{
          p: 3,
          borderRadius: '20px',
          background:
            'linear-gradient(45deg, rgba(255,255,255,0.85), rgba(255,255,255,0.95))',
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
                transition: 'all 0.2s ease-in-out',
                '&:hover': { backgroundColor: '#fce4ec' },
              }}
            >
              <CloudUploadIcon sx={{ fontSize: 60, color: '#aaa' }} />
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Drag and drop a video file or click the button below.
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
              startIcon={<CloudUploadIcon />}
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
