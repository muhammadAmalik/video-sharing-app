const express = require('express');
const router = express.Router();
const Comment = require('../models/Comment');
const Video = require('../models/Video');
const authMiddleware = require('../middleware/authMiddleware');

// Post a comment
router.post('/:videoId', authMiddleware, async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text } = req.body;
    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const comment = new Comment({
      video: video._id,
      user: req.user.id,
      text
    });
    await comment.save();
    return res.status(201).json(comment);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
