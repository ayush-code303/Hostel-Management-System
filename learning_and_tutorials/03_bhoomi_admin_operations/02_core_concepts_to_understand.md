# 🧠 Core Admin & Operations Concepts to Understand: Bhoomi Purushwani

> **Guide:** Multi-Panel Routing, Live Table Filtering, Axios Interceptors & Room Capacity Visualizers

---

## 1. Single-Component Multi-Panel Admin Architecture

Instead of having 11 separate page reloads that make the admin interface slow, we structure the `AdminDashboard` with a centralized active tab controller:

```
[ Admin Sidebar Navigation ]
├── Overview (`overview`) ────────► Renders: <OverviewPanel />
├── Students (`students`) ────────► Renders: <StudentDirectoryPanel />
├── Hostels (`hostels`) ──────────► Renders: <HostelBlocksPanel />
├── Rooms (`rooms`) ──────────────► Renders: <RoomInventoryPanel />
├── Allocations (`allocations`) ──► Renders: <AllocationsPanel />
├── Fees (`fees`) ────────────────► Renders: <FeeManagementPanel />
├── Complaints (`complaints`) ────► Renders: <ComplaintsDeskPanel />
├── Attendance (`attendance`) ────► Renders: <AttendanceLogPanel />
├── Leave Requests (`leave`) ─────► Renders: <LeaveApprovalsPanel />
├── Visitors (`visitors`) ────────► Renders: <VisitorRegistryPanel />
└── Notices (`notices`) ──────────► Renders: <NoticePublisherPanel />
```

### Clean Implementation Pattern:
```jsx
const [activeTab, setActiveTab] = useState('overview');

return (
  <div className="flex min-h-screen">
    <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
    <main className="flex-1 p-6">
      {activeTab === 'overview' && <OverviewPanel />}
      {activeTab === 'students' && <StudentDirectoryPanel />}
      {activeTab === 'rooms' && <RoomInventoryPanel />}
      {/* ...other panels */}
    </main>
  </div>
);
```

---

## 2. Real-Time Table Multi-Search Algorithm

When an admin types in the search bar, we filter without making unnecessary backend requests:

```javascript
const filteredStudents = students.filter(student => {
  const matchesSearch = 
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.room.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesHostel = 
    selectedHostel === 'All' || student.hostel === selectedHostel;

  const matchesStatus = 
    selectedStatus === 'All' || student.status === selectedStatus;

  return matchesSearch && matchesHostel && matchesStatus;
});
```
This guarantees instantaneous search results as the admin types, even with hundreds of student records.

---

## 3. Axios Interceptor Pattern for Seamless Authentication

Instead of manually attaching `headers: { Authorization: 'Bearer ...' }` in every single fetch call, an Axios instance does it automatically:

```javascript
// client/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
});

// Request Interceptor: Attach token before request is sent
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Catch 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
```

---

## 4. Room Capacity Visualizer Mechanics

To prevent human error during room allocation, we visually calculate and display occupancy percentages:

```jsx
const occupancyPercentage = Math.round((room.occupied / room.capacity) * 100);

<div className="w-full bg-slate-200 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
  <div 
    className={`h-full transition-all duration-500 ${
      occupancyPercentage === 100 
        ? 'bg-rose-500' 
        : occupancyPercentage >= 66 
        ? 'bg-amber-500' 
        : 'bg-emerald-500'
    }`}
    style={{ width: `${occupancyPercentage}%` }}
  />
</div>
```
- **0%–65%:** Green (Available)
- **66%–99%:** Yellow (Partially Full)
- **100%:** Red (Fully Booked - Button disabled)
