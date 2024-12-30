const express = require('express');
const router = express.Router();
const Video = require('../models/Video');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // temp folder
const azureBlobService = require('../services/azureBlobService');
const fs = require('fs');

// Upload video (Only creators)
router.post('/upload', authMiddleware, upload.single('video'), async (req, res) => {
  try {
    if (req.user.role !== 'creator') {
      return res.status(403).json({ message: 'Only creators can upload videos' });
    }

    const { title, hashtags } = req.body;
    const file = req.file;

    // Upload file to Azure Blob
    const blobResult = await azureBlobService.uploadFileToBlob(file);
    // Remove local file after upload
    fs.unlinkSync(file.path);

    const video = new Video({
      title,
      hashtags: hashtags.split(',').map(tag => tag.trim()),
      videoUrl: blobResult.url,
      creator: req.user.id
    });
    await video.save();
    return res.status(201).json(video);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
});

// Get latest videos
router.get('/latest', async (req, res) => {
  try {
    const videos = await Video.find().sort({ createdAt: -1 }).limit(20);
    return res.json(videos);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Get single video by ID
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('creator');
    if (!video) return res.status(404).json({ message: 'Video not found' });
    // For convenience, also fetch comments in front-end with another route,
    // or you can embed them if you like
    const comments = await require('../models/Comment').find({ video: video._id });
    return res.json({ ...video._doc, comments });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
