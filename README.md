# Twitter Clone

A full-stack Twitter Clone built with React, NestJS, MariaDB, Redis, and Cloudinary. The application provides secure authentication, tweet management, media uploads, and user interaction features similar to Twitter.

## Features

* User Registration & Login
* JWT Authentication
* Email OTP Verification
* Create, Update, and Delete Tweets
* Image Uploads with Cloudinary
* User Profile Management
* Secure Password Hashing
* RESTful API Architecture
* Redis-based OTP Storage

## Tech Stack

### Frontend

* React.js
* TypeScript
* Tailwind CSS
* Axios
* Formik

### Backend

* NestJS
* TypeScript
* TypeORM
* MariaDB
* Redis
* JWT Authentication

### Cloud Services

* Cloudinary

## Project Structure

```text
Twitter Clone
├── frontend
└── backend
```

## Installation

### Backend

```bash
cd backend
npm install
npm run start:dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the backend directory and configure:

```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

REDIS_HOST=
REDIS_PORT=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## Future Improvements

* Like & Unlike Tweets
* Follow/Unfollow Users
* Comments & Replies
* Real-time Notifications
* Direct Messaging

## Author

Mohd Uvaish
