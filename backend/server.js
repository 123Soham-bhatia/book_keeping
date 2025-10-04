const express = require('express');
const cors = require('cors');
const dbconnect = require('./Config/database'); // Adjust path if your dbconnect is in config/db.js

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ 
  origin: ['http://localhost:3000', 'https://your-frontend.vercel.app'], // Local + deployed frontend; update as needed
  credentials: true 
}));

// Database connection
dbconnect();

// Routes
app.use('/api/auth', require('./routes/authRoutes')); // Signup/Login
app.use('/api/books', require('./routes/bookRoutes')); // Add/Update books (or bookRoutes.js)
app.use('/api/reviews', require('./routes/reviewRoutes')); // Reviews

// Global error handler (catches 404s and server errors)
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  res.status(status).json({
    message: error.message || 'Server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing if needed