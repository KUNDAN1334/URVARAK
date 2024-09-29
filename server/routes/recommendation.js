const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const Recommendation = require("../models/Recommendation");
const Soil = require("../models/Soil");
const Crop = require("../models/Crop");
const Weather = require("../models/Weather");
const {
  generateRecommendation,
  generateCalendar,
} = require("../utils/recommendationAlgorithm");

// @route   POST /api/recommendation
// @desc    Create a new recommendation
// @access  Private
router.post("/", protect, async (req, res) => {
  try {
    const { soilId, cropId, weatherId } = req.body;

    const soil = await Soil.findById(soilId);
    const crop = await Crop.findById(cropId);
    const weather = await Weather.findById(weatherId);

    if (!soil || !crop || !weather) {
      return res.status(404).json({ message: "Required data not found" });
    }

    const recommendationData = generateRecommendation(soil, crop, weather);
    const calendar = generateCalendar(crop, recommendationData);

    const recommendation = new Recommendation({
      user: req.user._id,
      soil: soilId,
      crop: cropId,
      weather: weatherId,
      ...recommendationData,
      calendar,
    });

    const createdRecommendation = await recommendation.save();
    res.status(201).json(createdRecommendation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// @route   GET /api/recommendation/latest
// @desc    Get the latest recommendation for the authenticated user
// @access  Private
router.get('/latest', protect, async (req, res) => {
  try {
    const recommendation = await Recommendation.findOne({ user: req.user._id })
      .sort({ createdAt: -1 })
      .populate('soil')
      .populate('crop')
      .populate('weather');
   
    if (!recommendation) {
      return res.status(404).json({ message: 'No recommendation found' });
    }
   
    res.json(recommendation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/recommendation/example
// @desc    Get an example recommendation
// @access  Public
router.get("/example", async (req, res) => {
  try {
    const exampleRecommendation = {
      // ... (your example recommendation object)
    };

    res.json(exampleRecommendation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
