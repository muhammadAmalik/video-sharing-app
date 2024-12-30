import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  return (
    <Card>
      <Link to={`/video/${video._id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          height="140"
          image={video.thumbnailUrl || 'https://via.placeholder.com/300x140.png?text=No+Thumbnail'}
          alt={video.title}
        />
        <CardContent>
          <Typography variant="h6" noWrap>
            {video.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {video.hashtags.join(' ')}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

export default VideoCard;
