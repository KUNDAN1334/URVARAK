const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const Weather = require('../models/Weather'); // Make sure this model exists

// @route   POST /api/weather
// @desc    Create a new weather record
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { temperature, humidity, rainfall, date } = req.body;

    const weather = new Weather({
      user: req.user._id,
      temperature,
      humidity,
      rainfall,
      date
    });

    const createdWeather = await weather.save();
    res.status(201).json(createdWeather);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/weather
// @desc    Get all weather records for a user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const weatherRecords = await Weather.find({ user: req.user._id });
    res.json(weatherRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
