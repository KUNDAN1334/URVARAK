const express = require('express');
const router = express.Router();
const fertilizerRecommendationController = require('../controllers/fertilizerRecommendationController');

router.post('/recommend', fertilizerRecommendationController.getFertilizerRecommendation);

module.exports = router;
