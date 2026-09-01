# 🏨 Hostel Management System - Project Overview

> **Course:** Project-Based Learning (PBL) / Mini Project  
> **Institution:** Sharda University Agra - Anand School of Engineering and Technology  
> **Department:** Computer Science & Engineering  
> **Supervisor:** Vinay Agrawal Sir, Assistant Professor  
> **Academic Session:** 2026-27  

---

## 📌 Executive Summary

The **Hostel Management System** is a modern, scalable, full-stack web platform built using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). It replaces traditional paper registers and spreadsheet-based hostel administration with a centralized, secure, role-based platform.

The system caters to three primary user personas:
1. **Administrators:** Full management authority over hostels, rooms, room allocations, student records, fee verification, complaint resolution, and system analytics.
2. **Wardens / Staff:** Operational management including daily attendance logging, visitor entry/exit records, leave request approvals, and block monitoring.
3. **Students:** Self-service portal for hostel room applications, fee payment status & online payment, complaint submissions & live status tracking, leave applications, attendance history, and notice announcements.

---

## ❗ Problem Statement

Many colleges and educational institutions manage hostel operations manually or with disconnected spreadsheets, leading to:
- Duplicate and inconsistent student records.
- Manual and error-prone room allocation.
- Delayed complaint reporting and lack of resolution tracking.
- Difficult fee collection and payment status verification.
- Inefficient gate management for visitors and student leave logs.
- Time-consuming administrative reporting.

---

## 💡 Proposed Solution

A centralized web application with secure Role-Based Access Control (RBAC) that automates hostel operations:
- **Digitized Allocation:** Automated room capacity tracking and conflict-free allocation rules.
- **Role-Based Portals:** Custom user interfaces tailored for Students, Wardens, and Admins.
- **Transparent Workflows:** Live tracking for complaints, leave requests, and fee payments.
- **Operational Efficiency:** Quick digital logging for student attendance and gate visitors.

---

## 🛠️ Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (Vite) | Fast, modular component-based user interface |
| **Styling** | Tailwind CSS & Lucide Icons | Responsive UI framework and iconography |
| **State & Router** | React Router DOM v6 | Single Page Application routing & protected routes |
| **Backend** | Node.js & Express.js | Scalable REST API application server |
| **Database** | MongoDB & Mongoose ODM | Document store with object data modeling |
| **Security** | JWT & bcryptjs | JSON Web Token authentication & password encryption |
| **Integrations** | Cloudinary, Razorpay, Socket.IO | File storage, online payment gateway, real-time alerts |

---

## 🎯 Primary Project Objectives

1. Eliminate physical paperwork in hostel record-keeping.
2. Ensure secure, role-restricted API endpoints and UI routing.
3. Streamline room allocation and capacity tracking.
4. Provide real-time complaint handling and status updates.
5. Generate operational reports for hostel administration.
