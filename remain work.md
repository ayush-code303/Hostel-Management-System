# 📝 REMAINING WORK - STUDENT ACTION CHECKLIST (`remain work.md`)

> **Project:** Hostel Management System (Sharda University Agra - PBL Course)  
> **Group Members:** Ayush (`25ASETCSE019`), Anushka Upadhyay, Bhoomi Purushwani, Palak Saraswat  
> **Note:** The software engineering code, automated tests, UI components, APIs, and real-time Socket/Razorpay features for **Weeks 8, 9, and 10** are **100% completed**.  
> The items below are physical, personal, or administrative tasks that **only you and your team can perform**.

---

## 🏛️ 1. College Submission & Academic Viva Tasks (Only You Can Do)

- [ ] **Print & Bind Mid-Term Report:**
  - Open [`docs/09_week_midterm_milestone_report.md`](docs/09_week_midterm_milestone_report.md) or export to PDF/Word.
  - Print the report for faculty evaluation and attach the cover page.
- [ ] **Faculty Signatures & Progress Review:**
  - Submit the mid-term report to your assigned PBL Faculty Guide at the Department of Computer Science & Engineering.
  - Obtain the faculty review marks on Section 5 ("Evaluation & Viva Sign-Off Sheet").
- [ ] **Mock Viva Rehearsal with Group Members:**
  - Rehearse individual 25% engineering responsibilities with your teammates using the prepared viva guides:
    - **Ayush:** Backend architecture, MongoDB schemas, JWT auth, Razorpay payments ([`Learning and Tutorials/01_ayush-backend_architecture/04_viva_and_interview_prep.md`](Learning%20and%20Tutorials/01_ayush-backend_architecture/04_viva_and_interview_prep.md)).
    - **Anushka:** React 18, Vite, Tailwind CSS, student dashboard, QR modal ([`Learning and Tutorials/02_anushka-student_frontend/04_viva_and_interview_prep.md`](Learning%20and%20Tutorials/02_anushka-student_frontend/04_viva_and_interview_prep.md)).
    - **Bhoomi:** 11-panel administration hub, complaint triage, data table filters ([`Learning and Tutorials/03_bhoomi-admin_operations/04_viva_and_interview_prep.md`](Learning%20and%20Tutorials/03_bhoomi-admin_operations/04_viva_and_interview_prep.md)).
    - **Palak:** Postman test suite, biometric attendance, gate pass security workflows ([`Learning and Tutorials/04_palak-ops_security_qa/04_viva_and_interview_prep.md`](Learning%20and%20Tutorials/04_palak-ops_security_qa/04_viva_and_interview_prep.md)).

---

## 🔑 2. Third-Party Credentials & API Keys (Only You Can Do)

- [ ] **Personal Razorpay API Keys (Optional for Live Mode):**
  - *Current Status:* High-fidelity Sandbox Simulator is fully working without any keys.
  - If you want to connect a real Razorpay test account, sign up at [https://dashboard.razorpay.com](https://dashboard.razorpay.com), generate Test API Keys, and paste them into `server/.env`:
    ```env
    RAZORPAY_KEY_ID=rzp_test_YourKeyHere
    RAZORPAY_KEY_SECRET=YourSecretHere
    ```
- [ ] **MongoDB Atlas Cloud Connection String (Optional for Cloud DB):**
  - *Current Status:* Dual-engine system automatically runs in zero-setup mock mode if MongoDB is offline.
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

## ☁️ 3. Cloud Deployment Accounts (Planned for Week 11 - Only You Can Do)

- [ ] **GitHub Repository Sync:**
  - Commit and push the updated project files to your personal GitHub repository (`git add .`, `git commit -m "Complete Weeks 8, 9, 10"`, `git push`).
- [ ] **Render.com Account Setup (Backend Hosting):**
  - Sign in to [https://render.com](https://render.com) using your GitHub account.
  - Create a new Web Service pointing to the `/server` folder.
- [ ] **Vercel Account Setup (Frontend Hosting):**
  - Sign in to [https://vercel.com](https://vercel.com) using your GitHub account.
  - Import the repository and set root directory to `client`.

---

## 📱 4. Physical Testing & Live Demonstration

- [ ] **Mobile Device QR Scanner Test:**
  - Launch the app, navigate to Student Portal -> Apply Gate Pass -> View QR Pass.
  - Use your mobile phone camera to scan the dynamic SVG QR code to verify it displays the student token.
- [ ] **Paper Receipt Printing Test:**
  - Click "Download / Print Fee Receipt PDF" in the Student Portal and verify proper layout on standard A4 paper.
