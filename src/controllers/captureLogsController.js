const pool = require('../config/database');

async function saveCaptureLog(req, res) {
    try {
        console.log('Received capture log request body:', req.body); // Log incoming body

        const {
            user_id,
            image_data,
            capture_time,
            warning_count,
            eye_status,
            closed_duration,
            open_duration
        } = req.body;

        // Validate required fields
        if (!user_id || !image_data || !capture_time || !warning_count || !eye_status) {
            console.error('Missing required fields in capture log request'); // Log missing fields
            return res.status(400).json({
                status: 'error',
                message: 'Missing required fields'
            });
        }

        // Decode base64 image data
        const base64Data = image_data.replace(/^data:image\/jpeg;base64,/, '');
        const binaryImageData = Buffer.from(base64Data, 'base64');

        // Insert into database
        const [result] = await pool.execute(
            `INSERT INTO capture_logs 
            (user_id, image_data, capture_time, warning_count, eye_status, closed_duration, open_duration)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [user_id, binaryImageData, capture_time, warning_count, eye_status, closed_duration, open_duration]
        );

        console.log('Capture log saved successfully with ID:', result.insertId); // Log successful insertion

        res.status(201).json({
            status: 'success',
            message: 'Capture log saved successfully',
            data: {
                id: result.insertId
            }
        });
    } catch (error) {
        console.error('Error saving capture log:', error); // Keep existing error log
        res.status(500).json({
            status: 'error',
            message: 'Failed to save capture log'
        });
    }
}

async function getCaptureLogs(req, res) {
    try {
        const userId = req.user.id; // Assuming you have user info in req.user from auth middleware

        const [logs] = await pool.execute(
            `SELECT id, capture_time, warning_count, eye_status, closed_duration, open_duration, created_at
            FROM capture_logs
            WHERE user_id = ?
            ORDER BY capture_time DESC
            LIMIT 50`,
            [userId]
        );

        res.json({
            status: 'success',
            data: logs
        });
    } catch (error) {
        console.error('Error fetching capture logs:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch capture logs'
        });
    }
}

async function getCaptureImage(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const [rows] = await pool.execute(
            `SELECT image_data
            FROM capture_logs
            WHERE id = ? AND user_id = ?`,
            [id, userId]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                status: 'error',
                message: 'Image not found'
            });
        }

        // Send the image data
        res.json({
            status: 'success',
            data: {
                image_data: rows[0].image_data
            }
        });
    } catch (error) {
        console.error('Error fetching capture image:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch capture image'
        });
    }
}

module.exports = {
    saveCaptureLog,
    getCaptureLogs,
    getCaptureImage
}; 