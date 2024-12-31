const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Public route: Register consumer users
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    // By default, new user is 'consumer'
    user = new User({ email, password, role: 'consumer' });
    await user.save();
    return res.status(201).json({ message: 'User created' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Public route: Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// Example protected route to create "creator" user (admin usage)
router.post('/create-creator', async (req, res) => {
  try {
    // In real scenario, you'd verify if the requester is an admin
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: 'User already exists' });

    user = new User({ email, password, role: 'creator' });
    await user.save();
    return res.status(201).json({ message: 'Creator account created' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
