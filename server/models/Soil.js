const mongoose = require('mongoose');

const soilSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    pH: {
      type: Number,
      required: true,
    },
    nitrogen: {
      type: Number,
      required: true,
    },
    phosphorus: {
      type: Number,
      required: true,
    },
    potassium: {
      type: Number,
      required: true,
    },
    organicMatter: {
      type: Number,
      required: true,
    },
    moisture: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Soil = mongoose.model('Soil', soilSchema);

module.exports = Soil;
