# 🎓 Viva & Oral Evaluation Preparation: Anushka Upadhyay (Student Experience)

> **Top 20 Questions Frequently Asked by College Evaluators & Technical Examiners**

---

### Q1: What is React and what problem does it solve?
**Answer:** React is an open-source JavaScript library developed by Meta for building user interfaces. It solves the performance and maintenance challenges of manual DOM manipulation by introducing declarative component-based architecture and an in-memory Virtual DOM that batches real DOM updates efficiently.

### Q2: What is JSX (JavaScript XML)?
**Answer:** JSX is a syntax extension for JavaScript that looks similar to HTML. It allows developers to write UI markup directly within JavaScript logic. Under the hood, build tools like Vite (using esbuild) compile JSX into standard `React.createElement()` or `_jsx()` function calls.

### Q3: What is the difference between State and Props in React?
**Answer:** 
- **Props (Properties):** Read-only data passed from a parent component down to a child component. Props are immutable within the receiving child.
- **State:** An internal, mutable data store managed inside a component. When state changes via `setState()`, React triggers a re-render of that component and its children.

### Q4: Why did you choose Vite instead of Create React App (CRA)?
**Answer:** CRA uses Webpack, which bundles the entire application before starting the dev server, resulting in slow startup times (often 30–60 seconds). Vite leverages native browser ES Modules and the ultra-fast Go-based `esbuild` compiler for pre-bundling, providing near-instant server starts (<300ms) and lightning-fast Hot Module Replacement (HMR).

### Q5: How is Dark Mode implemented in your project?
**Answer:** We enabled the `darkMode: 'class'` option in `client/tailwind.config.js`. We created a `ThemeContext` providing `theme` ('light' or 'dark') and `toggleTheme()`. When toggled, the `.dark` class is added to or removed from the root `<html>` element, and the preference is persisted in browser `localStorage`. Tailwind automatically activates all `dark:*` CSS classes.

### Q6: What is the Virtual DOM and how does Reconciliation work?
**Answer:** The Virtual DOM is a lightweight JavaScript object representation of the real DOM. When state changes, React creates a new Virtual DOM tree, compares it with the previous snapshot using a heuristic $O(N)$ diffing algorithm called Reconciliation, and applies only the calculated differences (patches) to the actual browser DOM.

### Q7: What are React Hooks? Why were they introduced?
**Answer:** Hooks are functions that enable functional components to use state and lifecycle features without writing ES6 classes. Introduced in React 16.8, they eliminate `this` binding confusion, promote code reuse through custom hooks, and simplify component logic.

### Q8: What is the purpose of the `useEffect` hook?
**Answer:** `useEffect` performs side effects in functional components, such as fetching data from APIs, directly modifying DOM titles, setting timers, or subscribing to events. The second argument (the dependency array) controls when the effect executes.

### Q9: Why must list items in React have a `key` prop?
**Answer:** The `key` prop provides a unique identity for each rendered element in an array. During the reconciliation diffing phase, keys allow React to identify which items were inserted, updated, or removed, preventing unnecessary re-renders of the entire list.

### Q10: How do you build an interactive modal dialogue in React?
**Answer:** We maintain a boolean state variable, e.g., `const [isOpen, setIsOpen] = useState(false)`. We conditionally render the modal when `isOpen` is true. The modal contains a semi-transparent fixed overlay (`fixed inset-0 bg-black/50 backdrop-blur-sm z-50`) and a centered card with form inputs and close buttons that call `setIsOpen(false)`.

### Q11: What is utility-first CSS? Why Tailwind CSS?
**Answer:** Utility-first CSS uses single-purpose helper classes (e.g. `flex`, `pt-4`, `text-center`, `rounded-lg`) directly in the markup instead of writing custom CSS rules in external stylesheets. This eliminates naming collision headaches, avoids CSS bloat, guarantees design consistency, and speeds up responsive layout development.

### Q12: How does the Student Portal mess menu switch between meal types?
**Answer:** We store the active meal type in state: `const [activeMeal, setActiveMeal] = useState('lunch')`. Clicking button tabs updates this state. The component then filters the menu data object `weeklyMenu[selectedDay][activeMeal]` and dynamically displays the corresponding items without page reload.

### Q13: What are Controlled Components in React forms?
**Answer:** In a controlled component, form input elements (like `<input>`, `<textarea>`, `<select>`) have their values bound to React state via `value={form.subject}` and update state on change via `onChange={(e) => setForm({ ...form, subject: e.target.value })}`. React is the "single source of truth".

### Q14: How does React Router v6 handle Single Page Application navigation?
**Answer:** React Router intercepts internal link clicks (`<Link to="...">`), prevents the default browser HTTP reload, updates the browser URL bar using the HTML5 History API (`pushState`), and dynamically renders the matching component specified in `<Route path="..." element={<Component />} />`.

### Q15: What is Prop Drilling and how did you solve it?
**Answer:** Prop drilling is the process of passing props down through multiple layers of intermediate components that don't need the data themselves just to reach a deeply nested child. We solved this for the theme toggle using React Context (`createContext` and `useContext`).

### Q16: How do you make the Student Dashboard responsive on mobile devices?
**Answer:** Using Tailwind's mobile-first responsive prefixes:
- Metric cards: `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` (1 column on mobile, 2 on tablets, 4 on desktop).
- Tables: Wrapped in `<div className="overflow-x-auto">` so horizontal scrolling works cleanly on small touchscreens.

### Q17: What does `short-circuit evaluation` (`&&`) do in JSX?
**Answer:** In JavaScript, `true && expression` evaluates to `expression`, while `false && expression` evaluates to `false`. In JSX, `{showSuccess && <AlertMessage />}` will render the alert only if `showSuccess` is truthy, and render nothing if falsy.

### Q18: What is the significance of the circular logo and Royal Blue color in the project?
**Answer:** The circular borderless logo (`rounded-full overflow-hidden border-0 shadow-sm`) and Royal Blue palette (`#1D4ED8`) strictly reflect the official visual branding of Sharda University Agra, creating an authentic, professional institutional look.

### Q19: What is component composition?
**Answer:** It is a design pattern in React where complex UIs are constructed by combining smaller, self-contained components together (e.g. `Navbar`, `MetricCard`, `MessTable`, `ModalDialog`) rather than writing one giant monolithic file.

### Q20: How do you optimize React performance?
**Answer:** Techniques include:
1. Using functional updates for state.
2. Memoizing expensive calculations with `useMemo`.
3. Memoizing callback functions passed to children with `useCallback`.
4. Code-splitting routes using `React.lazy()` and `<Suspense>`.
5. Keeping state as local as possible to avoid unnecessary tree re-renders.
