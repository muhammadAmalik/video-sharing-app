const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const User = require('../models/User');

// GET /api/users/profile
router.get('/profile', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.json(user);
  } catch (err) {
    console.error('Profile error:', err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
