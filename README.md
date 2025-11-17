# Health Care Server

A **Node.js + Express** backend server for a Health Care Management System, designed to handle patient data, appointments, doctors, and medical records. It uses **PostgreSQL** for data storage, JWT for secure authentication and  AI-driven doctor suggestions based on patient symptoms. 

---

## 📖 Table of Contents

- [live-link](https://ride-booking-server-rust.vercel.app)


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
 <h3>🛠️ Admin Routes</h3> <table border="1" cellpadding="5" cellspacing="0">
   <tr> <th>Method</th> <th>Endpoint</th> <th>Description</th> <th>Auth</th> <th>Role</th> </tr> <tr> <td>GET</td> <td>/api/admin/</td> <td>Get all admins</td> <td>✅</td> <td>ADMIN</td> </tr> <tr> <td>GET</td> <td>/api/admin/:id</td> <td>Get admin by ID</td> <td>✅</td> <td>ADMIN</td> </tr> <tr> <td>PATCH</td> <td>/api/admin/:id</td> <td>Update admin information</td> <td>✅</td> <td>ADMIN</td> </tr> <tr> <td>DELETE</td> <td>/api/admin/:id</td> <td>Hard delete admin</td> <td>✅</td> <td>ADMIN</td> </tr> <tr> <td>DELETE</td> <td>/api/admin/soft/:id</td> <td>Soft delete admin</td> <td>✅</td> <td>ADMIN</td> </tr> </table>



