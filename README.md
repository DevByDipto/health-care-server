# 🏥 Health Care Server

A **Node.js + Express** backend server for a Health Care Management System, designed to handle patient data, appointments, doctors, and medical records. It uses **PostgreSQL** for data storage, JWT for secure authentication and  AI-driven doctor suggestions based on patient symptoms. 

---

## 📖 Table of Contents

- [live-link](https://health-care-server-self.vercel.app)


---

## Project Overview

This backend powers a Health Care Management System. Key roles include **Admin**, **Doctor**, and **Patient**. The APIs allow for managing:

- Patients (create, update, read)  
- Doctors (profile, availability)  
- Appointments (booking, canceling)  
- Medical Records (upload, fetch)  
- Authentication & Authorization  

---

## Features

- ✅ OpenAI Integration for AI-driven doctor suggestions based on patient symptoms
- ✅ Stripe Payment System for handling payments securely  
- ✅ JWT-based Authentication  
- ✅ Role-Based Access Control (Admin, Doctor, Patient)  
- ✅ CRUD Operations: Patients, Doctors, Appointments, Records
- ✅ Cloudinary File Upload System for storing medical reports, doctor images, and other files  
- ✅ Nodemailer integration for password reset and email notifications   
- ✅ Secure Password Hashing  
- ✅ Error Handling Middleware  
- ✅ Logging & Validation  
- ✅ Environment-based Configuration  

---

## Tech Stack

- **Backend**: Node.js, Express.js  
- **Database**: Posgresql 
- **Authentication**: JWT  
- **Language**: TypeScript 

---

## Folder Structure

```text
src/
├── middlewares/
│   ├── auth.ts              # JWT auth middleware  
│   └── globalErrorHandler.ts      # Global error handler
│   └── notFound.ts
│   └── globalErrorHandler.ts
├── modules/
│   ├── auth/                 # login/signup  
│   ├── patient/              # patient management  
│   ├── doctor/               # doctor management
│   ├── addmin/               # addmin management 
│   └── appointment/          # appointment management  
│   └── doctorSchedule/       # doctorSchedule management  
│   └── meta/                 # meta management  
│   └── patient/              # patient management  
│   └── payment/              # payment management  
│   └── review/               # review management  
│   └── schedule/             # schedule management  
│   └── specialties/          # specialties management  
│   └── prescription/         # prescription management  
│   └── user/                 # user management  
├── shared/
│   ├── catchAsync.ts           
│   ├── prisma.ts           
│   ├── sendResponse.ts
├── helper/
│   ├── extractJsonFromMessage.ts 
│   ├── fileUploader.ts 
│   ├── generateUUID.ts 
│   ├── jwtHelper.ts 
│   ├── open-router.ts 
│   ├── paginationHelper.ts 
│   ├── pick.ts 
│   ├── setCookie.ts 
│   ├── strip.ts 
├── server.ts                   # App entry  
└── app.ts                      # Express setup

```
<h2>📬 API Endpoints</h2>
 
<h3>🛠️ Admin Routes</h3> 
<table border="1" cellpadding="5" cellspacing="0">
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/admin/</td> <td>Get all admins</td> <td>✅</td> <td>ADMIN</td> </tr> 
  <tr> <td>GET</td> <td>/api/v1/admin/:id</td> <td>Get admin by ID</td> <td>✅</td> <td>ADMIN</td> </tr>
  <tr> <td>PATCH</td> <td>/api/v1/admin/:id</td> <td>Update admin information</td> <td>✅</td> <td>ADMIN</td> </tr>
  <tr> <td>DELETE</td> <td>/api/v1/admin/:id</td> <td>Hard delete admin</td> <td>✅</td> <td>ADMIN</td> </tr>
  <tr> <td>DELETE</td> <td>/api/v1/admin/soft/:id</td> <td>Soft delete admin</td> <td>✅</td> <td>ADMIN</td> </tr> 
</table>

<h3>🛠️ Doctor Routes</h3> 
<table border="1" cellpadding="5" cellspacing="0"> 
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/doctor/</td> <td>Get all doctors</td> <td>❌</td> <td>—</td> </tr> 
  <tr> <td>PATCH</td> <td>/api/v1/doctor/:id</td> <td>Update doctor information</td> <td>✅</td> <td>DOCTOR,ADMIN</td> </tr>
  <tr> <td>POST</td> <td>/api/v1/doctor/suggestion</td> <td>Get AI-based doctor suggestions</td> <td>❌</td> <td>—</td> </tr>
  <tr> <td>GET</td> <td>/api/v1/doctor/:id</td> <td>Get doctor by ID</td> <td>❌</td> <td>—</td> </tr>
  <tr> <td>DELETE</td> <td>/api/v1/doctor/:id</td> <td>Hard delete doctor</td> <td>✅</td> <td>ADMIN</td> </tr>
  <tr> <td>DELETE</td> <td>/api/v1/doctor/soft/:id</td> <td>Soft delete doctor</td> <td>✅</td> <td>ADMIN</td> </tr>
</table>

<h3>🛠️ Doctor Schedule Routes</h3> 
<table border="1" cellpadding="5" cellspacing="0">
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/doctor-schedule/</td> <td>Get all doctor schedules</td> <td>✅</td> <td>ADMIN, DOCTOR, PATIENT</td> </tr>
  <tr> <td>GET</td> <td>/api/v1/doctor-schedule/my-schedule</td> <td>Get logged-in doctor’s own schedule</td> <td>✅</td> <td>DOCTOR</td> </tr>
  <tr> <td>POST</td> <td>/api/v1/doctor-schedule/</td> <td>Create a new doctor schedule</td> <td>✅</td> <td>DOCTOR</td> </tr>
  <tr> <td>DELETE</td> <td>/api/v1/doctor-schedule/:id</td> <td>Delete a doctor schedule</td> <td>✅</td> <td>DOCTOR</td> </tr>
</table>

<h3>🛠️ User Routes</h3> 
<table border="1" cellpadding="5" cellspacing="0"> 
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/user/</td> <td>Get all users</td> <td>✅</td> <td>ADMIN</td> </tr>
  <tr> <td>GET</td> <td>/api/v1/user/me</td> <td>Get logged-in user profile</td> <td>✅</td> <td>ADMIN, DOCTOR, PATIENT</td> </tr>
  <tr> <td>POST</td> <td>/api/v1/user/create-patient</td> <td>Create a new patient</td> <td>❌</td> <td>—</td> </tr>
  <tr> <td>POST</td> <td>/api/v1/user/create-admin</td> <td>Create a new admin</td> <td>✅</td> <td>ADMIN</td> </tr>
  <tr> <td>POST</td> <td>/api/v1/user/create-doctor</td> <td>Create a new doctor</td> <td>✅</td> <td>ADMIN</td> </tr>
  <tr> <td>PATCH</td> <td>/api/v1/user/:id/status</td> <td>Change user profile status</td> <td>✅</td> <td>ADMIN</td> </tr>
  <tr> <td>PATCH</td> <td>/api/v1/user/update-my-profile</td> <td>Update logged-in user profile</td> <td>✅</td> <td>ADMIN, DOCTOR, PATIENT</td> </tr>
</table>

<h3>🛠️ Patient Routes</h3> 
<table border="1" cellpadding="5" cellspacing="0"> 
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/patient/</td> <td>Get all patients</td> <td>❌</td> <td>—</td> </tr>
  <tr> <td>GET</td> <td>/api/v1/patient/:id</td> <td>Get patient by ID</td> <td>❌</td> <td>—</td> </tr>
  <tr> <td>PATCH</td> <td>/api/v1/patient/</td> <td>Update patient information</td> <td>✅</td> <td>PATIENT</td> </tr>
  <tr> <td>DELETE</td> <td>/api/v1/patient/soft/:id</td> <td>Soft delete patient</td> <td>❌</td> <td>—</td> </tr>
</table>

<h3>🛠️ Prescription Routes</h3> 
<table border="1" cellpadding="5" cellspacing="0"> 
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/prescription/my-prescription</td> <td>Get prescriptions for logged-in patient</td> <td>✅</td> <td>PATIENT</td> </tr>
  <tr> <td>POST</td> <td>/api/v1/prescription/</td> <td>Create a new prescription</td> <td>✅</td> <td>DOCTOR</td> </tr>
</table>

<h3>🛠️ Schedule Routes</h3>
<table border="1" cellpadding="5" cellspacing="0">
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/schedule/</td> <td>Get schedules for logged-in doctor</td> <td>✅</td> <td>DOCTOR</td> </tr>
  <tr> <td>POST</td> <td>/api/v1/schedule/</td> <td>Create a new schedule</td> <td>✅</td> <td>ADMIN</td> </tr>
  <tr> <td>DELETE</td> <td>/api/v1/schedule/:id</td> <td>Delete a schedule</td> <td>✅</td> <td>ADMIN</td> </tr>
</table>

<h3>🛠️ Specialties Routes</h3> 
<table border="1" cellpadding="5" cellspacing="0"> 
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/specialties/</td> <td>Get all specialties</td> <td>❌</td> <td>—</td> </tr>
  <tr> <td>POST</td> <td>/api/v1/specialties/</td> <td>Create a new specialty (with file upload)</td> <td>❌</td> <td>—</td> </tr>
  <tr> <td>DELETE</td> <td>/api/v1/specialties/:id</td> <td>Delete a specialty by ID</td> <td>✅</td> <td>ADMIN</td> </tr>
</table>

<h3>🛠️ Meta Routes</h3> 
<table border="1" cellpadding="5" cellspacing="0"> 
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/meta/</td> <td>Fetch dashboard meta data</td> <td>✅</td> <td>ADMIN, DOCTOR, PATIENT</td> </tr>
</table>

<h3>🛠️ Review Routes</h3> 
<table border="1" cellpadding="5" cellspacing="0"> 
  <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr>
  <tr> <td>GET</td> <td>/api/v1/review/</td> <td>Get all reviews</td> <td>❌</td> <td>—</td> </tr>
  <tr> <td>POST</td> <td>/api/v1/review/</td> <td>Create a new review</td> <td>✅</td> <td>PATIENT</td> </tr>
</table>


### Setup instructions
#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/ride-booking-backend.git
cd ride-booking-backend
```
#### 2️⃣ Install Dependencies
```bash
npm install
```
#### 3️⃣ Configure Environment Variables
```
# DATABASE
DATABASE_URL=postgresql://postgres:password@localhost:5432/your_database?schema=public

# APP CONFIG
NODE_ENV=production
PORT=5000
reset_pass_link=your_localhost

# CLOUDINARY
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# JWT
JWT_SECRET=your_jwt_secret_key_here

# OPENAI / OPENROUTER
OPENROUTER_API_KEY=your_openrouter_key_here

# STRIPE
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

#nodemailer
EMAIL=your_email
app_pass=your_email_app_password



```
#### 4️⃣ Run the Development Server
```
npm run dev
```

 







