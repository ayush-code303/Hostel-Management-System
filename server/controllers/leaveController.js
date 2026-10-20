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

      if (req.io) {
        req.io.emit('leave:applied', newLeave);
      }

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

    if (req.io) {
      req.io.emit('leave:applied', leave);
    }

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
      const found = mockLeaves.find(l => l._id === req.params.id || l.id === req.params.id) || mockLeaves[0];
      found.status = status;
      found.reviewComments = reviewComments || 'Reviewed and authorized by Hostel Warden';
      if (status === 'approved' || status === 'Approved') {
        found.gatePassCode = `PASS-SUA-2026-${Math.floor(100 + Math.random() * 900)}`;
      }

      if (req.io) {
        req.io.emit('leave:reviewed', found);
      }

      return sendSuccess(res, `Leave request has been ${status} (Mock Mode)`, {
        leave: found,
        gatePassCode: found.gatePassCode
      });
    }

    const leave = await Leave.findById(req.params.id).populate({ path: 'student', populate: { path: 'user' } });
    if (!leave) return sendError(res, 'Leave request not found', 404);

    leave.status = status;
    leave.reviewComments = reviewComments;
    leave.reviewedBy = req.user.id;
    await leave.save();

    const passCode = (status === 'approved' || status === 'Approved') 
      ? `PASS-SUA-2026-${leave._id.toString().slice(-4).toUpperCase()}` 
      : null;

    if (req.io) {
      req.io.emit('leave:reviewed', { leave, gatePassCode: passCode });
    }

    return sendSuccess(res, `Leave request has been ${status}`, { leave, gatePassCode: passCode });
  } catch (error) {
    return sendError(res, error.message || 'Error reviewing leave request', 500, error);
  }
};

const getGatePassDetails = async (req, res) => {
  try {
    const leaveId = req.params.id;

    if (mongoose.connection.readyState !== 1) {
      const matched = mockLeaves.find(l => l._id === leaveId || l.id === leaveId) || mockLeaves[0];
      const code = matched.gatePassCode || `PASS-SUA-2026-${Math.floor(100 + Math.random() * 900)}`;
      const qrPayload = JSON.stringify({
        token: code,
        name: matched.student?.name || 'Ayush',
        roll: matched.student?.rollNumber || '25ASETCSE019',
        room: matched.student?.room || '204',
        hostel: 'Nelson Mandela Boys Hostel (Block B)',
        dates: matched.dates || '12 Sep - 14 Sep 2026',
        status: 'VERIFIED_GATE_PASS'
      });

      return sendSuccess(res, 'Digital QR Gate Pass generated (Mock Mode)', {
        passId: code,
        studentName: matched.student?.name || 'Ayush',
        rollNumber: matched.student?.rollNumber || '25ASETCSE019',
        hostel: 'Nelson Mandela Boys Hostel (Block B)',
        room: matched.student?.room || '204',
        validDates: matched.dates || '12 Sep - 14 Sep 2026',
        reason: matched.reason || 'Home Visit Weekend',
        status: matched.status || 'Approved',
        qrPayload
      });
    }

    const leave = await Leave.findById(leaveId).populate({ path: 'student', populate: { path: 'user' } });
    if (!leave) return sendError(res, 'Leave request not found', 404);

    const code = `PASS-SUA-2026-${leave._id.toString().slice(-4).toUpperCase()}`;
    const qrPayload = JSON.stringify({
      token: code,
      name: leave.student?.user?.name || 'Student',
      roll: leave.student?.rollNumber || 'N/A',
      validFrom: leave.startDate,
      validUntil: leave.endDate,
      status: leave.status.toUpperCase()
    });

    return sendSuccess(res, 'Digital QR Gate Pass generated', {
      passId: code,
      studentName: leave.student?.user?.name,
      rollNumber: leave.student?.rollNumber,
      validDates: `${new Date(leave.startDate).toLocaleDateString()} to ${new Date(leave.endDate).toLocaleDateString()}`,
      reason: leave.reason,
      status: leave.status,
      qrPayload
    });
  } catch (error) {
    return sendError(res, error.message || 'Error generating QR gate pass', 500);
  }
};

module.exports = {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  reviewLeaveStatus,
  getGatePassDetails
};
