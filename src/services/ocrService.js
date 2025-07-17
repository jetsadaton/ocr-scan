const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient({
    // keyFilename: 'path/to/your/credentials.json'
    // In a real application, you would uncomment and provide the path to your service account key file.
    // For this example, we assume the environment is already authenticated.
});

async function extractTextFromImage(filePath) {
    try {
        const [result] = await client.documentTextDetection(filePath);
        const fullTextAnnotation = result.fullTextAnnotation;
        return fullTextAnnotation.text;
    } catch (err) {
        console.error('ERROR:', err);
        throw err;
    }
}

async function extractInvoiceData(filePath, prompt) {
    // This is a simplified example. In a real-world scenario, you would
    // use a more sophisticated approach, possibly involving a custom model
    // or more advanced features of the Vision API. The 'prompt' here is
    // a conceptual placeholder for how you might guide the extraction.

    console.log(`Processing invoice with prompt: ${prompt}`);

    // For this example, we'll just extract all text.
    // A real implementation would involve parsing this text based on the prompt
    // to find specific fields like invoice number, date, total amount, etc.
    const extractedText = await extractTextFromImage(filePath);

    // Placeholder for data extraction logic based on the prompt
    const extractedData = {
        invoice_number: 'INV-123', // dummy data
        invoice_date: '2023-10-27', // dummy data
        total_amount: 1500.00, // dummy data
        raw_text: extractedText
    };

    return extractedData;
}

module.exports = {
    extractTextFromImage,
    extractInvoiceData
};
