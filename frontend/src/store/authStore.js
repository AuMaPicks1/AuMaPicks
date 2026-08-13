import { create } from 'zustand';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const useAuthStore = create((set) => ({
  user: null,
  token: localStorage.getItem('token') || null,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Error en login', isLoading: false });
      return false;
    }
  },

  register: async (name, email, password, passwordConfirm) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/auth/register`, {
        name,
        email,
        password,
        passwordConfirm
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ user, token, isLoading: false });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.error || 'Error en registro', isLoading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, token: null });
  },

  setUser: (user) => set({ user }),
}));

export default useAuthStore;
