const mongoose = require('mongoose');
const Leave = require('../models/Leave');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');
const { mockLeaves } = require('../utils/mockData');

const applyLeave = async (req, res) => {
  try {
    const { startDate, endDate, reason, parentContact } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const newLeave = {
        _id: `lv-${Date.now()}`,
        id: `LV-2026-${Math.floor(100 + Math.random() * 900)}`,
        student: { name: 'Ayush', rollNumber: '25ASETCSE019', room: '204', phone: '+91 9876543210' },
        startDate: startDate || '2026-09-25',
        endDate: endDate || '2026-09-27',
        dates: `${startDate || '25 Sep'} - ${endDate || '27 Sep 2026'}`,
        reason: reason || 'Outstation Leave',
        parentContact: parentContact || '+91 9876543211',
        status: 'pending'
      };
      mockLeaves.unshift(newLeave);
      return sendSuccess(res, 'Outstation leave request submitted (Mock Mode)', newLeave, 201);
    }

    const student = await Student.findOne({ user: req.user.id });
    if (!student) return sendError(res, 'Student profile not found', 404);

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

const getMyLeaves = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Leave records retrieved (Mock Mode)', mockLeaves);
    }

    const student = await Student.findOne({ user: req.user.id });
    if (!student) return sendError(res, 'Student profile not found', 404);

    const leaves = await Leave.find({ student: student._id }).sort({ createdAt: -1 });
    return sendSuccess(res, 'Leave records retrieved', leaves);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching leave records', 500, error);
  }
};

const getAllLeaves = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'All leave requests retrieved (Mock Mode)', mockLeaves);
    }

    const { status } = req.query;
    let query = {};
    if (status && status !== 'All') query.status = status;

    const leaves = await Leave.find(query).populate({ path: 'student', populate: { path: 'user' } }).sort({ createdAt: -1 });
    return sendSuccess(res, 'All leave requests retrieved', leaves);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching leave requests', 500, error);
  }
};

const reviewLeaveStatus = async (req, res) => {
  try {
    const { status, reviewComments } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const found = mockLeaves.find(l => l._id === req.params.id) || mockLeaves[0];
      found.status = status;
      found.reviewComments = reviewComments || 'Reviewed by Warden';
      if (status === 'approved') {
        found.gatePassCode = `PASS-SUA-2026-${Math.floor(100 + Math.random() * 900)}`;
      }
      return sendSuccess(res, `Leave request has been ${status} (Mock Mode)`, {
        leave: found,
        gatePassCode: found.gatePassCode
      });
    }

    const leave = await Leave.findById(req.params.id);
    if (!leave) return sendError(res, 'Leave request not found', 404);

    leave.status = status;
    leave.reviewComments = reviewComments;
    leave.reviewedBy = req.user.id;
    await leave.save();

    const passCode = status === 'approved' ? `PASS-SUA-2026-${leave._id.toString().slice(-4).toUpperCase()}` : null;
    return sendSuccess(res, `Leave request has been ${status}`, { leave, gatePassCode: passCode });
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
