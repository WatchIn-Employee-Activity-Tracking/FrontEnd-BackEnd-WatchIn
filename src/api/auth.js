const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/database');

// Login endpoint
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Cek user di database
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        const user = users[0];

        // Verifikasi password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
            return res.status(401).json({ message: 'Email atau password salah' });
        }

        // Buat token
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            'your-secret-key', // Ganti dengan secret key yang aman
            { expiresIn: '24h' }
        );

        // Kirim response
        res.json({
            token,
            user: {
                id: user.id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// Register endpoint
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Cek apakah email sudah terdaftar
        const [existingUsers] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(400).json({ message: 'Email sudah terdaftar' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user baru
        const [result] = await pool.execute(
            'INSERT INTO users (first_name, last_name, email, password, role) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword, 'employee']
        );

        res.status(201).json({ message: 'Registrasi berhasil' });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// Check email endpoint for password reset
router.post('/check-email', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if email exists in database
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ?',
            [email]
        );

        if (users.length === 0) {
            return res.status(404).json({ message: 'Email tidak ditemukan' });
        }

        // Generate a temporary token for password reset
        const resetToken = jwt.sign(
            { userId: users[0].id },
            'your-secret-key', // Use the same secret key as login
            { expiresIn: '1h' }
        );

        // Store the reset token in the database
        await pool.execute(
            'UPDATE users SET reset_token = ?, reset_token_expires = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id = ?',
            [resetToken, users[0].id]
        );

        res.json({ 
            message: 'Email ditemukan',
            resetToken 
        });
    } catch (error) {
        console.error('Check email error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// Reset password endpoint
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        console.log('[RESET PASSWORD] Received token:', token);
        console.log('[RESET PASSWORD] Received newPassword:', newPassword);

        // Verify token
        let decoded;
        try {
            decoded = jwt.verify(token, 'your-secret-key');
            console.log('[RESET PASSWORD] JWT decoded:', decoded);
        } catch (err) {
            console.error('[RESET PASSWORD] JWT verify error:', err);
            return res.status(400).json({ message: 'Token tidak valid atau sudah kadaluarsa (JWT error)' });
        }
        console.log('[RESET PASSWORD] Decoded userId:', decoded.userId);

        // Check if token exists and is not expired
        const [users] = await pool.execute(
            'SELECT * FROM users WHERE id = ? AND reset_token = ? AND reset_token_expires > NOW()',
            [decoded.userId, token]
        );
        console.log('[RESET PASSWORD] User found:', users.length);
        if (users.length === 0) {
            console.error('[RESET PASSWORD] No user found with valid token and expiry.');
            return res.status(400).json({ message: 'Token tidak valid atau sudah kadaluarsa (DB check)' });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        console.log('[RESET PASSWORD] Password hashed.');

        // Update password and clear reset token
        await pool.execute(
            'UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?',
            [hashedPassword, decoded.userId]
        );
        console.log('[RESET PASSWORD] Password updated and token cleared for userId:', decoded.userId);

        res.json({ message: 'Password berhasil diubah' });
        console.log('[RESET PASSWORD] Success response sent.');
    } catch (error) {
        console.error('[RESET PASSWORD] General error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// Get total employees count endpoint
router.get('/total-employees', async (req, res) => {
    try {
        const [result] = await pool.execute(
            'SELECT COUNT(*) as total FROM users WHERE role = ?',
            ['employee']
        );
        res.json({ total: result[0].total });
    } catch (error) {
        console.error('Get total employees error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// Endpoint untuk mengambil semua user (kecuali admin)
router.get('/users', async (req, res) => {
    try {
        const [users] = await pool.execute(
            'SELECT id, first_name, last_name, email, role FROM users WHERE role != ?',
            ['admin']
        );
        res.json(users);
    } catch (error) {
        console.error('Get users error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server' });
    }
});

// Endpoint untuk menghapus user berdasarkan id
router.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    if (!userId || isNaN(userId)) {
        return res.status(400).json({ message: 'ID user tidak valid' });
    }
    const conn = await pool.getConnection();
    try {
        await conn.beginTransaction();
        // Hapus semua log milik user ini
        await conn.execute('DELETE FROM capture_logs WHERE user_id = ?', [userId]);
        // Hapus user
        const [result] = await conn.execute('DELETE FROM users WHERE id = ?', [userId]);
        if (result.affectedRows === 0) {
            await conn.rollback();
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }
        await conn.commit();
        res.json({ message: 'User dan log berhasil dihapus' });
    } catch (error) {
        await conn.rollback();
        console.error('Delete user error:', error);
        res.status(500).json({ message: 'Terjadi kesalahan server', error: error.message });
    } finally {
        conn.release();
    }
});

module.exports = router; 