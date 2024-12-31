import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

function HashtagList({ hashtags }) {
  return (
    <Paper sx={{ p: 2, position: 'sticky', top: 100 }} elevation={3}>
      <Typography variant="h6" gutterBottom>
        Trending Hashtags
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {hashtags.map((tag, idx) => (
          <Typography
            key={idx}
            variant="body1"
            sx={{
              backgroundColor: '#e1bee7',
              borderRadius: '12px',
              px: 2,
              py: 0.5,
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#ce93d8',
              },
            }}
          >
            {tag}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
}

export default HashtagList;
