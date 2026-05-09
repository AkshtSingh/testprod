require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { errorMiddleware } = require('./utils/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/tasks', taskRoutes);

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware
app.use(errorMiddleware);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
