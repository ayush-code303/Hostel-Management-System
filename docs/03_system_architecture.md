# 🏗️ System Architecture & Technical Specification

> **Project:** Hostel Management System  
> **Architecture Pattern:** Decoupled Client-Server MERN Architecture  

---

## 🏛️ Architectural Diagram

```text
  +-------------------------------------------------------------------+
  |                       PRESENTATION LAYER                          |
  |             React.js (Vite) + Tailwind CSS + Lucide               |
  |                                                                   |
  |   +-------------------+   +-----------------+   +-------------+   |
  |   | Student Portal UI |   | Admin Portal UI |   | Warden Desk |   |
  |   +-------------------+   +-----------------+   +-------------+   |
  +---------------------------------+---------------------------------+
                                    | HTTP / REST (Axios)
                                    v
  +-------------------------------------------------------------------+
  |                       APPLICATION LAYER                           |
  |                 Node.js + Express.js Server                       |
  |                                                                   |
  |  +------------------+  +-------------------+  +----------------+  |
  |  | Auth & JWT RBAC  |  | REST Controllers  |  | Business Logic |  |
  |  +------------------+  +-------------------+  +----------------+  |
  +---------------------------------+---------------------------------+
                                    | Mongoose ODM
                                    v
  +-------------------------------------------------------------------+
  |                          DATA LAYER                               |
  |                         MongoDB Atlas                             |
  |                                                                   |
  | Collections: Users, Students, Hostels, Rooms, Allocations,        |
  | Complaints, Fees, Payments, Attendance, Leave, Visitors, Notices  |
  +-------------------------------------------------------------------+
```

---

## 🔐 Security & Authentication Protocol

1. **Authentication:**
   - Password encryption using `bcryptjs` (salt rounds: 10).
   - Stateless authentication via JSON Web Tokens (JWT) signed with `JWT_SECRET`.
   - Expiration set to 1 day / 24 hours.

2. **Authorization & RBAC:**
   - User Roles: `admin`, `warden`, `student`.
   - Backend routes guarded by `authMiddleware` (JWT verification) and `rbacMiddleware` (Role validation).
   - Frontend routes guarded by React Router `ProtectedRoute` and `RoleRoute` wrappers.

---

## 📡 API Contract Conventions

All backend API endpoints conform to a standardized JSON response shape:

```json
{
  "success": true,
  "message": "Human readable status message",
  "data": { ... },
  "error": null
}
```

Standard HTTP Status Codes:
- `200 OK`: Request succeeded.
- `201 Created`: Resource successfully created.
- `400 Bad Request`: Validation failure or business rule violation.
- `401 Unauthorized`: Missing or invalid JWT token.
- `403 Forbidden`: Insufficient role permissions.
- `404 Not Found`: Requested resource does not exist.
- `500 Server Error`: Internal application exception.
