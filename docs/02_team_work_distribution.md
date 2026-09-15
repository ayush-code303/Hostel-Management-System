# 👥 Equalized Team Work Distribution & Responsibility Matrix

> **Project:** Hostel Management System (PBL College Project - Sharda University Agra)  
> **Team Size:** 4 Members (Ayush, Anushka, Bhoomi, Palak)  
> **Workload Policy:** Perfectly Equalized (25% per Member) with Full Technical Ownership

---

## ⚖️ Member Workload & Technical Ownership (25% Each)

```
┌─────────────────────────────────────────────────────────────────────────┐
│              HOSTEL MANAGEMENT SYSTEM - EQUAL 25% OWNERSHIP             │
├──────────────────┬──────────────────┬──────────────────┬────────────────┤
│      AYUSH       │ ANUSHKA UPADHYAY │ BHOOMI PURUSHWANI│ PALAK SARASWAT │
│      (25%)       │      (25%)       │      (25%)       │     (25%)      │
│  Core Backend &  │  Student Portal  │  Admin & Warden  │  Operational   │
│   Architecture   │    Experience    │ Operations & UI  │ Security & QA  │
└──────────────────┴──────────────────┴──────────────────┴────────────────┘
```

| Member Name | Designated Role | Core Technical Ownership | Workload % |
| :--- | :--- | :--- | :--- |
| **Ayush** | Lead Architect & Core Backend Engineer | System Architecture, MongoDB Schemas & Indexing, Express REST APIs (Auth, Student, Hostel, Rooms, Fees), JWT & RBAC Security, Database Seeder, Deployment Setup | **25%** |
| **Anushka Upadhyay** | Frontend Lead & Student Experience Engineer | React/Vite Client Scaffold, Responsive Base Layouts (Navbar/Sidebar/Theme), Complete Student Portal (Dashboard, Room Application, Complaints, Mess Menu, Dynamic Modals) | **25%** |
| **Bhoomi Purushwani** | Admin & Warden Operations Engineer | Authentication Frontend (Login & Register), Complete Admin Operations Hub (11 Management Panels), Room Inventory & Capacity Visualizer, Student Records & Fee Console | **25%** |
| **Palak Saraswat** | Operational Intelligence, Security & QA Engineer | Full-Stack Gate Pass & Attendance Tracking Engine, Outstation Leave Workflow & Digital Gate Pass, Visitor Security Desk, Automated Postman Test Suite, System Documentation & Manuals | **25%** |

---

## 📌 Detailed Ownership Matrix by Module & Stack Layer

| Module / System Capability | Ayush (Lead Backend) | Anushka (Student FE) | Bhoomi (Admin FE) | Palak (Ops/Security/QA) |
| :--- | :--- | :--- | :--- | :--- |
| **Architecture & Database Engine** | 👑 Schema & DB Setup | Client Consumer | Client Consumer | Data Dictionary Review |
| **Auth & Security (JWT + RBAC)** | 👑 Token & Auth APIs | Token Consumer | 👑 Login/Register UI | Security Audit & Role Tests |
| **Navbar, Sidebar & Dark Mode** | - | 👑 Layout & Theme | Layout Consumer | QA Verification |
| **Student Portal & Services** | Student APIs | 👑 Student Portal UI | - | Feature QA |
| **Admin Control Center & Rooms** | Core CRUD APIs | - | 👑 11 Admin Panels | Functional Verification |
| **Mess & Dining Schedule** | Mess Schema & API | 👑 Mess Menu UI | Admin Mess Editor | Menu Audit |
| **Attendance & Curfew Tracking** | Core DB Hooks | Student Calendar | Warden Marking View | 👑 Full-Stack Module Owner |
| **Outstation Leave & Gate Pass** | Core DB Hooks | Leave Request UI | Leave Approval View | 👑 Full-Stack Module Owner |
| **Visitor Entry & Security Log** | Core DB Hooks | - | Security Dashboard | 👑 Full-Stack Module Owner |
| **API Test Suite & Postman** | API Provider | - | - | 👑 Test Suite & Runner |
| **User Manuals & Viva Prep** | Backend Docs | Student UI Guide | Admin UI Guide | 👑 Master Manual & Guide |

---

## 🛠️ Palak Saraswat's Equalized & Elevated Responsibilities

To achieve an equal 25% technical distribution, Palak's scope has been elevated from purely documentation/QA to full-stack feature ownership of the university's three critical operational pillars:

1. **Night Attendance & Curfew Monitoring Engine**:
   - Backend APIs (`/api/attendance`) for bulk hostel block attendance marking.
   - Real-time student attendance history and night curfew tracking.
   - Monthly attendance aggregation and shortage alert calculations.

2. **Digital Outstation Leave & Gate Pass Workflow**:
   - Multi-state approval workflow (`pending` ➔ `approved` / `rejected`).
   - Digital Gate Pass generation with unique authorization pass code and parent contact verification.
   - Outstation leave quota tracking and automatic re-entry timestamping.

3. **Visitor & Campus Security Gate Registry**:
   - Visitor check-in/check-out tracking (`/api/visitors`).
   - Real-time active visitor monitoring to flag overstayed visitors past 8:00 PM curfew.
   - Security desk audit trail exportable for chief warden review.

4. **Automated API Testing & Software Quality Assurance**:
   - Complete Postman Collection with test assertions (status codes, JSON schema, response times).
   - End-to-end integration test runs covering all roles (Student, Warden, Admin).
   - Formal User Manual and System Technical Guide (`docs/05_user_manual.md`).

---

## 🌿 Git Branch & Commit Strategy

Each member works on a dedicated feature branch to demonstrate individual contribution in GitHub commit histories:

- **Ayush:** `feature/ayush-backend` (Backend controllers, routes, schemas, database seeder)
- **Anushka:** `feature/anushka-student` (Student portal, responsive design, mess menu, complaint modals)
- **Bhoomi:** `feature/bhoomi-admin` (Admin control panels, login/register UI, room visualizers)
- **Palak:** `feature/palak-ops-security` (Attendance engine, leave workflow, visitor security, Postman suite, docs)
