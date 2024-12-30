import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';
import { useParams } from 'react-router-dom';

function VideoDetailPage() {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    // fetch(`/api/videos/${id}`)
    //   .then(res => res.json())
    //   .then(data => setVideo(data))
    //   .catch(err => console.error(err));

    // Dummy data
    setVideo({
      _id: id,
      title: 'Sample Video',
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      hashtags: ['#sample', '#video'],
      comments: [
        { text: 'Great clip!' },
        { text: 'Love this!' },
      ],
    });
  }, [id]);

  if (!video) return <p>Loading...</p>;

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4">{video.title}</Typography>
      <Box sx={{ mt: 2 }}>
        <video src={video.videoUrl} controls width="100%" />
      </Box>
      <Typography variant="subtitle1" sx={{ mt: 1 }}>
        Hashtags: {video.hashtags.join(' ')}
      </Typography>
      <Typography variant="h6" sx={{ mt: 2 }}>
        Comments
      </Typography>
      {video.comments && video.comments.map((c, i) => (
        <Typography key={i} variant="body1" sx={{ ml: 2, mt: 1 }}>
          • {c.text}
        </Typography>
      ))}
    </Container>
  );
}

export default VideoDetailPage;
