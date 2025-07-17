"use client";

import { useState } from 'react';
import { Button, Container, Typography, Box, TextField, Paper } from '@mui/material';

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [ocrResult, setOcrResult] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(event.target.files);
  };

  const handleUpload = async () => {
    if (!selectedFiles) {
      alert('Please select files to upload.');
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append('invoices', selectedFiles[i]);
    }

    try {
      // Replace with your actual backend API endpoint
      const response = await fetch('http://localhost:3001/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const result = await response.json();
      setOcrResult(result);
    } catch (error) {
      console.error('Error uploading files:', error);
      alert('Error uploading files. See console for details.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          OCR Invoice Processing
        </Typography>

        <Paper elevation={3} sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6">1. Upload Invoices</Typography>
          <Box sx={{ mt: 2 }}>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/png, image/jpeg, application/pdf"
              style={{ display: 'none' }}
              id="file-upload"
            />
            <label htmlFor="file-upload">
              <Button variant="contained" component="span">
                Choose Files
              </Button>
            </label>
            {selectedFiles && (
              <Typography sx={{ display: 'inline', ml: 2 }}>
                {selectedFiles.length} file(s) selected
              </Typography>
            )}
          </Box>
          <Box sx={{ mt: 2 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={!selectedFiles || isLoading}
            >
              {isLoading ? 'Processing...' : 'Upload & Process'}
            </Button>
          </Box>
        </Paper>

        {ocrResult && (
          <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6">2. Review Extracted Data</Typography>
            <Box component="form" noValidate autoComplete="off" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                label="Invoice Number"
                defaultValue={ocrResult.data?.invoice_number || ''}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Invoice Date"
                defaultValue={ocrResult.data?.invoice_date || ''}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                label="Total Amount"
                defaultValue={ocrResult.data?.total_amount || ''}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                multiline
                rows={10}
                label="Raw Text"
                defaultValue={ocrResult.data?.raw_text || ''}
                variant="outlined"
                sx={{ mb: 2 }}
              />
              <Button variant="contained" color="success">
                Save Corrected Data
              </Button>
            </Box>
          </Paper>
        )}
      </Box>
    </Container>
  );
}
