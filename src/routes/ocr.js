const express = require('express');
const router = express.Router();
const ocrController = require('../controllers/ocrController');

router.get('/ocr/test', ocrController.testOcr);

module.exports = router;
