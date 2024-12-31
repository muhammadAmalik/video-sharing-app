const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Comment = require('../models/Comment');
const Video = require('../models/Video');

router.post('/:videoId', authMiddleware, async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'No comment text' });

    const video = await Video.findById(videoId);
    if (!video) return res.status(404).json({ message: 'Video not found' });

    const comment = new Comment({
      text,
      video: video._id,
      user: req.user.id,
    });
    await comment.save();

    return res.status(201).json(comment);
  } catch (err) {
    console.error('Comment error:', err);
    res.status(500).json({ message: err.message });
  }
});
// GET /api/comments/:videoId
router.get('/:videoId', async (req, res) => {
  try {
    const { videoId } = req.params;

    // Validate videoId as a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(videoId)) {
      return res.status(400).json({ message: 'Invalid video ID format' });
    }

    const comments = await Comment.find({ video: videoId })
      .populate('user', 'username'); 

    res.json(comments);
  } catch (err) {
    console.error('Get comments error:', err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
