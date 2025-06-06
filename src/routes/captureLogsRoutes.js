const express = require('express');
const router = express.Router();
const { saveCaptureLog, getCaptureLogs, getCaptureImage } = require('../controllers/captureLogsController');
const { authenticateToken } = require('../middleware/auth');

// All routes require authentication
router.use(authenticateToken);

// Save new capture log
router.post('/', saveCaptureLog);

// Get capture logs for the authenticated user
router.get('/', getCaptureLogs);

// Get specific capture image
router.get('/:id/image', getCaptureImage);

module.exports = router; 