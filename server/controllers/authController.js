const User = require('../models/User');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Register a new user (Student / Warden / Admin)
 * @route   POST /api/auth/register
 * @access  Public
 */
const register = async (req, res) => {
  try {
    const { name, email, password, role, rollNumber, department, year, phone, guardianPhone } = req.body;

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

    // If role is student, create associated Student record
    let studentRecord = null;
    if (user.role === 'student') {
      if (!rollNumber) {
        return sendError(res, 'Roll number is required for student registration', 400);
      }

      // Check if roll number already exists
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

    // Generate JWT token
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

    // Validate email & password inputs
    if (!email || !password) {
      return sendError(res, 'Please provide email and password', 400);
    }

    // Find user by email and select password field
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return sendError(res, 'Invalid credentials', 401);
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials', 401);
    }

    if (!user.isActive) {
      return sendError(res, 'Your account has been deactivated. Please contact the administrator.', 403);
    }

    // Fetch student profile if user is a student
    let studentProfile = null;
    if (user.role === 'student') {
      studentProfile = await Student.findOne({ user: user._id })
        .populate({
          path: 'roomAllocation',
          populate: { path: 'room hostel' }
        });
    }

    // Generate token
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
