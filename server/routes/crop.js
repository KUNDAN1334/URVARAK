const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const Crop = require('../models/Crop');

// @route   POST /api/crop
// @desc    Create a new crop record
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { name, growthStage, plantingDate, expectedHarvestDate } = req.body;

    const crop = new Crop({
      user: req.user._id,
      name,
      growthStage,
      plantingDate,
      expectedHarvestDate,
    });

    const createdCrop = await crop.save();
    res.status(201).json(createdCrop);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/crop
// @desc    Get all crop records for a user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const crops = await Crop.find({ user: req.user._id });
    res.json(crops);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/crop/:id
// @desc    Get a specific crop record
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (crop && crop.user.toString() === req.user._id.toString()) {
      res.json(crop);
    } else {
      res.status(404).json({ message: 'Crop record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/crop/:id
// @desc    Update a crop record
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { name, growthStage, plantingDate, expectedHarvestDate } = req.body;

    const crop = await Crop.findById(req.params.id);

    if (crop && crop.user.toString() === req.user._id.toString()) {
      crop.name = name || crop.name;
      crop.growthStage = growthStage || crop.growthStage;
      crop.plantingDate = plantingDate || crop.plantingDate;
      crop.expectedHarvestDate = expectedHarvestDate || crop.expectedHarvestDate;

      const updatedCrop = await crop.save();
      res.json(updatedCrop);
    } else {
      res.status(404).json({ message: 'Crop record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/crop/:id
// @desc    Delete a crop record
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (crop && crop.user.toString() === req.user._id.toString()) {
      await crop.deleteOne();  // Changed from remove() to deleteOne()
      res.json({ message: 'Crop record removed' });
    } else {
      res.status(404).json({ message: 'Crop record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
