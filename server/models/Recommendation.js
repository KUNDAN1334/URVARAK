const mongoose = require('mongoose');

const RecommendationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  soil: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Soil',
    required: true,
  },
  crop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },
  weather: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weather',
    required: true,
  },
  fertilizer: {
    type: String,
    amount: String,
    application: String,
  },
  irrigation: {
    method: String,
    frequency: String,
    amount: String,
  },
  calendar: [
    {
      date: Date,
      action: String,
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model('Recommendation', RecommendationSchema);
