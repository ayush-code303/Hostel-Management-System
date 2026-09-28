const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');
const { mockUsers, mockStudents, generateMockToken } = require('../utils/mockData');

/**
 * @desc    Register a new user (Student / Warden / Admin)
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role, rollNumber, department, year, phone, guardianPhone } = req.body;

    // Check if running in Mock Mode
    if (mongoose.connection.readyState !== 1) {
      const newUser = {
        _id: `usr-${Date.now()}`,
        name: name || 'Demo Student',
        email: email || 'student@sharda.ac.in',
        role: role || 'student',
        isActive: true
      };
      const token = generateMockToken(newUser);
      return sendSuccess(res, 'Registration successful (Mock Mode)', {
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          role: newUser.role,
          student: {
            rollNumber: rollNumber || '25ASETCSE019',
            department: department || 'Computer Science & Engineering',
            year: year || 2
          }
        }
      }, 201);
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return sendError(res, 'User with this email already exists', 400);
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'student'
    });

    let studentRecord = null;
    if (user.role === 'student') {
      if (!rollNumber) {
        return sendError(res, 'Roll number is required for student registration', 400);
      }

      const rollExists = await Student.findOne({ rollNumber: rollNumber.toUpperCase() });
      if (rollExists) {
        await User.findByIdAndDelete(user._id);
        return sendError(res, 'A student with this roll number is already registered', 400);
      }

      studentRecord = await Student.create({
        user: user._id,
        rollNumber: rollNumber.toUpperCase(),
        department: department || 'Computer Science & Engineering',
        year: year || 1,
        phone: phone || '9876543210',
        guardianPhone: guardianPhone || '9876543211'
      });
    }

    const token = user.getSignedJwtToken();

    return sendSuccess(res, 'Registration successful', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        student: studentRecord
      }
    }, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error during registration', 500, error);
  }
};

/**
 * @desc    Login user & return JWT token
 * @route   POST /api/auth/login
 * @access  Public
 */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, 'Please provide email and password', 400);
    }

    // Check if running in Mock Mode
    if (mongoose.connection.readyState !== 1) {
      const matchedUser = mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      ) || mockUsers.find(
        u => u.email.toLowerCase() === email.toLowerCase()
      ) || {
        _id: 'usr-student-01',
        name: 'Ayush',
        email: email,
        role: email.includes('admin') ? 'admin' : email.includes('warden') ? 'warden' : 'student',
        isActive: true
      };

      const token = generateMockToken(matchedUser);
      const studentProfile = matchedUser.role === 'student' ? mockStudents[0] : null;

      return sendSuccess(res, 'Login successful (Mock Mode)', {
        token,
        user: {
          id: matchedUser._id,
          name: matchedUser.name,
          email: matchedUser.email,
          role: matchedUser.role,
          student: studentProfile
        }
      });
    }

    // MongoDB Mode
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials', 401);
    }

    if (!user.isActive) {
      return sendError(res, 'Your account has been deactivated. Please contact the administrator.', 403);
    }

    let studentProfile = null;
    if (user.role === 'student') {
      studentProfile = await Student.findOne({ user: user._id })
        .populate({
          path: 'roomAllocation',
          populate: { path: 'room hostel' }
        });
    }

    const token = user.getSignedJwtToken();

    return sendSuccess(res, 'Login successful', {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        student: studentProfile
      }
    });
  } catch (error) {
    return sendError(res, error.message || 'Error during login', 500, error);
  }
};

/**
 * @desc    Get currently logged in user profile
 * @route   GET /api/auth/me
 * @access  Private (Requires token)
 */
const getMe = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const mockUser = req.user || mockUsers[2];
      const studentProfile = mockUser.role === 'student' ? mockStudents[0] : null;

      return sendSuccess(res, 'User profile retrieved (Mock Mode)', {
        user: {
          id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          student: studentProfile
        }
      });
    }

    const user = await User.findById(req.user.id);
    let studentProfile = null;

    if (user.role === 'student') {
      studentProfile = await Student.findOne({ user: user._id })
        .populate({
          path: 'roomAllocation',
          populate: { path: 'room hostel' }
        });
    }

    return sendSuccess(res, 'User profile retrieved', {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        student: studentProfile
      }
    });
  } catch (error) {
    return sendError(res, error.message || 'Error fetching user profile', 500, error);
  }
};

module.exports = {
  register,
  login,
  getMe
};
