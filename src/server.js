const express = require('express');
const cors = require('cors');
const authRoutes = require('./api/auth');
const captureLogsRoutes = require('./routes/captureLogsRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/capture-logs', captureLogsRoutes);

// Serve static files
app.use(express.static('public'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server berjalan di port ${PORT}`);
}); 