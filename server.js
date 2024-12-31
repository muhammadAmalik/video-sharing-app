require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const videoRoutes = require('./routes/videoRoutes');
const commentRoutes = require('./routes/commentRoutes');

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Connect DB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/videos', videoRoutes);
app.use('/api/comments', commentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
