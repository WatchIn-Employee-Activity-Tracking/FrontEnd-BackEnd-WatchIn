const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.sendStatus(401); // Jika tidak ada token
    }

    jwt.verify(token, 'your-secret-key', (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.sendStatus(403); // Jika token tidak valid
        }
        req.user = user; // Simpan informasi user di objek request
        next(); // Lanjutkan ke route handler
    });
}

module.exports = { authenticateToken }; 