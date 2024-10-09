# Assignment_Submission_Portal

This is a backend for Assignment Submission Portal where users can upload their assignments, and admins can approve or reject them.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rajeshCreate72/assignment-submission-portal.git

2. Navigate to project directory
   ```bash
   cd assignment-submission-portal
3. Install dependencies
   ```bash
   npm install

4. Setup environment variables
   a. create ```.env``` in root directory add
   ```bash
   JWT_SECRET=your_sercret_key
   DB_URI=uri_to_database
   PORT=port_appliction_running_at

## Usage

1. Start the server:
   ```bash
   npm start

2. Application will be running at ```http://localhost:8000```

## API Endpoints

### Base Endpoint
For User - ```/api/v1/user``` \
For Admin - ```/api/v1/admin```

- **User Endpoints:**
  - `POST /register`: Register a new user.
  - `POST /login`: User login.
  - `POST /upload`: Upload an assignment.
  - `GET /admins`: To get all the admins.

- **Admin Endpoints:**
  - `POST /register`: Register a new admin.
  - `POST /login`: Admin login.
  - `GET /assignments`: View assignments tagged to the admin.
  - `POST /assignments/:id/accept`: To accept the assignments.
  - `POST /assignment/:id/reject`:  To reject the assignments.
  - `POST /:id/approve`: To approve the admin access.
