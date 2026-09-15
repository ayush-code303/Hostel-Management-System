# 🎓 Viva & Oral Evaluation Preparation: Palak Saraswat (Ops, Security & QA)

> **Top 20 Questions Frequently Asked by College Evaluators & Technical Examiners**

---

### Q1: What is your primary technical role in this project?
**Answer:** I serve as the Operational Intelligence, Security & QA Engineer with an equal 25% technical ownership. I engineered the full-stack Attendance & Curfew Tracking System, the Outstation Leave & Digital Gate Pass Workflow, and the Visitor Security Desk, along with managing our automated Postman API test suite and technical documentation.

### Q2: Why is automated API testing important before frontend integration?
**Answer:** Testing APIs directly via Postman ensures that backend business logic, validation rules, authentication tokens, and database operations work correctly in isolation. Finding bugs at the API layer saves countless hours of debugging compared to finding them later when tangled with frontend React state issues.

### Q3: What is Postman and how do you use Environments?
**Answer:** Postman is an API platform for building and testing APIs. Environments are sets of key-value variables (such as `{{baseUrl}}` and `{{authToken}}`). Using environments allows us to switch seamlessly between development (`localhost:5000`) and production cloud servers without changing URLs in individual requests, and dynamically pass JWT tokens from the login request to protected endpoints.

### Q4: How does the Night Attendance system work?
**Answer:** Hostels enforce a 10:00 PM curfew. The warden opens the Attendance Desk and marks students as `present`, `absent`, or `leave`. The backend (`/api/attendance`) saves records with a unique compound index (`student + date`) so no student can have duplicate records for the same day. Monthly attendance percentages are calculated dynamically to identify students falling below the 75% university requirement.

### Q5: How does the Outstation Leave Approval workflow prevent unauthorized departures?
**Answer:** When a student applies for outstation leave, the record is placed in a `pending` state. The warden reviews the leave dates, reason, and verified parent contact number. Only upon the warden clicking "Approve" does the backend transition the status to `approved` and generate a unique authorization pass code (e.g. `PASS-SUA-2026-104`). Security guards at the campus main gate verify this pass code before permitting exit.

### Q6: What happens if a warden rejects a leave request?
**Answer:** The status transitions to `rejected`, and the warden must provide an administrative review comment (e.g., "Parent verification failed" or "Upcoming semester exams"). The student's dashboard displays the rejection badge along with the warden's remarks.

### Q7: How does the Visitor Security Desk track visitors on campus?
**Answer:** When an external visitor arrives (parent, guardian, technician), the security guard logs their name, relation to the student, contact number, and entry timestamp (`entryTime: Date.now()`). The visitor's status is set to `inside`. When they depart, the guard clicks "Mark Exit", which stamps `exitTime` and changes status to `exited`.

### Q8: How does your system detect visitor curfew violations?
**Answer:** The system queries all visitors with `status: 'inside'`. It calculates the duration: `(currentTime - entryTime)`. Any visitor remaining after visiting hours (8:00 PM) or exceeding the 4-hour threshold is flagged with an orange/red alert on the security console for immediate follow-up.

### Q9: What is a Postman Test Assertion? Give an example script.
**Answer:** A test assertion is a snippet of JavaScript code executed in Postman's "Tests" tab to programmatically verify that the API response satisfies requirements:
```javascript
pm.test("Status code is 201 Created", function () {
    pm.response.to.have.status(201);
});
pm.test("Leave ID is returned", function () {
    var json = pm.response.json();
    pm.expect(json.data.leave._id).to.be.a('string');
});
```

### Q10: What is the difference between Verification and Validation in Software QA?
**Answer:**
- **Verification:** "Are we building the product right?" Checking that the code adheres to design specifications, schemas, coding standards, and architectural blueprints without running the software (reviews, inspections).
- **Validation:** "Are we building the right product?" Testing the actual running software against user requirements and business expectations (functional testing, Postman test runs).

### Q11: What is a Regression Test?
**Answer:** Regression testing verifies that recent code modifications, bug fixes, or new feature additions have not broken existing functionality. By running our entire Postman collection runner with one click, we verify that all endpoints across the system remain healthy.

### Q12: How do you handle date formatting consistently across time zones?
**Answer:** We store all dates in MongoDB in **UTC (ISO 8601)** format (`YYYY-MM-DDTHH:mm:ss.sssZ`). When displaying timestamps on the frontend, the browser automatically converts the UTC timestamp into Indian Standard Time (IST) using JavaScript's `.toLocaleDateString('en-IN')` or `.toLocaleString('en-IN')`.

### Q13: What are the main HTTP methods used in your operational modules?
**Answer:**
- `GET /api/attendance/student/:id`: Retrieve student attendance history.
- `POST /api/attendance`: Bulk mark daily attendance.
- `POST /api/leave`: Student submits a new outstation leave request.
- `PUT /api/leave/:id/status`: Warden reviews and approves/rejects leave.
- `POST /api/visitors`: Log new visitor entry.
- `PUT /api/visitors/:id/exit`: Stamp visitor exit time.

### Q14: What is an Audit Trail and why is it important in hostel security?
**Answer:** An audit trail is an immutable, timestamped record of who did what and when. In our models, fields like `markedBy`, `reviewedBy`, `loggedBy`, and Mongoose `timestamps` record the exact administrator who approved a pass or logged a visitor, preventing disputes during campus security incidents.

### Q15: What is Swagger / OpenAPI?
**Answer:** OpenAPI is a standard, language-agnostic interface description specification for RESTful APIs. Swagger is the tooling ecosystem that renders an interactive web documentation interface (Swagger UI), allowing developers and evaluators to view schemas and execute API calls directly in the browser.

### Q16: How do you verify that a student cannot approve their own leave request?
**Answer:** We run a security test in Postman: We send a `PUT /api/leave/:id/status` request using a student's JWT token. The backend RBAC middleware intercepts the call, sees `role: 'student'`, and immediately rejects it with HTTP `403 Forbidden: User role [student] is not authorized to access this route`.

### Q17: What is Boundary Value Analysis (BVA)?
**Answer:** BVA is a black-box test design technique where tests are designed to include representatives of boundary values. For example, testing room capacity: if capacity is 3, we test with 0 occupants (empty), 2 occupants (within boundary), 3 occupants (max boundary), and 4 occupants (should be blocked with error).

### Q18: What is the purpose of the User Manual (`docs/05_user_manual.md`)?
**Answer:** The User Manual provides comprehensive, illustrated end-user documentation. It guides resident students on lodging complaints and requesting leave passes, explains the room allocation process to hostel wardens, and provides administrative procedures for chief wardens.

### Q19: What is Newman in the Postman ecosystem?
**Answer:** Newman is a command-line collection runner for Postman. It allows running Postman test collections directly from the terminal or in CI/CD pipelines (e.g. GitHub Actions), generating automated HTML or JSON test summary reports.

### Q20: How does your work directly improve campus safety at Sharda University Agra?
**Answer:** By replacing manual paper logbooks with automated digital workflows:
1. Night attendance records are instantly aggregated, immediately alerting wardens to absent students.
2. Outstation gate passes are cryptographically verifiable, preventing falsified gate slips.
3. Visitor logs flag overstayed visitors in real-time, significantly elevating campus residential safety.
