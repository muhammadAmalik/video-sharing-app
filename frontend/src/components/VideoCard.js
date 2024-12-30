import React from 'react';
import { Card, CardContent, CardMedia, CardActions, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function VideoCard({ video }) {
  const thumbnail = video.thumbnailUrl || 'https://via.placeholder.com/300x180.png?text=No+Thumbnail';

  return (
    <Card>
      <Link to={`/video/${video._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <CardMedia
          component="img"
          alt={video.title}
          height="180"
          image={thumbnail}
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.2s ease-in-out',
            '&:hover': {
              transform: 'scale(1.03)',
            },
          }}
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
      <CardActions sx={{ justifyContent: 'space-between' }}>
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
