const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const SoilInput = require('../models/SoilInput');
const CropInput = require('../models/CropInput');
const WeatherInput = require('../models/WeatherInput');

require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

async function exportData() {
  try {
    const soilData = await SoilInput.find({});
    const cropData = await CropInput.find({});
    const weatherData = await WeatherInput.find({});

    const dataDir = path.join(__dirname, '..', 'ai_model', 'data');

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(path.join(dataDir, 'soil_data.json'), JSON.stringify(soilData));
    fs.writeFileSync(path.join(dataDir, 'crop_data.json'), JSON.stringify(cropData));
    fs.writeFileSync(path.join(dataDir, 'weather_data.json'), JSON.stringify(weatherData));

    console.log('Data exported successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error exporting data:', error);
    process.exit(1);
  }
}

exportData();
