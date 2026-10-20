# 🎓 SHARDA UNIVERSITY AGRA
## DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING
### PROJECT-BASED LEARNING (PBL) COURSE PROJECT REPORT
---

# 📋 9-WEEK MID-TERM MILESTONE PROJECT PROGRESS REPORT
### Project Title: Automated Campus Hostel Management & Digital Resident Experience System (HMS)
**Academic Year:** 2026 – 2027  
**Submission Milestone:** 9-Week Mid-Term PBL Evaluation  
**Project Repository:** Hostel-Management-System  

---

## 👥 Student Engineering Group (Equal 25% Ownership)

| Member Name | University Roll Number | Engineering Role | Core PBL Contribution (25% Each) |
|---|---|---|---|
| **AYUSH** | `25ASETCSE019` | Lead Architect & Backend Systems Lead | Core REST API Architecture, MongoDB Schemas, JWT/RBAC Middleware, Razorpay Sandbox Gateway, Database Seeder |
| **ANUSHKA UPADHYAY** | `25ASETCSE024` | Frontend Lead & Student UX Engineer | React (Vite) Architecture, Student Residence Portal, Axios API Client, Dark/Light Theme Engine, Digital Gate Pass UI |
| **BHOOMI PURUSHWANI** | `25ASETCSE031` | Admin & Warden Operations Engineer | 11-Panel Administration Hub, Role-Based Authentication UI, Student Directory Tables, Complaints Triage, Real-time Operations Desk |
| **PALAK SARASWAT** | `25ASETCSE042` | Security, Operations & QA Engineer | Night Biometric Attendance Engine, Outstation Gate Pass Workflow with QR Verification, Campus Visitor Registry, Automated Postman QA Collection |

---

## 1. 🎯 Executive Project Summary

The **Hostel Management System (HMS)** is a full-stack web application engineered specifically for the residential campus ecosystem of **Sharda University Agra**. Traditional hostel administration relies on manual registers, physical paper gate passes, fragmented WhatsApp complaint groups, and physical fee collection receipts. 

This project solves these operational bottlenecks by providing an enterprise-grade digital portal featuring:
- **Role-Based Portals:** Dedicated interactive dashboards for Students, Wardens, and University Administrators.
- **Outstation Gate Pass Workflow:** Digital multi-stage application and approval process with instant verifiable SVG QR Code generation for security gate scanners.
- **Room Allocation & Inventory:** Visual floor and bed availability tracker across 4 campus hostel wings (Block A Junior Boys, Block B Senior Boys, Block C Girls Wing, Block D PG Wing).
- **Maintenance Ticketing Engine:** Categorized complaint lodgement with status tracking (Pending Review, In Progress, Resolved).
- **Dining & Mess Console:** Interactive weekly timetable and student meal rating system.
- **Automated Digital Invoicing:** Term fee tracking with Razorpay sandbox integration and official PDF downloadable receipts.
- **Fail-Safe Dual-Engine Execution:** Seamless transition between live MongoDB Atlas cloud database and high-fidelity zero-setup in-memory mock engine for flawless viva demonstrations.

---

## 2. 🏗️ Architectural Stack & Specifications

```
+-------------------------------------------------------------------------------+
|                        CLIENT TIER (React 18 + Vite)                          |
|  Tailwind CSS 3.4 • Lucide React • React Router v6 • Axios • ThemeContext     |
|       [Student Residence Portal]      [11-Panel Admin / Warden Hub]           |
+-------------------------------------------------------------------------------+
                                      |  HTTP REST / Bearer JWT / Socket.IO
                                      v
+-------------------------------------------------------------------------------+
|                      APPLICATION TIER (Node.js + Express)                     |
|    JWT Auth Middleware • RBAC Guard • Socket.IO Engine • Helmet Security      |
|    Razorpay Sandbox Controller • Process Unhandled Rejection Safeguards       |
+-------------------------------------------------------------------------------+
                                      |  Mongoose ODM
                                      v
+-------------------------------------------------------------------------------+
|                       DATABASE & TEST SIMULATION TIER                         |
|    MongoDB Atlas Cluster (13 Schemas) / Dual-Mode In-Memory Mock Store        |
+-------------------------------------------------------------------------------+
```

---

## 3. 🗓️ 9-Week Progression & Milestone Achievement Audit

### Week 1: Baseline Architecture & Repository Initialization
- **Ayush:** Scaffolding of Node.js/Express server, modular MVC directory structure, and `/api/health` monitoring endpoint.
- **Anushka:** Initialization of Vite + React frontend, Tailwind CSS layout system, responsive mobile navigation shell.
- **Bhoomi:** Auth UI interfaces (`Login.jsx`, `Register.jsx`) with quick-fill role switcher buttons (Student, Warden, Admin).
- **Palak:** Software Requirements Specification (SRS) baseline documentation in `/docs`.

### Week 2: Database Schemas & RBAC Security Layer
- **Ayush:** Database connection controller (`config/db.js`) and Core Mongoose Models (`User`, `Student`, `Hostel`, `Room`, `Allocation`).
- **Palak:** Operational Schemas (`Attendance`, `Leave`, `Visitor`, `Complaint`, `Notice`, `Payment`).
- **Ayush & Palak:** JWT authentication middleware and Role-Based Access Control (`rbacMiddleware.js`) safeguarding routes by user role.

### Week 3: Interactive Student Experience Portal
- **Anushka:** Designed and launched the public landing page showcasing Sharda University campus culture and hostel amenities.
- **Anushka:** Interactive Student Residence Portal with room allocation card, dues status, active tickets count, and mess viewer.

### Week 4: 11-Panel Administration & Warden Hub
- **Bhoomi:** Built the comprehensive 11-panel Warden Command Center with responsive quick-tabs.
- **Bhoomi:** Student Directory table with live search filters, room occupancy visualizer, and status badges.
- **Anushka & Bhoomi:** Global Dark/Light mode toggle (`ThemeContext.jsx`) styled in University Royal Blue.

### Week 5: Core REST API Backend Engine & Seeder
- **Ayush:** Auth routes (`/api/auth/register`, `/api/auth/login`, `/api/auth/me`), Student profile CRUD, and Room capacity management APIs.
- **Ayush:** Database Seeder script (`server/seeder.js`) populating realistic hostel records, students, and wardens for Sharda University Agra.

### Week 6: Operational REST APIs & Security Workflows
- **Palak:** Attendance tracking endpoints (`/api/attendance`) with bulk marking and monthly statistics.
- **Palak:** Outstation Gate Pass workflow (`/api/leave`) with multi-state transitions (`pending` -> `approved` -> `rejected`).
- **Palak:** Campus Visitor Security Registry (`/api/visitors`) and Warden Notice Board endpoints (`/api/notices`).

### Week 7: Parallel Peer Learning & Viva Preparation
- **All Members:** Authoring of the `Learning and Tutorials/` comprehensive technical guide:
  - `01_ayush-backend_architecture`: REST architecture, Mongoose schemas, JWT lifecycles, MongoDB pipelines.
  - `02_anushka-student_frontend`: React state, Vite optimization, Tailwind CSS responsive design.
  - `03_bhoomi-admin_operations`: Form validation, UI state triage, data table filters, and role routing.
  - `04_palak-ops_security_qa`: Postman test automation, API status codes, and security workflows.

### Week 8: Frontend-Backend Integration & Dynamic State
- **Anushka & Bhoomi:** Centralized Axios API service (`client/src/services/api.js`) with automatic JWT Bearer token injection and 401 error interceptors.
- **Anushka:** Connected Student Portal to live endpoints for room maintenance complaints, outstation leave applications, fee dues, and notices.
- **Bhoomi:** Connected Admin Dashboard to live endpoints for student search, complaint resolution, leave pass approvals, and notices broadcast.
- **Anushka & Bhoomi:** Integrated real-time Toast Notification alert system (`client/src/components/Toast.jsx`).

### Week 9: Automated Postman QA & Mid-Evaluation Audit
- **Palak:** Completed automated Postman Test Collection (`docs/Hostel_Management_API.postman_collection.json`) featuring 10 test suites with assertion scripts (`pm.test`, status 200 checks, token persistence).
- **Ayush:** Backend hardening with unhandled promise rejection protection, exception handlers, and security headers.
- **All Members:** Full production build verification (`npm run build` passed with zero errors across 1676 modules).

---

## 4. 🧪 Automated QA Postman Test Suite Verification

| Suite ID | Module Tested | HTTP Method & Route | Assertions Verified | Test Status |
|---|---|---|---|---|
| `TC-01` | Server Health | `GET /api/health` | Status 200, Service running message, uptime | ✅ PASS |
| `TC-02` | Student Auth | `POST /api/auth/login` | Status 200, JWT token returned, user role verified | ✅ PASS |
| `TC-03` | User Identity | `GET /api/auth/me` | Bearer Token Auth, student profile populated | ✅ PASS |
| `TC-04` | Hostels List | `GET /api/hostels` | Status 200, 4 hostel wings array returned | ✅ PASS |
| `TC-05` | Student Complaints | `GET /api/complaints/my-complaints` | Status 200, array of complaint tickets returned | ✅ PASS |
| `TC-06` | Lodge Complaint | `POST /api/complaints` | Status 201, ticket ID generated, status 'pending' | ✅ PASS |
| `TC-07` | Gate Pass Apply | `POST /api/leave` | Status 201, dates validated, warden review pending | ✅ PASS |
| `TC-08` | Gate Pass Review | `PUT /api/leave/:id/status` | Status 200, status updated to 'approved', QR code emitted | ✅ PASS |
| `TC-09` | Fee Ledger | `GET /api/fees/my-fees` | Status 200, fee dues and payment records populated | ✅ PASS |
| `TC-10` | Campus Notices | `GET /api/notices` | Status 200, active public and student notices returned | ✅ PASS |

---

## 5. ✍️ Evaluation & Viva Sign-Off Sheet

**Project Title:** Hostel Management System (HMS)  
**Evaluator Name / Faculty:** __________________________________  
**Department:** Computer Science & Engineering, Sharda University Agra  

| Evaluation Criterion | Maximum Marks | Marks Awarded | Remarks |
|---|:---:|:---:|---|
| System Architecture & Database Design | 25 | | |
| Frontend UX & Responsive Implementation | 25 | | |
| REST API Completeness & Security | 25 | | |
| Testing (Postman Suite), Team Balance & Viva | 25 | | |
| **Total Mid-Term Score** | **100** | | |

**Faculty Signature:** ___________________________ &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; **Date:** ___________________
