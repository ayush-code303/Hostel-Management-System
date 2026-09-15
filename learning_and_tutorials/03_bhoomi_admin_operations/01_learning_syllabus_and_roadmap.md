# 📊 Learning Syllabus & Phase-by-Phase Roadmap: Bhoomi Purushwani (Admin Operations)

> **Role:** Admin & Warden Operations Engineer  
> **Ownership:** 25% Equal Technical Ownership  
> **Key Domains:** Admin Dashboard Engineering, Complex State Management, Data Tables, Live Search & Filtering, Auth UI, Axios Client

---

## 🎯 Learning Objectives

By following this syllabus, Bhoomi will master:
1. Designing comprehensive administrative dashboards and warden operational consoles.
2. Managing multi-tab views and switching between 11 management modules seamlessly.
3. Implementing searchable, filterable, and paginated data tables for thousands of student records.
4. Handling complex form validations, authentication state, and token management in browser storage.
5. Connecting frontend components to Express REST APIs using Axios with interceptors and error handling.

---

## 📅 Phase-by-Phase Learning Syllabus

### Phase 1: Authentication UI & Input Validation (Days 1–3)
- **Topics:**
  - Login & Register form ergonomics: Role selection pills (`student`, `warden`, `admin`).
  - Client-side input validation: Email regex, password length rules, password visibility toggling.
  - Handling asynchronous form submission: Setting `loading` state spinners and disabling buttons during API calls.
  - Displaying friendly error banners and alert badges on authentication failure.
- **Project Link:**
  - Study files: `client/src/pages/auth/Login.jsx` and `client/src/pages/auth/Register.jsx`.

### Phase 2: Multi-View Admin Hub Architecture (Days 4–7)
- **Topics:**
  - Structuring large-scale admin applications: Sidebar navigation, breadcrumbs, and active state highlights.
  - Tab state management: Switching between 11 admin panels without page refreshes:
    1. Overview Analytics
    2. Student Directory
    3. Hostel Blocks
    4. Room Inventory
    5. Room Allocations
    6. Fee Management
    7. Complaints Desk
    8. Attendance Log
    9. Outstation Leave Approval
    10. Visitor Security Register
    11. Notice Broadcaster
- **Project Link:**
  - Study file: `client/src/pages/admin/AdminDashboard.jsx`.

### Phase 3: Data Tables, Search & Filter Mechanics (Days 8–11)
- **Topics:**
  - Efficient client-side filtering: `.filter()` with `.toLowerCase().includes()` across multiple columns (Name, Roll Number, Room Number).
  - Multi-condition filtering: Filtering by hostel block, gender, room occupancy status, and complaint urgency.
  - Pagination logic: Calculating total pages, slice indices (`(page - 1) * pageSize`, `page * pageSize`), and "Next/Previous" controls.
  - Sorting data tables: Ascending/Descending sort by name, roll number, or date.
- **Project Link:**
  - Study files: Student table and Room allocation workstation in `client/src/pages/admin/AdminDashboard.jsx`.

### Phase 4: Room Visualizers & Capacity Management (Days 12–16)
- **Topics:**
  - Visualizing room occupancy with progress bars and color-coded status pills:
    - 🟢 Green: `Available` (0 occupied)
    - 🟡 Yellow: `Partially Occupied` (1 or 2 occupied in a 3-seater)
    - 🔴 Red: `Full / Occupied` (Capacity reached)
  - Interactive Allocation Workstation: Selecting a verified student, choosing an available room, and submitting allocation.
  - Fee collection tracking: Marking term fees as Paid, Pending, or Overdue with auto-generated receipt IDs.
- **Project Link:**
  - Study files: Room Visualizer and Fee Console in `client/src/pages/admin/AdminDashboard.jsx`.

### Phase 5: Axios API Integration & Interceptors (Days 17–20)
- **Topics:**
  - What is Axios? Fetch API vs Axios: Automatic JSON parsing, request/response interceptors.
  - Configuring a central Axios client (`client/src/services/api.js`) with `baseURL: 'http://localhost:5000/api'`.
  - Request interceptors: Automatically attaching `Authorization: Bearer <token>` from `localStorage` to every outgoing request.
  - Response interceptors: Catching HTTP 401 Unauthorized globally and redirecting to `/login`.
- **Project Link:**
  - Connect `AdminDashboard.jsx` to backend endpoints `/api/students`, `/api/rooms`, `/api/hostels`, `/api/fees`.
