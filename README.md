# 🏨 Hostel Management System

> A modern, scalable, and production-oriented Hostel Management System built using the **MERN Stack** to simplify hostel administration through a centralized, role-based web platform.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933)
![Express](https://img.shields.io/badge/Framework-Express-000000)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248)

---

# 📖 Overview

Hostel Management System is a full-stack web application developed to digitize hostel administration and eliminate manual record keeping.

The platform provides dedicated portals for administrators and students, allowing efficient management of hostel operations including student registration, room allocation, complaints, notices, fee management, attendance, visitor records, and hostel analytics.

The system is designed with modular architecture, role-based authentication, and scalable backend services, making it suitable for colleges, universities, and private hostels.

---

# ❗ Problem Statement

Many educational institutions still manage hostel operations using paper registers or spreadsheets.

This creates several challenges:

- Duplicate and inconsistent records
- Manual room allocation
- Difficult fee tracking
- Slow complaint resolution
- Poor communication
- Lack of centralized data
- Difficult report generation
- Time-consuming administrative work

---

# 💡 Proposed Solution

Develop a centralized web-based Hostel Management System that automates hostel operations through secure role-based access.

The platform enables administrators to efficiently manage students, rooms, fees, complaints, notices, attendance, and visitor records while providing students with a simple portal to access hostel-related services.

---

# 🎯 Objectives

- Digitize hostel administration
- Reduce paperwork
- Improve communication
- Simplify room allocation
- Manage complaints efficiently
- Maintain centralized student records
- Improve transparency
- Generate reports and analytics

---

# ✨ Features

## 🔐 Authentication

- JWT Authentication
- Secure Login
- Password Encryption (bcrypt)
- Protected Routes
- Role-Based Access Control (RBAC)

---

## 👨‍💼 Admin Module

- Admin Dashboard
- Student Management
- Hostel Management
- Room Management
- Room Allocation
- Fee Management
- Complaint Management
- Notice Management
- Attendance Monitoring
- Visitor Management
- Reports & Analytics

---

## 👨‍🎓 Student Module

- Login/Register
- Student Profile
- Hostel Details
- Room Information
- Fee Status
- Submit Complaints
- View Notices
- Attendance History
- Leave Requests

---

## 🏠 Hostel Module

- Hostel Details
- Floor Management
- Room Availability
- Occupancy Status
- Capacity Management

---

## 🛏️ Room Management

- Add Room
- Edit Room
- Delete Room
- Room Allocation
- Room Availability
- Room Capacity

---

## 💰 Fee Management

- Fee Records
- Pending Payments
- Payment History
- Online Payment Support (Future)

---

## 📢 Notice Board

- Publish Notices
- Student Notifications
- Important Announcements

---

## 📝 Complaint Management

- Submit Complaint
- Complaint Categories
- Track Complaint Status
- Resolve Complaints

---

## 👥 Visitor Management

- Visitor Entry
- Exit Logs
- Visitor History

---

## 📊 Reports

- Student Reports
- Occupancy Reports
- Fee Reports
- Complaint Reports
- Attendance Reports

---

# 🔄 System Workflow

```text
Administrator Login
        │
Create Hostel
        │
Add Rooms
        │
Register Students
        │
Allocate Rooms
        │
Students Login
        │
View Hostel Details
        │
Pay Fees
        │
Raise Complaints
        │
Admin Reviews Requests
        │
Update Records
        │
Students Receive Notifications
```

---

# 🛠️ Tech Stack

## Frontend

- React.js
- Vite
- HTML5
- CSS3
- JavaScript (ES6+)
- Tailwind CSS
- Bootstrap
- React Router DOM
- Axios

---

## Backend

- Node.js
- Express.js

---

## Database

- MongoDB
- Mongoose ODM

---

## Authentication

- JWT
- bcrypt

---

## API

- REST API

---

## Version Control

- Git
- GitHub

---

## Deployment

Frontend
- Vercel

Backend
- Render

Database
- MongoDB Atlas

---

# 📂 Project Structure

```text
Hostel-Management-System/
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── context/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   ├── server.js
│   └── package.json
│
├── docs/
├── README.md
└── .gitignore
```

---

# 🗄️ Database Collections

- Users
- Students
- Hostels
- Rooms
- Room Allocations
- Complaints
- Notices
- Fees
- Payments
- Attendance
- Visitors
- Leave Requests

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/your-username/Hostel-Management-System.git
```

---

## Install Frontend

```bash
cd client

npm install

npm run dev
```

---

## Install Backend

```bash
cd server

npm install

npm run dev
```

---

# 🌐 Local Development

Frontend

```text
http://localhost:5173
```

Backend

```text
http://localhost:5000
```

---

# 👥 Team Responsibilities

| Member | Responsibility |
|---------|----------------|
| Member 1 | Backend Development & Authentication |
| Member 2 | Frontend Development |
| Member 3 | Admin Dashboard & API Integration |
| Member 4 | Testing, Documentation & Deployment |

---

# 📚 Learning Outcomes

This project demonstrates:

- Full Stack Web Development
- REST API Development
- Authentication & Authorization
- CRUD Operations
- MongoDB Database Design
- Responsive UI Development
- Role-Based Access Control
- Git & GitHub Workflow
- Team Collaboration
- Software Engineering Practices

---

# 🔮 Future Scope

- Mobile Application
- QR Code Hostel Entry
- RFID Attendance
- Face Recognition Attendance
- AI Chatbot
- Visitor QR Pass
- Online Fee Payment Gateway
- SMS Notifications
- Email Notifications
- Parent Portal
- Hostel Analytics Dashboard
- Multi-Hostel Support

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.
3. Commit your changes.
4. Push the branch.
5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.
