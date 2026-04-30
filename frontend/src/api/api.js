import axios from 'axios';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const API = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

import supabase from '../utils/supabaseClient';

// Add a request interceptor to add the auth token to headers
API.interceptors.request.use(async (config) => {
  let token = localStorage.getItem('token');
  
  // If no manual token, check Supabase session
  if (!token) {
    const { data: { session } } = await supabase.auth.getSession();
    token = session?.access_token;
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = (data) => API.post('/auth/login', data);
export const signup = (data) => API.post('/auth/register', data);
export const getMe = () => API.get('/auth/me');
export const logout = () => API.get('/auth/logout');

export default API;
