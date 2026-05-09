import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle response errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (username, email, password, confirmPassword) =>
    apiClient.post('/auth/register', { username, email, password, confirmPassword }),

  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  getProfile: () =>
    apiClient.get('/auth/profile'),

  updateProfile: (username) =>
    apiClient.put('/auth/profile', { username }),

  getAllUsers: () =>
    apiClient.get('/auth/users'),

  deleteUser: (id) =>
    apiClient.delete(`/auth/users/${id}`)
};

// Task API calls
export const taskAPI = {
  createTask: (title, description, priority) =>
    apiClient.post('/tasks', { title, description, priority }),

  getUserTasks: () =>
    apiClient.get('/tasks'),

  getTaskById: (id) =>
    apiClient.get(`/tasks/${id}`),

  updateTask: (id, title, description, priority, status) =>
    apiClient.put(`/tasks/${id}`, { title, description, priority, status }),

  deleteTask: (id) =>
    apiClient.delete(`/tasks/${id}`),

  getTaskStats: () =>
    apiClient.get('/tasks/stats/overview'),

  getAllTasks: () =>
    apiClient.get('/tasks/all')
};

export default apiClient;
