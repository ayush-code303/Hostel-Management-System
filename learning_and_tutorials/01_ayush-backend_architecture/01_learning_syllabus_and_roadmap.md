# 📘 Learning Syllabus & Phase-by-Phase Roadmap: Ayush (Backend & Architecture)

> **Role:** Lead Architect & Core Backend Engineer  
> **Ownership:** 25% Equal Technical Ownership  
> **Key Domains:** Node.js, Express.js, MongoDB (Mongoose), JWT Security, REST API Architecture, Server Performance

---

## 🎯 Learning Objectives

By following this syllabus, Ayush will master:
1. Asynchronous JavaScript, Node.js event-driven runtime architecture, and non-blocking I/O.
2. Building production-grade RESTful APIs using Express.js middleware pipelines.
3. MongoDB document database modeling, indexing, schema validations, and Mongoose ODM hooks.
4. Stateless user authentication via JSON Web Tokens (JWT) and Role-Based Access Control (RBAC).
5. Secure backend engineering: password hashing with Bcrypt, CORS policies, rate limiting, and Helmet headers.

---

## 📅 Phase-by-Phase Learning Syllabus

### Phase 1: Node.js & Server Fundamentals (Days 1–3)
- **Topics:**
  - What is Node.js? V8 JavaScript Engine and libuv.
  - Event Loop, Call Stack, Microtask vs Macrotask queue.
  - CommonJS (`require` / `module.exports`) vs ES Modules (`import` / `export`).
  - `npm` and package management: `package.json`, `dependencies` vs `devDependencies`.
  - Initializing an Express server: `app.use()`, `app.listen()`, environment variables with `dotenv`.
- **Project Link:**
  - Study file: `server/server.js` and `server/package.json`.

### Phase 2: MongoDB & Mongoose Schema Architecture (Days 4–7)
- **Topics:**
  - SQL vs NoSQL: Documents, Collections, BSON vs JSON.
  - MongoDB Atlas Cloud cluster setup and connection URI strings.
  - Mongoose Connection handling and error events (`mongoose.connect`).
  - Defining Mongoose Schemas: Field types, default values, validations, and timestamps.
  - Object relationships: References (`ObjectId` and `ref`) vs Embedded sub-documents.
  - Mongoose Middleware (Hooks): `pre('save')` for password hashing and cascade operations.
  - Schema methods (`methods`) and static functions (`statics`).
- **Project Link:**
  - Study files: `server/config/db.js` and models in `server/models/` (`User.js`, `Student.js`, `Hostel.js`, `Room.js`, `Fee.js`).

### Phase 3: Authentication, Security & RBAC Middleware (Days 8–11)
- **Topics:**
  - Why plain-text passwords should never be stored: Salt rounds, one-way hashing with `bcryptjs`.
  - What is JWT (JSON Web Token)? Structure: Header, Payload, Signature.
  - Generating tokens on Login/Register (`jwt.sign`) with expiration (`24h`).
  - Auth Middleware: Extracting Bearer tokens from `Authorization` HTTP header, verifying with `jwt.verify`.
  - Role-Based Access Control (RBAC): Creating higher-order middleware `authorize('admin', 'warden')`.
  - Standardized JSON response formatting (`sendSuccess` and `sendError`).
- **Project Link:**
  - Study files: `server/middleware/authMiddleware.js`, `server/middleware/rbacMiddleware.js`, `server/utils/response.js`.

### Phase 4: RESTful API Controllers & Route Mounting (Days 12–16)
- **Topics:**
  - MVC (Model-View-Controller) pattern in Node.js backends.
  - HTTP Verbs: `GET` (fetch), `POST` (create), `PUT`/`PATCH` (update), `DELETE` (remove).
  - HTTP Status Codes: `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `500 Server Error`.
  - Controller functions with `async/await` and centralized `try/catch` or wrapper helpers.
  - Express Router modularization (`express.Router()`).
  - Writing automated Database Seeder scripts (`server/seeder.js`) to insert realistic test records.
- **Project Link:**
  - Study files: `server/controllers/`, `server/routes/`, and `server/seeder.js`.

### Phase 5: Production Hardening, Security & Deployment (Days 17–20)
- **Topics:**
  - Security headers using `helmet`.
  - Cross-Origin Resource Sharing (CORS): Whitelisting client URL (`http://localhost:5173`).
  - HTTP request logging using `morgan`.
  - Rate limiting with `express-rate-limit` to prevent brute force attacks.
  - Hosting backend on Render / Railway with MongoDB Atlas connection string.
