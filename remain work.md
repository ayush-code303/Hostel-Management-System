# 📝 REMAINING WORK - STUDENT ACTION CHECKLIST (`remain work.md`)

> **Project:** Multi-Hostel Institutional ERP & Campus Residence Management System  
> **Course:** Project-Based Learning (PBL Course, CSE Department)  
> **Academic Session:** 2026–2027  
> **Group Members (Equal 25% Ownership):**  
> 1. **Ayush** (`25ASETCSE019`) - *Lead Backend Architect & System Integrator*  
> 2. **Anushka Upadhyay** (`25ASETCSE022`) - *Lead Frontend Developer & UI/UX Specialist*  
> 3. **Bhoomi Purushwani** (`25ASETCSE035`) - *Operations Console & Database State Specialist*  
> 4. **Palak Saraswat** (`25ASETCSE048`) - *Security Workflows, QA Automation & Documentation Lead*  

---

> [!IMPORTANT]
> **All Software Engineering Code, Modules, UI Redesigns, and Data Pipelines (Weeks 1 to 12) are 100% COMPLETED and VERIFIED in this repository.**  
> - Multi-college smart ID routing (e.g. `25ASETCSE019` -> Sharda University Agra, DTU, IIT Delhi, BHU).  
> - GIGW compliance accessibility bar (A-, A, A+, High Contrast) & live IST clock.  
> - Role separation: Admin (Executive Command Center) vs Warden (Desk & Roll Call) vs Student (Residence Portal).  
> - Analytics SVG charts, 1-click CSV data pipeline, dynamic QR gate passes, Razorpay sandbox payment, mess reviews, profile editor with avatar photo uploader, and official HTML email dispatch modal.  
> 
> **The checklist below consists EXCLUSIVELY of physical, personal, or in-person evaluation activities that only you and your teammates can perform.**

---

## 🏛️ 1. College Submission & Academic Viva Defense (Only You Can Do)

- [ ] **Print & Bind Mid-Term / Final Project Report:**
  - Export [`docs/09_week_midterm_milestone_report.md`](docs/09_week_midterm_milestone_report.md) or the final report to PDF/Word.
  - Print the report for faculty evaluation and attach the official department cover sheet.
  - Ensure all 4 team members' names and roll numbers are printed on the title page.

- [ ] **Faculty Review & Sign-Off:**
  - Present the live system or project report to your assigned PBL Faculty Guide at the Department of Computer Science & Engineering.
  - Obtain faculty review signatures on the Evaluation & Viva Sign-Off Sheet.

- [ ] **Mock Viva Rehearsal with Group Members (25% Equal Contribution):**
  - Rehearse individual technical areas using the prepared viva chapters in `Learning and Tutorials/`:
    - **Ayush (Backend & Systems):** RESTful endpoints, JWT authentication, MongoDB schemas, Razorpay sandbox flow, process unhandled rejection safeguards, Helmet headers ([`Learning and Tutorials/01_ayush-backend_architecture/04_viva_and_interview_prep.md`](Learning%20and%20Tutorials/01_ayush-backend_architecture/04_viva_and_interview_prep.md)).
    - **Anushka (Frontend & GIGW Design):** React 18, Vite bundling, Tailwind CSS, GIGW accessibility toolbar (A-, A, A+, High Contrast mode), multi-institution routing context ([`Learning and Tutorials/02_anushka-student_frontend/04_viva_and_interview_prep.md`](Learning%20and%20Tutorials/02_anushka-student_frontend/04_viva_and_interview_prep.md)).
    - **Bhoomi (Operations & Analytics Hub):** Executive command center, SVG analytics suite (wing occupancy, fee revenue, complaint breakdown), 1-click CSV export pipeline, warden night roll call ([`Learning and Tutorials/03_bhoomi-admin_operations/04_viva_and_interview_prep.md`](Learning%20and%20Tutorials/03_bhoomi-admin_operations/04_viva_and_interview_prep.md)).
    - **Palak (QA, Security & Operational Workflows):** Postman automated test suites (100% pass), biometric roll call, outstation gate passes, dynamic SVG QR code generator, official university HTML email dispatch ([`Learning and Tutorials/04_palak-ops_security_qa/04_viva_and_interview_prep.md`](Learning%20and%20Tutorials/04_palak-ops_security_qa/04_viva_and_interview_prep.md)).

---

## 🔑 2. Third-Party Credentials & API Keys (Only You Can Do)

- [ ] **Personal Razorpay API Keys (Optional for Production Live Mode):**
  - *Current Status:* High-fidelity Sandbox Simulator is fully working without any keys.
  - If you want to connect a live or test Razorpay account, sign up at [https://dashboard.razorpay.com](https://dashboard.razorpay.com), generate Test API Keys, and update `server/.env`:
    ```env
    RAZORPAY_KEY_ID=rzp_test_YourKeyHere
    RAZORPAY_KEY_SECRET=YourSecretHere
    ```

- [ ] **MongoDB Atlas Cloud Connection URI (Optional for Cloud DB):**
  - *Current Status:* Dual-engine architecture automatically uses high-fidelity multi-college seed data if MongoDB is offline.
  - If you want a persistent cloud database, create a free cluster at [https://cloud.mongodb.com](https://cloud.mongodb.com), create a database user, and put your connection URI in `server/.env`:
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/hostel_db?retryWrites=true&w=majority
    ```
    Then run:
    ```powershell
    cd server
    npm run seed
    ```

---

## ☁️ 3. Cloud Deployment Hosting Accounts (Only You Can Do)

- [ ] **Push Local Code to Personal GitHub Repository:**
  - Initialize/sync with your personal GitHub:
    ```powershell
    git add .
    git commit -m "Complete 12-week PBL Multi-Hostel ERP with GIGW redesign"
    git push origin main
    ```

- [ ] **Render.com Web Service (Backend Hosting):**
  - Log in to [https://render.com](https://render.com) with GitHub.
  - Create a new Web Service pointing to repository root `/server`.
  - Set build command: `npm install` and start command: `npm start`.

- [ ] **Vercel Web Service (Frontend Hosting):**
  - Log in to [https://vercel.com](https://vercel.com) with GitHub.
  - Import the repository and configure root directory as `client`.
  - Build command: `npm run build`, output directory: `dist`.

---

## 📱 4. Physical Testing & Live Evaluation Showcase

- [ ] **Mobile Phone Dynamic QR Pass Scanning:**
  - In Student Portal -> Apply Gate Pass -> View Approved Gate Pass -> Open QR Pass.
  - Scan the dynamic SVG QR code using your smartphone camera or Google Lens to verify the encrypted gate pass token.

- [ ] **A4 Paper Fee Receipt Printing:**
  - In Student Portal -> Instant Razorpay Payment -> Download / Print PDF Fee Receipt.
  - Verify alignment and university header formatting on A4 print preview.

- [ ] **1-Click Multi-College Evaluator Demonstration:**
  - In the Login screen (`/login`), click any of the 4 evaluator demo chips:
    - `Ayush (Sharda Student)` -> Auto-fills `25ASETCSE019` -> Directs to Sharda University Agra Student Residence Portal.
    - `Prof. Verma (Warden)` -> Directs to Warden Ground Operations Desk with Night Roll Call.
    - `Director (Admin)` -> Directs to Executive Command Center with SVG Analytics & CSV exports.
    - `Rohan (DTU Delhi Student)` -> Auto-fills `2026DTUCSE042` -> Directs to Delhi Technological University portal.
