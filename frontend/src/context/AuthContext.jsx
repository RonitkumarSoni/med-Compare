import React, { createContext, useState, useContext, useEffect } from 'react';
import * as api from '../api/api';
import supabase from '../utils/supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      // 1. Check Supabase session first (for social logins)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session) {
        setUser(session.user);
        setLoading(false);
      } else {
        // 2. Fallback to custom backend check (for email/password)
        const token = localStorage.getItem('token');
        if (token) {
          try {
            const { data } = await api.getMe();
            setUser(data.data);
          } catch (err) {
            localStorage.removeItem('token');
          }
        }
        setLoading(false);
      }
    };

    initAuth();

    // 3. Listen for Supabase auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email, password) => {
    const { data } = await api.login({ email, password });
    localStorage.setItem('token', data.token);
    setUser(data.data);
    return data;
  };

  const signup = async (userData) => {
    const { data } = await api.signup(userData);
    localStorage.setItem('token', data.token);
    setUser(data.data);
    return data;
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      await api.logout();
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem('token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
