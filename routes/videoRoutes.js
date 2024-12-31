// videoRoutes.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const { BlobServiceClient } = require('@azure/storage-blob');
const Video = require('../models/Video');

const inMemoryStorage = multer.memoryStorage();
const uploadStrategy = multer({ storage: inMemoryStorage });

router.post('/upload', authMiddleware, uploadStrategy.single('video'), async (req, res) => {
  try {
    if (req.user.role !== 'creator') {
      return res.status(403).json({ message: 'Only creators can upload videos' });
    }

    const { title, hashtags } = req.body;
    if (!req.file) return res.status(400).json({ message: 'No video file provided' });
    const tagsArray = hashtags ? hashtags.split(',').map((tag) => tag.trim()) : [];

    // Connect to Azure
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING);
    const containerClient = blobServiceClient.getContainerClient('videos'); // your container name

    const blobName = Date.now() + '-' + req.file.originalname.replace(/\s/g, '');
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // Upload the file buffer
    await blockBlobClient.upload(req.file.buffer, req.file.buffer.length, {
      blobHTTPHeaders: { blobContentType: req.file.mimetype },
    });

    const videoUrl = blockBlobClient.url;

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
