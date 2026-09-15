# 🎓 Viva & Oral Evaluation Preparation: Ayush (Backend Architecture)

> **Top 20 Questions Frequently Asked by College Evaluators & Technical Examiners**

---

### Q1: What is the MERN stack, and why did you choose it for this project?
**Answer:** MERN stands for MongoDB, Express.js, React.js, and Node.js. We chose it because it allows end-to-end development in a single unified language—JavaScript. Node.js and Express handle high-concurrency non-blocking I/O, MongoDB provides flexible JSON-like document storage well-suited for university records, and React delivers a fast single-page user interface.

### Q2: How does Node.js handle concurrent requests despite being single-threaded?
**Answer:** Node.js uses a single-threaded Event Loop driven by Google V8 and the `libuv` C++ library. When an asynchronous operation (such as a database query or network request) is initiated, Node offloads it to the `libuv` worker thread pool. Once finished, its callback is queued in the Event Queue, allowing the main thread to handle incoming requests without blocking.

### Q3: What is the role of Express.js middleware?
**Answer:** Middleware functions are functions that have access to the request object (`req`), the response object (`res`), and the `next` function in the application’s request-response cycle. They perform tasks such as body parsing (`express.json`), security header injection (`helmet`), authentication verification (`authMiddleware`), and logging (`morgan`).

### Q4: How does JWT authentication work in your application?
**Answer:** When a user logs in with valid credentials, the server signs a JSON Web Token using `jwt.sign()` containing the user's `id` and `role`, signed with a private `JWT_SECRET`. The client stores this token in `localStorage` and transmits it in the `Authorization: Bearer <token>` header for subsequent requests. The `protect` middleware uses `jwt.verify()` to validate the signature and extract the user's identity statelessly.

### Q5: What is the difference between SQL and NoSQL? Why MongoDB?
**Answer:** SQL databases (e.g. MySQL, PostgreSQL) are relational, table-based, with fixed rigid schemas. NoSQL databases (e.g. MongoDB) store data in flexible, schemaless BSON documents. We chose MongoDB because hostel records (complaints, allocations, leaves) have dynamic nested attributes that align naturally with JavaScript JSON objects, and Mongoose provides rich validation on top of it.

### Q6: How do you prevent plain-text password leakage?
**Answer:** We use `bcryptjs` with a salt factor of 10. A pre-save Mongoose hook (`UserSchema.pre('save')`) automatically generates a cryptographic salt and hashes the password before writing it to MongoDB. Even if the database is exposed, the actual passwords cannot be reversed.

### Q7: What is Role-Based Access Control (RBAC)? How is it implemented?
**Answer:** RBAC restricts system access based on user roles (`admin`, `warden`, `student`). In our codebase, the `authorize(...roles)` middleware checks `req.user.role`. If the role is not included in the allowed list, it halts the request with HTTP `403 Forbidden`.

### Q8: What are HTTP Status Codes, and which ones does your API use?
**Answer:** Status codes indicate the result of the HTTP request:
- `200 OK`: Successful retrieval or update.
- `201 Created`: Successful resource creation (e.g., student registered, complaint lodged).
- `400 Bad Request`: Validation failure or missing required fields.
- `401 Unauthorized`: Missing or invalid JWT token.
- `403 Forbidden`: Valid token, but user lacks role permission.
- `404 Not Found`: Resource or route does not exist.
- `500 Internal Server Error`: Unhandled server exception.

### Q9: What is Cross-Origin Resource Sharing (CORS)?
**Answer:** CORS is a browser security mechanism that restricts a web page from making requests to a different domain/port than the one that served it. Our React frontend runs on port 5173 while the Express server runs on port 5000. We configure `cors({ origin: 'http://localhost:5173', credentials: true })` to allow cross-origin API calls.

### Q10: How do you handle room allocation capacity enforcement in the database?
**Answer:** In the allocation controller, before assigning a student to a room, we query the `Room` document to check its `capacity` and current `occupied` count. If `occupied >= capacity`, the server rejects the request with `400 Bad Request: Room is at maximum capacity`. If space is available, the allocation record is created and `occupied` is incremented.

### Q11: What is Mongoose Population (`populate()`)?
**Answer:** It is Mongoose's virtual join mechanism. Since MongoDB does not have SQL `JOIN`, `.populate('user', 'name email')` replaces an `ObjectId` reference with the referenced document from the `users` collection.

### Q12: Why do you have a `server/seeder.js` script?
**Answer:** The seeder script automates the generation of initial test data (Admin accounts, Wardens, Student Ayush `25ASETCSE019`, hostel blocks Mandela & Tagore, rooms, fee structures). This allows anyone on the team to set up a working database in seconds using `npm run seed`.

### Q13: What does the `helmet` package do?
**Answer:** Helmet is a security middleware that sets various HTTP response headers (such as `X-Content-Type-Options`, `Strict-Transport-Security`, `X-Frame-Options`) to protect against common web vulnerabilities like Cross-Site Scripting (XSS) and clickjacking.

### Q14: How are environment variables managed?
**Answer:** We use the `dotenv` package. Sensitive configuration values like `PORT`, `MONGO_URI`, `JWT_SECRET`, and `JWT_EXPIRE` are stored in `.env` (which is git-ignored) and accessed via `process.env`.

### Q15: What is the difference between `PUT` and `PATCH`?
**Answer:** `PUT` is idempotent and replaces the entire resource with the submitted payload. `PATCH` applies partial modifications to an existing resource.

### Q16: How do you handle database disconnection errors?
**Answer:** In `server/config/db.js`, `mongoose.connect()` is wrapped in a `try...catch` block. If connection fails, the error is logged to console and `process.exit(1)` terminates the process cleanly, preventing the server from serving requests in an unhealthy state.

### Q17: What is the purpose of `server/utils/response.js`?
**Answer:** It standardizes the JSON response contract across all endpoints. Every API returns an identical envelope: `{ success: Boolean, message: String, data: Any, error: Any }`, which simplifies frontend error handling and Postman test assertions.

### Q18: What is rate limiting and why is it important?
**Answer:** Rate limiting caps the number of requests a single IP address can make within a specified time window (e.g. 100 requests per 15 minutes). It protects the server from Denial of Service (DoS) attacks and brute-force password guessing.

### Q19: What is indexing in MongoDB?
**Answer:** Indexes are special data structures (B-trees) that store a small portion of the collection's data set in an easy-to-traverse form. For example, indexing `rollNumber` in `Student` and `email` in `User` speeds up search lookups from $O(N)$ full-collection scans to $O(\log N)$.

### Q20: If the backend crashes in production, how do you ensure zero downtime?
**Answer:** In production, we run the Node application using process managers like **PM2** or containerize it with **Docker**. PM2 automatically restarts the process on uncaught exceptions, manages cluster mode across CPU cores, and streams error logs.
