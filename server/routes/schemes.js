const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');

// Mock data for government schemes (replace with actual data source)
const schemes = [
  {
    id: 1,
    name: 'Pradhan Mantri Fasal Bima Yojana',
    description: 'Crop insurance scheme to provide financial support to farmers suffering crop loss/damage arising out of unforeseen events.',
    eligibility: 'All farmers growing notified crops in a notified area during the season who have insurable interest in the crop are eligible.',
    benefits: 'Financial support in case of crop loss due to natural calamities, pests & diseases.',
  },
  {
    id: 2,
    name: 'Pradhan Mantri Krishi Sinchayee Yojana',
    description: 'Scheme to expand cultivable area under assured irrigation, improve on-farm water use efficiency, and introduce sustainable water conservation practices.',
    eligibility: 'All farmers are eligible, with a focus on small and marginal farmers.',
    benefits: 'Improved access to irrigation, water-use efficiency, and precision farming.',
  },
  {
    id: 3,
    name: 'Soil Health Card Scheme',
    description: 'Scheme to provide information to farmers on nutrient status of their soil along with recommendations on appropriate dosage of nutrients to be applied.',
    eligibility: 'All farmers are eligible to receive a Soil Health Card.',
    benefits: 'Promotes soil test based nutrient management, improves soil health and farm productivity.',
  },
];

// @route   GET /api/schemes
// @desc    Get all government schemes
// @access  Public
router.get('/', (req, res) => {
  res.json(schemes);
});

// @route   GET /api/schemes/:id
// @desc    Get a specific government scheme
// @access  Public
router.get('/:id', (req, res) => {
  const scheme = schemes.find(s => s.id === parseInt(req.params.id));
  if (scheme) {
    res.json(scheme);
  } else {
    res.status(404).json({ message: 'Scheme not found' });
  }
});

// @route   POST /api/schemes/recommend
// @desc    Get recommended schemes based on user data
// @access  Private
router.post('/recommend', protect, (req, res) => {
  const { cropType, landSize } = req.body;

  let recommendedSchemes = [];

  if (cropType === 'rice' || cropType === 'wheat') {
    recommendedSchemes.push(schemes[0]); // Pradhan Mantri Fasal Bima Yojana
  }

  if (landSize < 5) {
    recommendedSchemes.push(schemes[1]); // Pradhan Mantri Krishi Sinchayee Yojana
  }

  recommendedSchemes.push(schemes[2]); // Soil Health Card Scheme (recommended for all)

  res.json(recommendedSchemes);
});

module.exports = router;
