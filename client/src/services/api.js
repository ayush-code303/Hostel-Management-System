import axios from 'axios';

/**
 * Central Axios Instance for Hostel Management System
 * Automatically attaches JWT Bearer token and handles global error responses
 */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Injects stored JWT token into Authorization header
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('sharda_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handles 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear token if expired or invalid
      localStorage.removeItem('sharda_token');
      localStorage.removeItem('sharda_user');
    }
    return Promise.reject(error.response ? error.response.data : error);
  }
);

// API Helper Endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getMe: () => api.get('/auth/me'),
};

export const studentAPI = {
  getAll: (params) => api.get('/students', { params }),
  getById: (id) => api.get(`/students/${id}`),
  update: (id, data) => api.put(`/students/${id}`, data),
};

export const hostelAPI = {
  getAll: () => api.get('/hostels'),
  getById: (id) => api.get(`/hostels/${id}`),
};

export const roomAPI = {
  getAll: (params) => api.get('/rooms', { params }),
  allocate: (data) => api.post('/rooms/allocate', data),
  deallocate: (data) => api.post('/rooms/deallocate', data),
};

export const attendanceAPI = {
  mark: (data) => api.post('/attendance', data),
  getStudentHistory: (studentId) => api.get(`/attendance/student/${studentId}`),
  getStats: () => api.get('/attendance/stats'),
};

export const leaveAPI = {
  apply: (data) => api.post('/leave', data),
  getMyLeaves: () => api.get('/leave/my-leaves'),
  getAll: (params) => api.get('/leave', { params }),
  review: (id, data) => api.put(`/leave/${id}/status`, data),
};

export const visitorAPI = {
  logEntry: (data) => api.post('/visitors', data),
  markExit: (id) => api.put(`/visitors/${id}/exit`),
  getActive: () => api.get('/visitors/active'),
  getAll: () => api.get('/visitors'),
};

export const complaintAPI = {
  create: (data) => api.post('/complaints', data),
  getMyComplaints: () => api.get('/complaints/my-complaints'),
  getAll: (params) => api.get('/complaints', { params }),
  updateStatus: (id, data) => api.put(`/complaints/${id}/status`, data),
};

export const noticeAPI = {
  getActive: (params) => api.get('/notices', { params }),
  create: (data) => api.post('/notices', data),
  delete: (id) => api.delete(`/notices/${id}`),
};

export const feeAPI = {
  getAll: (params) => api.get('/fees', { params }),
  getMyFees: () => api.get('/fees/my-fees'),
  generate: (data) => api.post('/fees', data),
  pay: (id, data) => api.post(`/fees/${id}/pay`, data),
};

export default api;
