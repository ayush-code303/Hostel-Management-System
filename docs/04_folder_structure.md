# 📂 Project Directory & File Structure Guide

> **Project:** Hostel Management System  
> **Repository Layout:** Monorepo Structure (`client/`, `server/`, `docs/`)

---

## 🌳 Directory Tree Overview

```text
Hostel-Management-System/
├── docs/                                 # Project Documentation (Palak Ownership)
│   ├── 01_project_overview.md
│   ├── 02_team_work_distribution.md
│   ├── 03_system_architecture.md
│   └── 04_folder_structure.md
│
├── client/                               # Frontend Application (React + Vite)
│   ├── public/                           # Static assets
│   ├── src/
│   │   ├── assets/                       # Images, logos, SVG icons
│   │   ├── components/                   # Reusable UI components (Navbar, Sidebar, Modal, Table)
│   │   ├── context/                      # React Context providers (AuthContext)
│   │   ├── hooks/                        # Custom React hooks
│   │   ├── layouts/                      # Layout wrappers (MainLayout, AuthLayout)
│   │   ├── pages/                        # Page components grouped by role
│   │   │   ├── admin/                    # Admin pages (AdminDashboard, StudentList)
│   │   │   ├── auth/                     # Auth pages (Login, Register)
│   │   │   ├── student/                  # Student pages (StudentDashboard, Profile, Fees)
│   │   │   └── warden/                   # Warden pages (AttendanceDesk, LeaveDesk)
│   │   ├── routes/                       # React Router configuration & Protected Route guards
│   │   ├── services/                     # Axios API service callers
│   │   ├── utils/                        # Frontend helpers & formatters
│   │   ├── App.jsx                       # Root React Component
│   │   ├── main.jsx                      # React Entry point
│   │   └── index.css                     # Global styles & Tailwind directives
│   ├── index.html                        # HTML Entry file
│   ├── vite.config.js                    # Vite builder configuration
│   ├── tailwind.config.js                # Tailwind CSS styling tokens
│   ├── postcss.config.js                 # PostCSS plugin setup
│   └── package.json                      # Client dependencies & scripts
│
├── server/                               # Backend Application (Node.js + Express)
│   ├── config/                           # Database & cloud service connections (db.js)
│   ├── controllers/                      # Request handlers & REST endpoints logic
│   ├── middleware/                       # Auth, RBAC, error handlers & file upload middleware
│   ├── models/                           # Mongoose Schemas (User, Student, Room, Allocation, etc.)
│   ├── routes/                           # Express route handlers (/api/auth, /api/students)
│   ├── services/                         # Business logic helpers & third-party API integration
│   ├── utils/                            # Standard response helper & server utilities
│   ├── validators/                       # Input validation schemas (express-validator)
│   ├── server.js                         # Express Server Entry Point
│   ├── .env.example                      # Environment variables template
│   └── package.json                      # Server dependencies & npm scripts
│
├── .gitignore                            # Root Git ignore rules
├── plan.txt                              # Master Project Plan
└── README.md                             # Repository Overview
```

---

## 📌 Module Responsibilities Mapping

- `docs/` -> Owned by **Palak**
- `server/` -> Architecture & APIs owned by **Ayush**
- `client/src/pages/auth/` -> Auth UI created by **Anushka**
- `client/src/layouts/`, `client/src/components/`, `client/src/pages/student/` -> Frontend layout & Student portal owned by **Bhoomi**
- `client/src/pages/admin/` -> Admin operations owned by **Anushka**
- `client/src/pages/warden/` -> Operational modules owned by **Palak**
