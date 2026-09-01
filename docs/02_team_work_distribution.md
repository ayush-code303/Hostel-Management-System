# 👥 Team Work Distribution & Responsibility Matrix

> **Project:** Hostel Management System  
> **Team Size:** 4 Members  

---

## 👥 Member Role Breakdown

| Member Name | Designated Role | Primary Focus Area | Workload % |
| :--- | :--- | :--- | :--- |
| **Ayush** | Lead Developer & Architect | System Architecture, MongoDB Schemas, Express REST APIs, JWT/RBAC Security, Business Logic, Integrations & Deployment | ~45% |
| **Bhoomi Purushwani** | Frontend Lead (Student Portal) | Vite/React Scaffold, Responsive Layouts, Navbar/Sidebar Navigation, Student Portal UI (Dashboard, Profile, Fees, Complaints, Leave, Notices) | ~18% |
| **Anushka Upadhyay** | Frontend Developer (Admin/Warden) | Authentication UI (Login/Register), Admin & Warden Operational Dashboards, Student Data Table, Room Allocation UI, Complaint Triage UI | ~18% |
| **Palak Saraswat** | Operational Modules, QA & Docs | Project Documentation (`docs/`), Attendance Module UI, Leave Approval Desk UI, Visitor Registry UI, Postman API Testing & User Manual | ~19% |

---

## 📌 Ownership Matrix by Module

| Module / Area | Ayush (Backend/Architect) | Bhoomi (Student FE) | Anushka (Admin FE) | Palak (Ops/Docs/QA) |
| :--- | :--- | :--- | :--- | :--- |
| **System Architecture & Config** | 👑 Owner | Consumer | Consumer | Documentation |
| **Database Schemas & Models** | 👑 Owner | - | - | Documentation |
| **Project Documentation (`docs/`)** | Technical Review | - | - | 👑 Owner |
| **Authentication UI (Login/Register)** | API Provider | Component User | 👑 Owner | QA Testing |
| **Navbar & Main Layout Wrappers** | - | 👑 Owner | Component User | Component User |
| **Admin Operational Dashboard** | API Provider | - | 👑 Owner | QA Testing |
| **Student Portal & Dashboards** | API Provider | 👑 Owner | - | QA Testing |
| **Room Allocation & Capacity Logic** | 👑 Logic Owner | View UI | Management UI | QA Testing |
| **Attendance Management System** | API Provider | View UI | Warden View UI | 👑 Module Owner |
| **Leave Approval System** | API Provider | Request UI | Approval UI | 👑 Module Owner |
| **Visitor Entry/Exit Registry** | API Provider | - | Admin View | 👑 Module Owner |
| **Postman Test Collection & Manual** | API Spec | - | - | 👑 Owner |

---

## 🔄 Commit & Branch Guidelines per Member

To avoid Git merge conflicts and maintain clear contribution histories for evaluation:

- **Ayush:** Branch `feature/ayush-backend` -> Commits related to `server/`, DB models, APIs, security.
- **Bhoomi:** Branch `feature/bhoomi-student` -> Commits related to `client/src/layouts/`, `client/src/pages/student/`, base frontend setup.
- **Anushka:** Branch `feature/anushka-admin` -> Commits related to `client/src/pages/auth/`, `client/src/pages/admin/`.
- **Palak:** Branch `feature/palak-ops-docs` -> Commits related to `docs/`, `client/src/pages/warden/`, `phase_1_complete.md`.
