const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { email, password, username, role } = req.body;
    if (!email || !password || !username || !role) {
      return res.status(400).json({ message: 'Missing fields' });
    }
    if (!['consumer', 'creator'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'Email already in use' });

    user = new User({ email, password, username, role });
    await user.save();
    return res.status(201).json({ message: 'User registered' });
  } catch (err) {
    console.error('Register error:', err);
    return res.status(500).json({ message: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });
    return res.json({
      token,
      user: {
        _id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
