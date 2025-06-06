const authRoutes = require('./routes/authRoutes');
const captureLogsRoutes = require('./routes/captureLogsRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/capture-logs', captureLogsRoutes); 