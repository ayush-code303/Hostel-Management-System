const Leave = require('../models/Leave');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Apply for outstation leave pass
 * @route   POST /api/leave
 * @access  Private (Student)
 */
const applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason } = req.body;

    // Find student linked to user
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return sendError(res, 'Student profile not found', 404);
    }

    if (!startDate || !endDate || !reason) {
      return sendError(res, 'Please provide start date, end date, and reason for leave', 400);
    }

    const leave = await Leave.create({
      student: student._id,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason,
      status: 'pending'
    });

    return sendSuccess(res, 'Outstation leave request submitted successfully', leave, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error applying for leave', 500, error);
  }
};

/**
 * @desc    Get leave history for logged in student
 * @route   GET /api/leave/my-leaves
 * @access  Private (Student)
 */
const getMyLeaves = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return sendError(res, 'Student profile not found', 404);
    }

    const leaves = await Leave.find({ student: student._id })
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 'Leave records retrieved', leaves);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching leave records', 500, error);
  }
};

/**
 * @desc    Get all leave requests across the hostel
 * @route   GET /api/leave
 * @access  Private (Warden & Admin)
 */
const getAllLeaves = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'All') {
      query.status = status;
    }

    const leaves = await Leave.find(query)
      .populate({
        path: 'student',
        populate: { path: 'user' }
      })
      .populate('reviewedBy', 'name email')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 'All leave requests retrieved', leaves);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching leave requests', 500, error);
  }
};

/**
 * @desc    Review and approve/reject leave pass request
 * @route   PUT /api/leave/:id/status
 * @access  Private (Warden & Admin)
 */
const reviewLeaveStatus = async (req, res) => {
  try {
    const { status, reviewComments } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return sendError(res, 'Invalid status. Must be "approved" or "rejected"', 400);
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) {
      return sendError(res, 'Leave request not found', 404);
    }

    leave.status = status;
    leave.reviewComments = reviewComments || (status === 'approved' ? 'Approved by Warden' : 'Rejected');
    leave.reviewedBy = req.user.id;
    await leave.save();

    // Generate digital gate pass authorization code if approved
    const passCode = status === 'approved' ? `PASS-SUA-2026-${leave._id.toString().slice(-4).toUpperCase()}` : null;

    return sendSuccess(res, `Leave request has been ${status}`, {
      leave,
      gatePassCode: passCode
    });
  } catch (error) {
    return sendError(res, error.message || 'Error reviewing leave request', 500, error);
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  reviewLeaveStatus
};
