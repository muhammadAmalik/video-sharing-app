const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const Video = require('../models/Video');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');

// Use in-memory storage
const inMemoryStorage = multer.memoryStorage();
const upload = multer({ storage: inMemoryStorage });

// POST /api/videos/upload
router.post('/upload', authMiddleware, upload.single('video'), async (req, res) => {
  try {
    if (req.user.role !== 'creator') {
      return res.status(403).json({ message: 'Only creators can upload videos' });
    }
    const { title, hashtags } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No video file provided' });

    // parse hashtags
    const tagsArray = hashtags ? hashtags.split(',').map((t) => t.trim()) : [];

    // Connect to Azure Blob
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient('videos'); // container name: 'videos'

    // Unique name for blob
    const blobName = Date.now() + '-' + req.file.originalname.replace(/\s/g, '');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload buffer
    await blockBlobClient.upload(req.file.buffer, req.file.buffer.length, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });

    const videoUrl = blockBlobClient.url; // public URL if container is set to "blob" or "container"

    // Save to DB
    const video = new Video({
      title,
      hashtags: tagsArray,
      videoUrl,
      creator: req.user.id,
    });
    await video.save();

    return res.status(201).json(video);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
});

// GET /api/videos/latest
router.get('/latest', async (req, res) => {
  try {
    const vids = await Video.find().sort({ createdAt: -1 }).limit(20);
    res.json(vids);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// GET /api/videos/:id
router.get('/:id', async (req, res) => {
  try {
    const video = await Video.findById(req.params.id).populate('creator', '-password');
    if (!video) return res.status(404).json({ message: 'Not found' });
    // Optionally embed comments or retrieve them separately
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
