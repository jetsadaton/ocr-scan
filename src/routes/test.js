const express = require('express');
const router = express.Router();
const db = require('../config/database');

router.get('/test', async (req, res) => {
    try {
        const result = await db.simpleExecute('SELECT 1 FROM DUAL');
        res.json({ message: 'Database connection successful', data: result.rows });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database connection failed' });
    }
});

module.exports = router;
