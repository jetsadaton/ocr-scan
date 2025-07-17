require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage: storage });

// Routes
app.get('/', (req, res) => {
  res.send('OCR Invoice Backend is running!');
});

const testRoutes = require('./src/routes/test');
app.use('/api', testRoutes);

const ocrRoutes = require('./src/routes/ocr');
app.use('/api', ocrRoutes);

const ocrService = require('./src/services/ocrService');

app.post('/api/upload', upload.array('invoices'), async (req, res) => {
    if (!req.files || req.files.length === 0) {
        return res.status(400).send('No files uploaded.');
    }

    try {
        const results = [];
        for (const file of req.files) {
            console.log(`Processing file: ${file.path}`);
            const prompt = 'Extract invoice details'; // A generic prompt
            // In a real scenario, the OCR service would process the file at file.path
            // For now, we'll use the mock implementation from ocrService.
            const data = await ocrService.extractInvoiceData(file.path, prompt);
            results.push({
                fileName: file.originalname,
                ocrData: data
            });
        }
        // For simplicity, we send back the result of the first file.
        // A real app might handle multiple results differently.
        res.json({ message: 'Files processed successfully', data: results[0]?.ocrData });
    } catch (err) {
        console.error('Error during file processing:', err);
        res.status(500).send('Error processing files.');
    }
});

// Database connection and server listening
const port = process.env.PORT || 3001;

const database = require('./src/config/database');

// This is a placeholder for the database connection logic
// We will replace this with the actual Oracle DB connection later
const startServer = async () => {
    try {
        await database.initialize();
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

startServer();

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    await database.close();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT signal received: closing HTTP server');
    await database.close();
    process.exit(0);
});
