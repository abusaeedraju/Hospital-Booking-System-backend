# 🏥 Hospital Booking System Backend

This is the backend for the **Hospital Booking System**, a RESTful API built with Node.js,
Express, and MongoDB. It allows users to register, log in, book appointments,
and for admins to manage doctors, schedules, and hospital services.

## 🚀 Features

- JWT-based Authentication
- User roles: Admin, Doctor, Patient
- Doctor Duty Scheduling
- Appointment Booking
- Service Management (Add/Update/Delete)
- OTP Verification (Email-based)
- Secure password hashing with bcrypt
- Global Error Handling
- Token handling via Cookie or Header


API Endpoints (Examples)


Auth

POST /api/auth/register

POST /api/auth/login

POST /api/auth/logout



Admin

POST /api/admin/doctor — Add a doctor

PATCH /api/admin/doctor/:id — Update doctor

DELETE /api/admin/doctor/:id — Delete doctor

POST /api/admin/service — Add service



Appointment

POST /api/appointment/book — Book an appointment



OTP

POST /api/otp/send

POST /api/otp/verify

🔐 Security
Passwords are hashed using bcrypt.

Token is stored in cookies or Authorization header.

Routes are protected using middleware (isLoggedIn, isAdmin, etc.)



## 🛠️ Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- bcrypt
- dotenv
- nodemailer

## ⚙️ Environment Variables

Create a `.env` file in the root and add:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password_or_app_password


