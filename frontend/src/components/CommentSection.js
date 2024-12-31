import React, { useState } from 'react';
import { Typography, Box, TextField, Button, Paper } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function CommentSection({ comments, onAddComment }) {
  const [text, setText] = useState('');

  const handleSubmit = () => {
    if (!text.trim()) return;
    onAddComment(text);
    setText('');
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>

      {comments.map((c, idx) => (
        <Paper key={idx} sx={{ p: 2, mb: 2 }} elevation={1}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <AccountCircleIcon sx={{ mr: 1 }} />
            <Typography variant="subtitle1" fontWeight="bold">
              {c.user || 'User'}
            </Typography>
          </Box>
          <Typography variant="body2">{c.text}</Typography>
        </Paper>
      ))}

      <Box sx={{ mt: 2 }}>
        <TextField
          label="Add a comment"
          variant="outlined"
          fullWidth
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 1 }} onClick={handleSubmit}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default CommentSection;
