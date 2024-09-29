const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const Soil = require('../models/Soil');

// @route   POST /api/soil
// @desc    Create a new soil record
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { pH, nitrogen, phosphorus, potassium, organicMatter, moisture } = req.body;

    const soil = new Soil({
      user: req.user._id,
      pH,
      nitrogen,
      phosphorus,
      potassium,
      organicMatter,
      moisture,
    });

    const createdSoil = await soil.save();
    res.status(201).json(createdSoil);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/soil
// @desc    Get all soil records for a user
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const soils = await Soil.find({ user: req.user._id });
    res.json(soils);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/soil/:id
// @desc    Get a specific soil record
// @access  Private
router.get('/:id', protect, async (req, res) => {
  try {
    const soil = await Soil.findById(req.params.id);

    if (soil && soil.user.toString() === req.user._id.toString()) {
      res.json(soil);
    } else {
      res.status(404).json({ message: 'Soil record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/soil/:id
// @desc    Update a soil record
// @access  Private
router.put('/:id', protect, async (req, res) => {
  try {
    const { pH, nitrogen, phosphorus, potassium, organicMatter, moisture } = req.body;

    const soil = await Soil.findById(req.params.id);

    if (soil && soil.user.toString() === req.user._id.toString()) {
      soil.pH = pH || soil.pH;
      soil.nitrogen = nitrogen || soil.nitrogen;
      soil.phosphorus = phosphorus || soil.phosphorus;
      soil.potassium = potassium || soil.potassium;
      soil.organicMatter = organicMatter || soil.organicMatter;
      soil.moisture = moisture || soil.moisture;

      const updatedSoil = await soil.save();
      res.json(updatedSoil);
    } else {
      res.status(404).json({ message: 'Soil record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/soil/:id
// @desc    Delete a soil record
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const soil = await Soil.findById(req.params.id);

    if (soil && soil.user.toString() === req.user._id.toString()) {
      await soil.deleteOne();  // Changed from remove() to deleteOne()
      res.json({ message: 'Soil record removed' });
    } else {
      res.status(404).json({ message: 'Soil record not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
