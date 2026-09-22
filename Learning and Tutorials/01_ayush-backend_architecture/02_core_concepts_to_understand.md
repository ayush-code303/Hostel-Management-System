# 🧠 Core Backend Concepts to Understand: Ayush

> **Guide:** Deep Technical Explanations, Code Walkthroughs & Architecture Diagrams

---

## 1. Node.js Event Loop & Non-Blocking I/O

Unlike traditional multi-threaded servers (like Apache) that spawn a heavy operating system thread for each incoming connection, Node.js uses a **Single-Threaded Event Loop** based on the Google V8 engine and the C++ `libuv` library.

```
Incoming Requests ──► [ Event Queue ] ──► [ Event Loop (Single Thread) ]
                                                    │
                   ┌────────────────────────────────┴────────────────────────┐
                   │ Non-blocking? Process immediately and respond!          │
                   │ Database / File / Network I/O? Delegate to Worker Pool! │
                   └────────────────┬────────────────────────────────────────┘
                                    ▼
                         [ libuv Worker Thread Pool ]
                                    │
                         (Task Finishes ➔ Callback back to Queue)
```

**Why this matters in our Hostel Management System:**
When 500 students submit attendance or check room availability at 8:00 PM, the server does not freeze. The single thread quickly accepts the HTTP request, delegates the MongoDB query to the database driver asynchronously, and moves on to the next student immediately.

---

## 2. JSON Web Token (JWT) Authentication Lifecycle

We use **stateless authentication**. The server does not store user session cookies in RAM or Redis. Instead, upon successful password validation, the server issues an encrypted cryptographic token:

```
[ Client: React App ]                                     [ Server: Express API ]
       │                                                              │
       │─── 1. POST /api/auth/login { email, password } ─────────────►│
       │                                                              │ (Verifies bcrypt hash)
       │◄── 2. Returns JSON { token: "eyJhbGciOiJIUz..." } ───────────│
       │                                                              │
       │ (Saves token to localStorage)                                │
       │                                                              │
       │─── 3. GET /api/students (Header: "Bearer eyJhbGciOi...") ───►│
       │                                                              │ (authMiddleware verifies
       │                                                              │  token signature & role)
       │◄── 4. Returns requested student data ────────────────────────│
```

### Structure of a JWT Token:
1. **Header:** `{"alg": "HS256", "typ": "JWT"}` (Base64 encoded)
2. **Payload:** `{"id": "60d0fe...", "role": "admin", "iat": 162..., "exp": 163...}`
3. **Signature:** `HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)`

---

## 3. Role-Based Access Control (RBAC) Chain

Our system defines 3 distinct roles:
1. `admin` (Chief Warden, System Administrator)
2. `warden` (Hostel Block Warden)
3. `student` (Resident Student)

We implement this using Express middleware chaining:
```javascript
// Example from server/routes/studentRoutes.js
router.get(
  '/', 
  protect,                     // Step 1: Must have valid JWT token
  authorize('admin', 'warden'), // Step 2: Role must be admin or warden
  getAllStudents               // Step 3: Controller execution
);
```

If a student attempts to access `/api/students` directly via Postman or browser, `authorize` halts execution and immediately returns HTTP `403 Forbidden: User role [student] is not authorized to access this route`.

---

## 4. Mongoose ODM: Schemas, Pre-Save Hooks & References

In MongoDB, data is stored in flexible BSON documents. Mongoose adds schema validation and relationship management:

### Pre-Save Hook for Password Hashing:
```javascript
// server/models/User.js
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});
```
*Why?* The controller does not have to remember to hash the password manually. Any time a user document is created or password changed, Mongoose automatically hashes it with a cryptographic salt!

### ObjectId Population (`ref`):
```javascript
// Linking Student to Room Allocation
const student = await Student.findOne({ rollNumber: '25ASETCSE019' })
  .populate('user', 'name email avatar')
  .populate({
    path: 'roomAllocation',
    populate: { path: 'room hostel' }
  });
```
This performs a query join in memory, attaching the student's name, assigned hostel block name (e.g. "Nelson Mandela Boys Hostel"), and room number (e.g. "Room 204") in one clean object.
