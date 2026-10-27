const mongoose = require('mongoose');
const Student = require('../models/Student');
const User = require('../models/User');
const { sendSuccess, sendError } = require('../utils/response');
const { mockStudents } = require('../utils/mockData');

/**
 * @desc    Get all students (with search, filter, pagination)
 * @route   GET /api/students
 * @access  Private (Admin & Warden)
 */
const getAllStudents = async (req, res) => {
  try {
    const { search, department, year, page = 1, limit = 50 } = req.query;

    // Mock Mode Fallback
    if (mongoose.connection.readyState !== 1) {
      let filtered = [...mockStudents];

      if (department && department !== 'All') {
        filtered = filtered.filter(s => s.department === department);
      }
      if (year && year !== 'All') {
        filtered = filtered.filter(s => s.year === Number(year));
      }
      if (search) {
        const term = search.toLowerCase();
        filtered = filtered.filter(s =>
          s.user.name.toLowerCase().includes(term) ||
          s.rollNumber.toLowerCase().includes(term) ||
          s.department.toLowerCase().includes(term)
        );
      }

      return sendSuccess(res, 'Students retrieved successfully (Mock Mode)', {
        total: filtered.length,
        page: Number(page),
        limit: Number(limit),
        students: filtered
      });
    }

    let query = {};
    if (department && department !== 'All') query.department = department;
    if (year && year !== 'All') query.year = Number(year);

    let students = await Student.find(query)
      .populate('user', 'name email avatar isActive')
      .populate({
        path: 'roomAllocation',
        populate: { path: 'room hostel' }
      })
      .sort({ createdAt: -1 });

    if (search) {
      const term = search.toLowerCase();
      students = students.filter(s => 
        (s.user?.name && s.user.name.toLowerCase().includes(term)) ||
        (s.rollNumber && s.rollNumber.toLowerCase().includes(term)) ||
        (s.department && s.department.toLowerCase().includes(term))
      );
    }

    const total = students.length;
    const startIndex = (page - 1) * limit;
    const paginatedStudents = students.slice(startIndex, startIndex + Number(limit));

    return sendSuccess(res, 'Students retrieved successfully', {
      total,
      page: Number(page),
      limit: Number(limit),
      students: paginatedStudents
    });
  } catch (error) {
    return sendError(res, error.message || 'Error fetching students', 500, error);
  }
};

/**
 * @desc    Get single student by ID
 * @route   GET /api/students/:id
 * @access  Private (Admin, Warden, or Student Self)
 */
const getStudentById = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const found = mockStudents.find(s => s._id === req.params.id) || mockStudents[0];
      return sendSuccess(res, 'Student retrieved successfully (Mock Mode)', found);
    }

    const student = await Student.findById(req.params.id)
      .populate('user', 'name email avatar isActive')
      .populate({
        path: 'roomAllocation',
        populate: { path: 'room hostel' }
      });

    if (!student) {
      return sendError(res, 'Student record not found', 404);
    }

    return sendSuccess(res, 'Student retrieved successfully', student);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching student', 500, error);
  }
};

/**
 * @desc    Update student details
 * @route   PUT /api/students/:id
 * @access  Private (Admin & Warden)
 */
const updateStudent = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      const found = mockStudents.find(s => s._id === req.params.id) || mockStudents[0];
      Object.assign(found, req.body);
      return sendSuccess(res, 'Student record updated (Mock Mode)', found);
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return sendError(res, 'Student not found', 404);
    }

    Object.assign(student, req.body);
    await student.save();

    return sendSuccess(res, 'Student record updated successfully', student);
  } catch (error) {
    return sendError(res, error.message || 'Error updating student', 500, error);
  }
};

/**
 * @desc    Delete student record & user account
 * @route   DELETE /api/students/:id
 * @access  Private (Admin only)
 */
const deleteStudent = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Student removed (Mock Mode)');
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return sendError(res, 'Student not found', 404);
    }

    await User.findByIdAndDelete(student.user);
    await Student.findByIdAndDelete(req.params.id);

    return sendSuccess(res, 'Student and associated user account removed');
  } catch (error) {
    return sendError(res, error.message || 'Error deleting student', 500, error);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
};
