"use strict";

require('dotenv').config();
var express = require('express');
var cors = require('cors');
var _require = require('./config/db'),
  connectDB = _require.connectDB;

// Routes
var authRoutes = require('./routes/authRoutes');
var videoRoutes = require('./routes/videoRoutes');
var commentRoutes = require('./routes/commentRoutes');
var app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});