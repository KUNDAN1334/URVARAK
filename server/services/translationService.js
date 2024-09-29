const axios = require('axios');

const translateText = async (text, targetLanguage) => {
  try {
    const apiKey = process.env.GOOGLE_TRANSLATE_API_KEY;
    const response = await axios.post(`https://translation.googleapis.com/language/translate/v2?key=${apiKey}`, {
      q: text,
      target: targetLanguage,
    });
    return response.data.data.translations[0].translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    throw error;
  }
};

module.exports = { translateText };
