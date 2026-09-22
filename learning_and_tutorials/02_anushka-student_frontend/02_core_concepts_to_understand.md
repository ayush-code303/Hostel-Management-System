# 🧠 Core Frontend Concepts to Understand: Anushka Upadhyay

> **Guide:** Virtual DOM, React Hooks Lifecycle, Tailwind Responsive Grids & Modal State Mechanics

---

## 1. How React Virtual DOM Works

In traditional JavaScript (Vanilla JS), directly manipulating the browser DOM (e.g. `document.getElementById().innerHTML = ...`) is computationally expensive because the browser must recalculate styles, layout, and repaint pixels.

```
State / Props Change
        │
        ▼
[ Render Virtual DOM Tree (In-Memory JavaScript Object) ]
        │
        ▼
[ Diffing Algorithm (Reconciliation) ]
Compare New Virtual DOM with Previous Virtual DOM Snapshot
        │
        ▼
[ Batch Minimal Real DOM Updates ]
Only change the specific text node or class name in the real browser DOM!
```

**Why this matters in our Student Portal:**
When Ayush changes the active meal tab from "Lunch" to "Dinner" in the mess menu, React does not refresh the entire page. It only updates the small table containing the food items in milliseconds.

---

## 2. React Hooks Anatomy (`useState` & `useEffect`)

Hooks are special functions that let functional components hook into React state and lifecycle features.

### `useState` for Interactive Modals:
```jsx
// client/src/pages/student/StudentDashboard.jsx
const [isComplaintModalOpen, setIsComplaintModalOpen] = useState(false);

// Opening modal:
<button onClick={() => setIsComplaintModalOpen(true)}>
  + Lodge Complaint
</button>

// Conditional Rendering:
{isComplaintModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl w-full max-w-lg">
      <h3 className="text-xl font-bold text-slate-800 dark:text-white">Lodge Room Complaint</h3>
      {/* Form inputs */}
      <button onClick={() => setIsComplaintModalOpen(false)}>Cancel</button>
    </div>
  </div>
)}
```

### `useEffect` Dependency Array Rules:
1. `useEffect(() => { ... })`: Runs after **every** render.
2. `useEffect(() => { ... }, [])`: Runs **only once** on component mount (ideal for initial data loading).
3. `useEffect(() => { ... }, [filter])`: Runs on mount and whenever `filter` value changes.

---

## 3. Dark & Light Theme State via React Context

Instead of manually passing theme props through 15 nested components ("prop drilling"), we use `createContext` and a custom hook:

```
                  [ ThemeProvider ] (Holds currentTheme: 'light' | 'dark')
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
    [ Navbar ]     [ LandingPage ]   [ StudentDashboard ]
         │
  [ ToggleButton ]
  (Calls toggleTheme() ➔ updates document.documentElement.classList)
```

### How Tailwind Dark Mode Works:
When the theme is toggled:
```javascript
if (theme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}
```
Tailwind CSS automatically detects the `.dark` class on the `<html>` root and applies all `dark:*` utility styles!

---

## 4. Single Page Application (SPA) vs Multi-Page Website

| Traditional Multi-Page Application (MPA) | Modern Single Page Application (React SPA) |
| :--- | :--- |
| Every link click requests a brand new HTML page from the server. | Browser downloads one HTML bundle (`index.html`) and JavaScript bundle once. |
| Visible white screen flash during page reloads. | Zero screen flash; components swap instantly in the browser. |
| Server handles routing. | React Router intercepts URL changes and renders matched components client-side. |
| Slower perceived navigation speed. | Instant, silky-smooth mobile app-like transitions. |
