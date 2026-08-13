import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Agregar token a las peticiones
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const productService = {
  getAll: (params) => axiosInstance.get('/products', { params }),
  getById: (id) => axiosInstance.get(`/products/${id}`),
  create: (data) => axiosInstance.post('/products', data),
  update: (id, data) => axiosInstance.put(`/products/${id}`, data),
  delete: (id) => axiosInstance.delete(`/products/${id}`),
  getByCategory: (category) => axiosInstance.get(`/products/category/${category}`),
};

export const authService = {
  login: (email, password) => axiosInstance.post('/auth/login', { email, password }),
  register: (data) => axiosInstance.post('/auth/register', data),
  getMe: () => axiosInstance.get('/auth/me'),
  logout: () => axiosInstance.post('/auth/logout'),
};

export const userService = {
  getProfile: () => axiosInstance.get('/users/profile'),
  updateProfile: (data) => axiosInstance.put('/users/profile', data),
  changePassword: (data) => axiosInstance.put('/users/password', data),
  getAddress: () => axiosInstance.get('/users/address'),
  updateAddress: (data) => axiosInstance.put('/users/address', data),
};

export const orderService = {
  create: (data) => axiosInstance.post('/orders', data),
  getAll: () => axiosInstance.get('/orders'),
  getById: (id) => axiosInstance.get(`/orders/${id}`),
  updateStatus: (id, status) => axiosInstance.put(`/orders/${id}/status`, { status }),
};

export const paymentService = {
  createIntent: (orderId) => axiosInstance.post('/payments/create-intent', { orderId }),
  confirm: (orderId, paymentId) => axiosInstance.post('/payments/confirm', { orderId, paymentId }),
};

export default axiosInstance;
