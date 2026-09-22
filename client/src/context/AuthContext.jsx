import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('sharda_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('sharda_token') || null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token && !user) {
      authAPI.getMe()
        .then((res) => {
          if (res.data?.user) {
            setUser(res.data.user);
            localStorage.setItem('sharda_user', JSON.stringify(res.data.user));
          }
        })
        .catch(() => {
          logout();
        });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      if (res.success && res.data) {
        const { token: receivedToken, user: receivedUser } = res.data;
        setToken(receivedToken);
        setUser(receivedUser);
        localStorage.setItem('sharda_token', receivedToken);
        localStorage.setItem('sharda_user', JSON.stringify(receivedUser));
        return { success: true, user: receivedUser };
      }
      return { success: false, message: res.message || 'Login failed' };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Failed to connect to backend server. Using offline session.'
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('sharda_token');
    localStorage.removeItem('sharda_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
