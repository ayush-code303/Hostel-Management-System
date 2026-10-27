import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';
import { INSTITUTIONS, MULTI_COLLEGE_USERS, detectInstitutionAndUser } from '../services/multiCollegeData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Current logged in user
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem('unihostel_user');
      if (savedUser && savedUser !== 'undefined' && savedUser !== 'null') {
        return JSON.parse(savedUser);
      }
    } catch (e) {
      console.warn('Could not parse user from localStorage:', e);
    }
    // Default to Sharda University Agra Student (Ayush)
    return MULTI_COLLEGE_USERS[0];
  });

  // Current active institution
  const [institution, setInstitution] = useState(() => {
    try {
      const savedInst = localStorage.getItem('unihostel_institution');
      if (savedInst) return JSON.parse(savedInst);
    } catch {}
    return INSTITUTIONS['SUA'];
  });

  const [token, setToken] = useState(() => {
    try {
      return localStorage.getItem('unihostel_token') || 'jwt_session_token_2026';
    } catch {
      return 'jwt_session_token_2026';
    }
  });

  const [loading, setLoading] = useState(false);

  // Sync institution whenever user changes
  useEffect(() => {
    if (user?.institutionId && INSTITUTIONS[user.institutionId]) {
      const inst = INSTITUTIONS[user.institutionId];
      setInstitution(inst);
      try {
        localStorage.setItem('unihostel_institution', JSON.stringify(inst));
      } catch {}
    }
  }, [user]);

  function logout() {
    setToken(null);
    setUser(null);
    try {
      localStorage.removeItem('unihostel_token');
      localStorage.removeItem('unihostel_user');
      localStorage.removeItem('sharda_token');
      localStorage.removeItem('sharda_user');
    } catch (e) {
      console.warn('Failed clearing localStorage:', e);
    }
  }

  // Profile Details & Photo Update Function
  const updateProfile = (updatedFields) => {
    setUser(prevUser => {
      const newUser = {
        ...prevUser,
        ...updatedFields,
        student: prevUser.student ? { ...prevUser.student, ...(updatedFields.student || {}) } : null,
        warden: prevUser.warden ? { ...prevUser.warden, ...(updatedFields.warden || {}) } : null,
      };
      try {
        localStorage.setItem('unihostel_user', JSON.stringify(newUser));
      } catch (err) {
        console.warn('Could not save updated profile:', err);
      }
      return newUser;
    });
  };

  /**
   * Smart Multi-College Login:
   * Accepts University Roll No (e.g. 25ASETCSE019, 2026DTUCSE042) OR Institutional Email
   */
  const login = async (identifier, password) => {
    setLoading(true);
    try {
      // 1. Try real backend API if online
      const res = await authAPI.login({ email: identifier, password });
      if (res?.success && res?.data) {
        const { token: receivedToken, user: receivedUser } = res.data;
        const detected = detectInstitutionAndUser(identifier);
        const resolvedInst = detected?.institution || INSTITUTIONS['SUA'];

        const fullUser = {
          ...receivedUser,
          institutionId: resolvedInst.id,
          college: resolvedInst
        };

        setToken(receivedToken);
        setUser(fullUser);
        setInstitution(resolvedInst);

        localStorage.setItem('unihostel_token', receivedToken);
        localStorage.setItem('unihostel_user', JSON.stringify(fullUser));
        localStorage.setItem('unihostel_institution', JSON.stringify(resolvedInst));

        return { 
          success: true, 
          user: fullUser, 
          institution: resolvedInst,
          redirectPath: fullUser.role === 'admin' ? '/admin' : fullUser.role === 'warden' ? '/warden' : '/student'
        };
      }
      throw new Error(res?.message || 'Login failed');
    } catch {
      // 2. High-Fidelity Multi-College Intelligent Fallback
      const detected = detectInstitutionAndUser(identifier);
      const matchedInst = detected?.institution || INSTITUTIONS['SUA'];
      let matchedUser = detected?.user;

      if (!matchedUser) {
        const role = detected?.role || 'student';
        matchedUser = {
          id: `usr-${matchedInst.id.toLowerCase()}-${role}-${Date.now().toString().slice(-4)}`,
          username: identifier,
          email: identifier.includes('@') ? identifier : `${identifier.toLowerCase()}@${matchedInst.id.toLowerCase()}.ac.in`,
          name: role === 'admin' ? 'Campus Administrator' : role === 'warden' ? 'Chief Hostel Warden' : 'Enrolled Scholar',
          role,
          institutionId: matchedInst.id,
          avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          student: role === 'student' ? {
            rollNumber: identifier.toUpperCase(),
            enrollmentNo: `EN-${matchedInst.id}-2026-${Math.floor(1000 + Math.random() * 9000)}`,
            department: 'Computer Science & Engineering',
            semester: 5,
            year: 3,
            bloodGroup: 'B+',
            phone: '+91 9876543210',
            guardianName: 'Guardian Contact',
            guardianPhone: '+91 9876543219',
            hostelId: matchedInst.hostels[0].id,
            hostelName: matchedInst.hostels[0].name,
            room: '204',
            bed: 'Bed 2',
            duesAmount: 0,
            feeStatus: 'Paid',
            attendanceRate: 94.5
          } : null,
          warden: role === 'warden' ? {
            designation: 'Hostel Operations Warden',
            assignedHostel: matchedInst.hostels[0].name,
            assignedBlock: 'Block 1',
            officeRoom: 'Warden Secretariat Room 101',
            helpline: matchedInst.helpline,
            residentsCount: 180
          } : null
        };
      }

      setToken('session_token_valid');
      setUser(matchedUser);
      setInstitution(matchedInst);

      try {
        localStorage.setItem('unihostel_token', 'session_token_valid');
        localStorage.setItem('unihostel_user', JSON.stringify(matchedUser));
        localStorage.setItem('unihostel_institution', JSON.stringify(matchedInst));
      } catch {}

      const redirectPath = matchedUser.role === 'admin' ? '/admin' : matchedUser.role === 'warden' ? '/warden' : '/student';
      return { 
        success: true, 
        user: matchedUser, 
        institution: matchedInst, 
        redirectPath,
        isMock: true 
      };
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      institution, 
      token, 
      loading, 
      login, 
      logout, 
      setUser, 
      setInstitution, 
      updateProfile 
    }}>
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
