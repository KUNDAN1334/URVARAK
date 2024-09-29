const generateRecommendation = (soil, crop, weather) => {
    let fertilizerType = '';
    let fertilizerQuantity = 0;
    let applicationMethod = '';
    let applicationTiming = '';
  
    // Determine fertilizer type based on soil nutrients
    if (soil.nitrogen < 50) {
      fertilizerType = 'Nitrogen-rich fertilizer (e.g., Urea)';
    } else if (soil.phosphorus < 30) {
      fertilizerType = 'Phosphorus-rich fertilizer (e.g., Triple Superphosphate)';
    } else if (soil.potassium < 40) {
      fertilizerType = 'Potassium-rich fertilizer (e.g., Potassium Chloride)';
    } else {
      fertilizerType = 'Balanced NPK fertilizer (e.g., 15-15-15)';
    }
  
    // Determine fertilizer quantity based on crop type and growth stage
    switch (crop.name.toLowerCase()) {
      case 'rice':
        fertilizerQuantity = crop.growthStage === 'seedling' ? 100 : 200;
        break;
      case 'wheat':
        fertilizerQuantity = crop.growthStage === 'tillering' ? 150 : 250;
        break;
      case 'corn':
        fertilizerQuantity = crop.growthStage === 'V6' ? 180 : 300;
        break;
      case 'soybean':
        fertilizerQuantity = crop.growthStage === 'V3' ? 120 : 220;
        break;
      default:
        fertilizerQuantity = 150;
    }
  
    // Adjust quantity based on soil organic matter
    if (soil.organicMatter > 3) {
      fertilizerQuantity *= 0.8; // Reduce quantity if soil is rich in organic matter
    }
  
    // Determine application method based on crop type and soil conditions
    if (['rice', 'wheat'].includes(crop.name.toLowerCase())) {
      applicationMethod = 'Broadcast application';
    } else if (soil.texture === 'sandy') {
      applicationMethod = 'Split application';
    } else {
      applicationMethod = 'Side-dressing';
    }
  
    // Determine application timing based on weather and crop stage
    if (weather.rainfall > 20) {
      applicationTiming = 'Wait for drier conditions';
    } else if (weather.temperature > 30) {
      applicationTiming = 'Apply in the early morning or late evening';
    } else if (crop.growthStage === 'flowering') {
      applicationTiming = 'Apply before flowering stage';
    } else {
      applicationTiming = 'Apply as per crop growth stage recommendations';
    }
  
    return {
      fertilizerType,
      fertilizerQuantity: Math.round(fertilizerQuantity), // Round to nearest whole number
      applicationMethod,
      applicationTiming,
    };
  };
  
  module.exports = { generateRecommendation };
  