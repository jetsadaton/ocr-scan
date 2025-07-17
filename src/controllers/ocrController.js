const ocrService = require('../services/ocrService');

async function testOcr(req, res) {
    try {
        // In a real scenario, you'd get the file path from the request,
        // which would be uploaded via a form.
        // For this test, we'll use a placeholder path.
        const filePath = 'path/to/a/sample-invoice.png'; // Placeholder
        const prompt = 'Extract invoice number, date, and total amount.'; // Example prompt

        // Simulate a file not found error for testing
        if (!require('fs').existsSync(filePath)) {
            // A real implementation would handle file uploads properly.
            // Here, we just return a sample response.
            console.warn(`File not found at placeholder path: ${filePath}. Returning mock data.`);
            return res.json({
                message: 'OCR service test (mock response)',
                data: {
                    invoice_number: 'INV-MOCK-123',
                    invoice_date: '2023-10-27',
                    total_amount: 1500.00,
                    raw_text: 'This is a mock response because the file was not found.'
                }
            });
        }

        const data = await ocrService.extractInvoiceData(filePath, prompt);
        res.json({ message: 'OCR service test successful', data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to process image with OCR' });
    }
}

module.exports = {
    testOcr
};
