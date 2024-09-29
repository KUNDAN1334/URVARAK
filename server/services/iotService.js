const axios = require('axios');

const fetchIoTData = async (deviceId) => {
  try {
    // This is a mock API call. Replace with actual IoT device API
    const response = await axios.get(`https://api.iotdevice.com/data/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching IoT data:', error);
    throw error;
  }
};

module.exports = { fetchIoTData };
