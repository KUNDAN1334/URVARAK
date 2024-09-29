const franc = require('franc');

const detectLanguage = (req, res, next) => {
  const text = req.body.text || req.query.text;
  if (text) {
    const detectedLang = franc(text);
    req.detectedLanguage = detectedLang;
  }
  next();
};

module.exports = { detectLanguage };
