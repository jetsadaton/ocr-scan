-- Users Table
CREATE TABLE USERS (
    user_id NUMBER PRIMARY KEY,
    username VARCHAR2(50) UNIQUE NOT NULL,
    password_hash VARCHAR2(255) NOT NULL,
    role VARCHAR2(20) DEFAULT 'user' NOT NULL
);

-- Document Types Table
CREATE TABLE DOCUMENT_TYPES (
    type_id NUMBER PRIMARY KEY,
    type_name VARCHAR2(100) UNIQUE NOT NULL,
    prompt CLOB -- For storing OCR extraction prompts/templates
);

-- Document Groups Table
CREATE TABLE DOCUMENT_GROUPS (
    group_id NUMBER PRIMARY KEY,
    group_name VARCHAR2(100) NOT NULL,
    created_by NUMBER,
    creation_date DATE DEFAULT SYSDATE,
    FOREIGN KEY (created_by) REFERENCES USERS(user_id)
);

-- Document Metadata Table
CREATE TABLE DOCUMENT_METADATA (
    doc_id NUMBER PRIMARY KEY,
    file_name VARCHAR2(255) NOT NULL,
    onedrive_url VARCHAR2(512) NOT NULL,
    upload_date DATE DEFAULT SYSDATE,
    status VARCHAR2(20) DEFAULT 'pending_review' NOT NULL, -- e.g., pending_review, reviewed, error, archived
    uploader_id NUMBER,
    doc_type_id NUMBER,
    group_id NUMBER,
    FOREIGN KEY (uploader_id) REFERENCES USERS(user_id),
    FOREIGN KEY (doc_type_id) REFERENCES DOCUMENT_TYPES(type_id),
    FOREIGN KEY (group_id) REFERENCES DOCUMENT_GROUPS(group_id)
);

-- Invoice Header Table
CREATE TABLE INVOICE_HEADER (
    invoice_id NUMBER PRIMARY KEY,
    doc_id NUMBER UNIQUE NOT NULL,
    invoice_number VARCHAR2(100),
    invoice_date DATE,
    company_name VARCHAR2(255),
    total_amount NUMBER(15, 2),
    tax_amount NUMBER(15, 2),
    net_amount NUMBER(15, 2),
    FOREIGN KEY (doc_id) REFERENCES DOCUMENT_METADATA(doc_id)
);

-- Invoice Line Items Table
CREATE TABLE INVOICE_LINE_ITEMS (
    item_id NUMBER PRIMARY KEY,
    invoice_id NUMBER,
    description VARCHAR2(500),
    quantity NUMBER(10, 2),
    unit_price NUMBER(15, 2),
    line_total NUMBER(15, 2),
    FOREIGN KEY (invoice_id) REFERENCES INVOICE_HEADER(invoice_id)
);

-- Create sequences for primary keys
CREATE SEQUENCE users_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE doc_types_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE doc_groups_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE doc_metadata_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE invoice_header_seq START WITH 1 INCREMENT BY 1;
CREATE SEQUENCE line_items_seq START WITH 1 INCREMENT BY 1;
