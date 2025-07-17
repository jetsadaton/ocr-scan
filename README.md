# OCR Invoice Processing System

This is a full-stack web application for processing invoices using OCR technology. The system allows users to upload invoice documents, extract data using an AI-powered OCR service, review and edit the extracted data, and store it in an Oracle database.

## Features

- **Document Upload**: Supports multiple file uploads (PDF, JPG, PNG).
- **AI-Powered OCR**: Extracts data from invoices using Google Cloud Vision AI (or other configurable OCR services).
- **Data Review & Correction**: A user-friendly interface to review and edit the extracted data.
- **Oracle Database Integration**: Stores invoice data in an Oracle 11g database using raw SQL queries.
- **Automation API**: Provides an API endpoint for external systems (like n8n) to ingest invoice data.
- **Document Grouping**: Allows users to group related invoice documents.

## Tech Stack

- **Frontend**: Next.js, React, Material-UI (MUI)
- **Backend**: Node.js, Express.js
- **Database**: Oracle 11g
- **OCR**: Google Cloud Vision AI (can be substituted)
- **File Storage**: Local `uploads` folder (can be integrated with OneDrive)

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm
- Oracle 11g Database
- Access to a Google Cloud Platform project with Vision AI enabled (or another OCR service)

### Backend Setup

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure environment variables:**
    Create a `.env` file in the root directory and add the following:
    ```
    PORT=3001
    DB_USER=your_username
    DB_PASSWORD=your_password
    DB_CONNECT_STRING=localhost/orcl
    # GOOGLE_APPLICATION_CREDENTIALS=path/to/your/gcp-credentials.json
    ```

4.  **Set up the database:**
    Connect to your Oracle database and run the script in `database.sql` to create the necessary tables and sequences.

5.  **Start the backend server:**
    ```bash
    npm start
    ```
    The server will be running on `http://localhost:3001`.

### Frontend Setup

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Start the frontend development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:3000`.

## API Documentation

(This section would be expanded with detailed API endpoint documentation.)

### `POST /api/upload`

-   **Description**: Uploads one or more invoice files for processing.
-   **Request**: `multipart/form-data` with a field `invoices` containing the file(s).
-   **Response**: JSON object with the extracted data.

### `GET /api/test`

-   **Description**: Tests the database connection.
-   **Response**: JSON object confirming the connection status.

## Deployment

(This section would provide instructions for deploying the application to a production environment, including building the Next.js app and running the Node.js server with a process manager like PM2.)
