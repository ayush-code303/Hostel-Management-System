# 🛡️ Learning Syllabus & Phase-by-Phase Roadmap: Palak Saraswat (Ops, Security & QA)

> **Role:** Operational Intelligence, Security & QA Engineer  
> **Ownership:** 25% Equal Technical Ownership  
> **Key Domains:** Full-Stack Attendance System, Outstation Leave Workflow, Visitor Security Desk, Postman API Testing, Swagger/OpenAPI, Software Quality Assurance

---

## 🎯 Learning Objectives

By following this syllabus, Palak will master:
1. Designing and building full-stack campus operational workflows (Attendance, Leave Approvals, Visitor Log).
2. Implementing multi-state approval state machines (`pending` ➔ `approved` / `rejected`) with audit logs.
3. Automated API testing using Postman (Collections, Environments, Pre-request scripts, Test assertions).
4. Writing industry-standard OpenAPI / Swagger documentation and End-to-End Test Matrixes.
5. Campus security compliance: Curfew violation detection, night roll call verification, and overstay alerts.

---

## 📅 Phase-by-Phase Learning Syllabus

### Phase 1: API Testing Fundamentals & Postman (Days 1–3)
- **Topics:**
  - What is API Testing? Why is backend testing crucial before frontend deployment?
  - HTTP request anatomy: Headers, Query Parameters, Request Body (JSON), Response Body.
  - Setting up Postman: Creating Workspaces, Collections, and Folders.
  - Postman Environments: Setting dynamic variables `{{baseUrl}}` (`http://localhost:5000/api`) and `{{authToken}}`.
  - Testing status codes (`pm.response.to.have.status(200)`) and response time benchmarks (<500ms).
- **Project Link:**
  - Study file: `docs/Hostel_Management_API.postman_collection.json` and health endpoint `/api/health`.

### Phase 2: Full-Stack Night Attendance & Curfew System (Days 4–7)
- **Topics:**
  - Night roll call requirements in university hostels (10:00 PM curfew compliance).
  - Data modeling for attendance: Compound uniqueness index (`{ student: 1, date: 1 }`) to prevent duplicate marking.
  - Building the Attendance Controller (`server/controllers/attendanceController.js`):
    - Bulk marking attendance for an entire hostel floor/wing.
    - Fetching monthly attendance percentages and flagging shortage alerts (<75%).
  - Designing the Warden Attendance Desk UI and Student Attendance Calendar View.
- **Project Link:**
  - Study files: `server/models/Attendance.js`, `server/routes/attendanceRoutes.js`, and `server/controllers/attendanceController.js`.

### Phase 3: Outstation Leave Approval & Digital Gate Pass Workflow (Days 8–11)
- **Topics:**
  - University outstation leave protocols: Start date, return date, reason, emergency parent contact.
  - State machine transitions:
    ```
    [ Student Submits Leave ] ──► [ Status: PENDING ]
                                         │
                        ┌────────────────┴────────────────┐
                        ▼                                 ▼
              [ Status: APPROVED ]              [ Status: REJECTED ]
                        │                                 │
             (Generates Digital Gate Pass)     (Displays Rejection Reason)
    ```
  - Digital Gate Pass generation with unique authorization serial numbers (e.g. `PASS-SUA-2026-789`).
  - Building the Leave Controller (`server/controllers/leaveController.js`) and warden review desk.
- **Project Link:**
  - Study files: `server/models/Leave.js`, `server/routes/leaveRoutes.js`, and `server/controllers/leaveController.js`.

### Phase 4: Visitor & Campus Security Gate Registry (Days 12–16)
- **Topics:**
  - Campus security protocols: Logging visitor name, relationship with student, contact number, and entry timestamp.
  - Real-time active visitor tracking: Detecting visitors currently "inside" the premises.
  - Overstay detection: Flagging visitors who have not checked out after 8:00 PM visiting hours.
  - Security Desk check-out action: Updating `exitTime` and setting status to `exited`.
  - Building the Visitor Controller (`server/controllers/visitorController.js`) and Security Gate Desk UI.
- **Project Link:**
  - Study files: `server/models/Visitor.js`, `server/routes/visitorRoutes.js`, and `server/controllers/visitorController.js`.

### Phase 5: Automated QA Suites & System Documentation (Days 17–20)
- **Topics:**
  - Writing automated Postman test scripts in JavaScript (`pm.test()`, `pm.expect()`).
  - Verifying JSON schema validation and token extraction in Postman tests:
    ```javascript
    pm.test("Status is 200 and Token returned", function () {
      pm.response.to.have.status(200);
      var jsonData = pm.response.json();
      pm.expect(jsonData.data.token).to.not.be.empty;
      pm.environment.set("authToken", jsonData.data.token);
    });
    ```
  - Writing the comprehensive User Manual (`docs/05_user_manual.md`) explaining step-by-step usage for Students, Wardens, and Admins.
  - Leading the final technical QA audit before college project defense.
