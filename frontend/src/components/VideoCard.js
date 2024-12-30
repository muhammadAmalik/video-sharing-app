// src/components/VideoCard.js
import React from 'react';
import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  const thumbnail = video.thumbnailUrl || 'https://via.placeholder.com/300x180?text=No+Thumbnail';

  return (
    <Card>
      <Link to={`/video/${video._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          height="180"
          image={thumbnail}
          alt={video.title}
        />
        <CardContent>
          <Typography variant="h6" noWrap>
            {video.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {video.hashtags && video.hashtags.join(' ')}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton color="secondary">
          <FavoriteIcon />
        </IconButton>
        <IconButton color="primary">
          <PlayCircleIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default VideoCard;
