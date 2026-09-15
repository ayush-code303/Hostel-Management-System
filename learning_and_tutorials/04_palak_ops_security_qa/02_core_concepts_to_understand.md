# 🧠 Core Operational & QA Concepts to Understand: Palak Saraswat

> **Guide:** Operational State Machines, Automated API Testing in Postman, Curfew Compliance & Audit Logs

---

## 1. Outstation Leave Approval State Machine

The outstation leave module operates as a deterministic finite-state machine (FSM). A student's application moves through strict lifecycle states:

```
                  ┌──────────────────────┐
                  │ 1. PENDING           │
                  │ (Student submits     │
                  │  dates & reason)     │
                  └──────────┬───────────┘
                             │
            ┌────────────────┴────────────────┐
            ▼                                 ▼
┌──────────────────────┐          ┌──────────────────────┐
│ 2. APPROVED          │          │ 3. REJECTED          │
│ (Warden confirms,    │          │ (Warden provides     │
│  generates Gate Pass │          │  rejection reason,   │
│  serial number)      │          │  ticket closes)      │
└──────────┬───────────┘          └──────────────────────┘
           │
           ▼
┌──────────────────────┐
│ 4. RETURNED / CLOSED │
│ (Security marks      │
│  student re-entry)   │
└──────────────────────┘
```

### Why this prevents campus security breaches:
- A student cannot show a forged paper pass; security scans or looks up the live authorization serial code (e.g. `PASS-SUA-2026-089`) directly in the database.
- The state transition requires authentication by a user with role `warden` or `admin`, recording `reviewedBy` and `updatedAt` for institutional accountability.

---

## 2. Night Attendance Aggregation & Date Stamping

In MongoDB, we prevent multiple attendance entries for the same student on the same day using a **compound unique index**:

```javascript
// server/models/Attendance.js
AttendanceSchema.index({ student: 1, date: 1 }, { unique: true });
```

### Aggregating Monthly Attendance Percentage:
```javascript
const stats = await Attendance.aggregate([
  { $match: { student: studentObjectId } },
  { 
    $group: {
      _id: '$status',
      count: { $sum: 1 }
    }
  }
]);

// Calculation:
// Total Nights = Present + Absent + Leave
// Attendance Rate % = (Present / Total Nights) * 100
```
If `Attendance Rate < 75%`, the system automatically flags an **Attendance Shortage Alert** on the warden's console.

---

## 3. Postman Test Scripts & Automated Assertions

Postman runs JavaScript test assertions automatically after receiving an HTTP response:

### Automated Login & Dynamic Token Capture:
```javascript
// Post-response script for POST /api/auth/login
pm.test("Response status code is 200 OK", function () {
    pm.response.to.have.status(200);
});

pm.test("Response contains valid JWT token", function () {
    const responseJson = pm.response.json();
    pm.expect(responseJson.success).to.be.true;
    pm.expect(responseJson.data.token).to.be.a('string');
    
    // Automatically save token for all subsequent requests in the collection!
    pm.environment.set("authToken", responseJson.data.token);
});
```

### Testing Protected Routes:
In subsequent requests (e.g. `POST /api/leave`), the header is set dynamically:
```
Authorization: Bearer {{authToken}}
```
This enables zero-click regression testing across the entire API suite!

---

## 4. Visitor Security Desk Overstay Algorithm

Campus security policy mandates that all daytime visitors must exit the premises by 8:00 PM:

```javascript
// Querying currently active visitors:
const activeVisitors = await Visitor.find({ status: 'inside' })
  .populate('student', 'rollNumber');

const now = new Date();
const formattedVisitors = activeVisitors.map(visitor => {
  const hoursInside = (now - new Date(visitor.entryTime)) / (1000 * 60 * 60);
  const isOverstay = hoursInside > 4; // Flagged if visiting exceeds 4 hours or past curfew
  
  return {
    ...visitor.toObject(),
    hoursInside: hoursInside.toFixed(1),
    isOverstay
  };
});
```
This allows security guards to immediately contact the resident student and escort unauthorized visitors off campus.
