require('dotenv').config();
const express = require('express');
const cors = require('cors');

const connectDB = require('./src/config/db');
const studentRoutes = require('./src/routes/students');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// health check
app.get('/api/health', (req, res) => {
  res.json({ message: "Backend is working!" });
});

// ⭐ IMPORTANT: mount students route
app.use('/api/students', studentRoutes);

// start server
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
