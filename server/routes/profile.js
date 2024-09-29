const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   GET api/profile
// @desc    Get user profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    const profile = {
      name: user.name,
      email: user.email,
      location: user.location || '',
      farmSize: user.farmSize || '',
      preferredCrops: user.preferredCrops || []
    };

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/profile
// @desc    Update user profile
// @access  Private
router.put('/', auth, async (req, res) => {
  const { name, email, location, farmSize, preferredCrops } = req.body;

  try {
    let user = await User.findById(req.user.id);
    if (!user) {
      return res.status(400).json({ msg: 'User not found' });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.location = location || user.location;
    user.farmSize = farmSize || user.farmSize;
    user.preferredCrops = preferredCrops || user.preferredCrops;

    await user.save();

    res.json({
      name: user.name,
      email: user.email,
      location: user.location,
      farmSize: user.farmSize,
      preferredCrops: user.preferredCrops
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

