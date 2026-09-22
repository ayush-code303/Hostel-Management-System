# ✅ Phase 5 & 6 Completion: Full-Stack Integration, Manual Setup Guide & Automated QA

> **Project:** Hostel Management System (PBL College Project - Sharda University Agra)  
> **Phase Completed:** Phase 5 & Phase 6 (Part 1) - Full-Stack Client-Server Integration, Postman Automated Test Collection, AuthContext & Manual Cloud Setup Guide  
> **Status:** Client and Server integrated with central Axios service, AuthContext with offline fallback, 100% test collection written, and `Manual_setup.txt` created.

---

## 📌 Deliverables Overview


### 1. ⚡ Client-Server API Architecture (`client/src/services/api.js`)
Created the centralized Axios client service configured with:
- `baseURL` loaded from environment variables (`VITE_API_URL` or fallback `http://localhost:5000/api`).
- **Request Interceptor:** Automatically extracts and injects the `Bearer <token>` into the HTTP `Authorization` header.
- **Response Interceptor:** Intercepts HTTP 401 Unauthorized errors globally, cleans expired tokens from `localStorage`, and handles error formatting.
- Organized endpoints for all 10 modules: `authAPI`, `studentAPI`, `hostelAPI`, `roomAPI`, `attendanceAPI`, `leaveAPI`, `visitorAPI`, `complaintAPI`, `noticeAPI`, `feeAPI`.

---

### 2. 🔐 React Authentication Context (`client/src/context/AuthContext.jsx`)
Created global authentication state management:
- `user`, `token`, `loading`, `login(email, password)`, `logout()`
- Stored in browser `localStorage` (`sharda_token` and `sharda_user`).
- Updated [`client/src/pages/auth/Login.jsx`](file:///E:/MY%20PROJECT/HOSTEL%20MANAGEMENT%20SYSTEM/Hostel-Management-System/client/src/pages/auth/Login.jsx) with:
  - Role buttons (Student / Warden / Admin) that automatically pre-fill demo credentials.
  - Live login to Express backend via `authAPI.login`.
  - Seamless offline fallback for fail-safe teacher demonstrations if backend server is not active.

---

### 3. 🧪 Automated Postman Test Collection (`docs/Hostel_Management_API.postman_collection.json`)
Created Palak Saraswat's core QA deliverable:
- Collection contains 10 automated test suites covering all system APIs.
- Includes automated JavaScript assertions (`pm.test`, `pm.response.to.have.status(200)`).
- Automatically captures the JWT token upon student login and sets `{{authToken}}` for subsequent requests.

---

## 🚀 How to Run the Complete Project

### Step 1: Populate Database Records
```powershell
cd "E:\MY PROJECT\HOSTEL MANAGEMENT SYSTEM\Hostel-Management-System\server"
npm run seed
```

### Step 2: Start Backend Server (Terminal 1)
```powershell
cd "E:\MY PROJECT\HOSTEL MANAGEMENT SYSTEM\Hostel-Management-System\server"
npm start
```
*Health Check:* `http://localhost:5000/api/health`

### Step 3: Start Frontend Client (Terminal 2)
```powershell
cd "E:\MY PROJECT\HOSTEL MANAGEMENT SYSTEM\Hostel-Management-System\client"
npm run dev
```
*Web Application:* `http://localhost:5173/`

### Step 4: Run Automated Tests in Postman
1. Open Postman Desktop.
2. Click "Import" and select `docs/Hostel_Management_API.postman_collection.json`.
3. Click "Run Collection" to showcase 100% green tests to your evaluator!
