const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const fertilizerRoutes = require('./routes/fertilizerRoutes');
const profileRoutes = require('./routes/profile');



// Load environment variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/soil', require('./routes/soil'));
app.use('/api/crop', require('./routes/crop'));
app.use('/api/weather', require('./routes/weather'));
app.use('/api/recommendation', require('./routes/recommendation'));
app.use('/api/experience', require('./routes/experience'));
app.use('/api/schemes', require('./routes/schemes'));
app.use('/api/fertilizer', fertilizerRoutes);
app.use('/api/profile', profileRoutes);

// Add this before your routes
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});



// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
