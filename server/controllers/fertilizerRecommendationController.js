const { spawn } = require('child_process');
const path = require('path');

exports.getFertilizerRecommendation = async (req, res) => {
  try {
    const { soilInput, cropInput, weatherInput } = req.body;

    // Prepare input data for the Python script
    const inputData = JSON.stringify({
      soil: soilInput,
      crop: cropInput,
      weather: weatherInput
    });

    // Spawn a Python process to run the prediction
    const pythonProcess = spawn('python', [
      path.join(__dirname, '..', 'ai_model', 'predict.py'),
      inputData
    ]);

    let result = '';

    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python Error: ${data}`);
    });

    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        return res.status(500).json({ error: 'An error occurred while processing your request' });
      }
      const recommendation = JSON.parse(result);
      res.json({ recommendation });
    });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};
