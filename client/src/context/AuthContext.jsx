import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('sharda_user');
      if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.warn('Could not parse saved user from localStorage:', e);
    }
    // Default mock user for zero-setup demo
    return {
      id: 'usr-student-01',
      name: 'Ayush',
      email: 'ayush@sharda.ac.in',
      role: 'student',
      student: {
        rollNumber: '25ASETCSE019',
        department: 'Computer Science & Engineering',
        year: 2,
        hostel: 'Nelson Mandela Boys Hostel (Block B)',
        room: '204'
      }
    };
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('sharda_token') || 'mock_jwt_token_ayush_2026';
    } catch {
      return 'mock_jwt_token_ayush_2026';
    }
  });

  const [loading, setLoading] = useState(false);

  function logout() {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem('sharda_token');
      localStorage.removeItem('sharda_user');
    } catch (e) {
      console.warn('Failed clearing localStorage:', e);
    }
  }

  useEffect(() => {
    if (token && !user) {
      authAPI.getMe()
        .then((res) => {
          if (res?.data?.user) {
            setUser(res.data.user);
            try {
              localStorage.setItem('sharda_user', JSON.stringify(res.data.user));
            } catch (err) {
              console.warn('Failed to save user:', err);
            }
          }
        })
        .catch(() => {
          // If offline, keep mock student session active
          setUser({
            id: 'usr-student-01',
            name: 'Ayush',
            email: 'ayush@sharda.ac.in',
            role: 'student',
            student: {
              rollNumber: '25ASETCSE019',
              department: 'Computer Science & Engineering',
              year: 2
            }
          });
        });
    }
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await authAPI.login({ email, password });
      if (res?.success && res?.data) {
        const { token: receivedToken, user: receivedUser } = res.data;
        setToken(receivedToken);
        setUser(receivedUser);
        try {
          localStorage.setItem('sharda_token', receivedToken);
          localStorage.setItem('sharda_user', JSON.stringify(receivedUser));
        } catch (e) {
          console.warn(e);
        }
        return { success: true, user: receivedUser };
      }
      throw new Error(res?.message || 'Login failed');
    } catch (error) {
      // Offline fallback: Automatically authenticate based on role in email
      const role = email.includes('admin') ? 'admin' : email.includes('warden') ? 'warden' : 'student';
      const fallbackUser = {
        id: `usr-${role}-01`,
        name: role === 'admin' ? 'Dr. R. K. Sharma' : role === 'warden' ? 'Prof. Virendra Verma' : 'Ayush',
        email: email || `${role}@sharda.ac.in`,
        role,
        student: role === 'student' ? {
          rollNumber: '25ASETCSE019',
          department: 'Computer Science & Engineering',
          year: 2,
          room: '204',
          hostel: 'Nelson Mandela Boys Hostel (Block B)'
        } : null
      };
      setToken('mock_session_token');
      setUser(fallbackUser);
      return { success: true, user: fallbackUser, isMock: true };
    } finally {
      setLoading(false);
    }
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
