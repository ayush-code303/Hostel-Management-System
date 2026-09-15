# 🎨 Learning Syllabus & Phase-by-Phase Roadmap: Anushka Upadhyay (Student Experience)

> **Role:** Frontend Lead & Student Experience Engineer  
> **Ownership:** 25% Equal Technical Ownership  
> **Key Domains:** React 18, Vite, Tailwind CSS, Lucide React Icons, React Router v6, Component Modals, Student Portal UX

---

## 🎯 Learning Objectives

By following this syllabus, Anushka will master:
1. Modern React 18 component design, JSX rendering, and virtual DOM diffing.
2. Building responsive, accessible UIs using utility-first Tailwind CSS and theme design tokens.
3. Managing local and shared component states using React Hooks (`useState`, `useEffect`, `useContext`).
4. Client-side Single Page Application (SPA) routing with React Router v6.
5. Creating interactive modal overlays, form input validations, and dynamic card layouts for the student portal.

---

## 📅 Phase-by-Phase Learning Syllabus

### Phase 1: React Fundamentals & Vite Tooling (Days 1–3)
- **Topics:**
  - What is React? Declarative vs Imperative UI programming.
  - Vite vs Create React App (CRA): Why Vite is 10x faster (Native ES modules & esbuild).
  - JSX syntax rules: Embedding expressions `{expression}`, fragments `<>`, self-closing tags.
  - Functional Components and Props: Passing data from parent to child components.
  - Component trees and clean directory structuring (`components/`, `pages/`, `layouts/`).
- **Project Link:**
  - Study files: `client/src/App.jsx`, `client/src/main.jsx`, and `client/vite.config.js`.

### Phase 2: Tailwind CSS & Sharda Brand Design System (Days 4–7)
- **Topics:**
  - Utility-first CSS philosophy: Margin (`m-`), padding (`p-`), flexbox (`flex`, `items-center`, `justify-between`), grid layouts (`grid grid-cols-1 md:grid-cols-4`).
  - Custom colors and theme configuration in `tailwind.config.js` (Royal Blue `#1D4ED8`).
  - Dark mode implementation via `class` strategy (`dark:bg-slate-900`, `dark:text-white`).
  - Responsive design with Tailwind breakpoints (`sm:`, `md:`, `lg:`, `xl:`).
  - Clean iconography using `lucide-react`.
- **Project Link:**
  - Study files: `client/tailwind.config.js`, `client/src/index.css`, and `client/src/layouts/Navbar.jsx`.

### Phase 3: React State Management & Hooks (Days 8–11)
- **Topics:**
  - What is State? Immutability and re-rendering triggers.
  - The `useState` hook: Reading state, updater functions, and avoiding direct mutation.
  - The `useEffect` hook: Lifecycle phases (mount, update, unmount), dependency arrays `[]`.
  - The `useContext` hook: Global state sharing without prop drilling (used for `ThemeContext`).
  - Controlled form inputs: Managing `value` and `onChange` events in React forms.
- **Project Link:**
  - Study files: `client/src/context/ThemeContext.jsx` and `client/src/pages/student/StudentDashboard.jsx`.

### Phase 4: Student Portal Interactive Modals & UX (Days 12–16)
- **Topics:**
  - Building accessible modal dialogue overlays with backdrop click and escape handlers.
  - Dynamic state triggers for multiple popups:
    - 🛠️ Maintenance Complaint Form (Category, priority, description, file upload).
    - 📑 Outstation Leave Pass (Dates, destination, parent phone verification).
    - 🍛 Weekly Mess Menu (Tabs for Monday–Sunday meals).
    - 💳 Fee Receipt Download Modal.
  - Conditional rendering: Ternary operators `condition ? <Component /> : null` and short-circuit `&&`.
  - Rendering dynamic lists with `.map()` and assigning unique `key` props.
- **Project Link:**
  - Study file: `client/src/pages/student/StudentDashboard.jsx`.

### Phase 5: Client-Side Routing & Public Landing Page (Days 17–20)
- **Topics:**
  - React Router v6: `<BrowserRouter>`, `<Routes>`, `<Route>`, `<Link>`, and `useNavigate`.
  - Building high-converting landing pages: Hero section, campus amenities grid, live statistics counters.
  - Seamless navigation between Public Homepage (`/`), Student Portal (`/student`), Login (`/login`), and Admin (`/admin`).
- **Project Link:**
  - Study files: `client/src/pages/LandingPage.jsx` and `client/src/App.jsx`.
