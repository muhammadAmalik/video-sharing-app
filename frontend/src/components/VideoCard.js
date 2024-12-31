import React from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  // If video has a thumbnail or if you want a placeholder
  const thumbnail = 'https://via.placeholder.com/300x180.png?text=No+Thumbnail';

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
          <Typography variant="h6" noWrap>{video.title}</Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {video.hashtags && video.hashtags.join(' ')}
          </Typography>
        </CardContent>
      </Link>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <IconButton color="secondary">
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default VideoCard;
