const mongoose = require('mongoose');
const Complaint = require('../models/Complaint');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');
const { mockComplaints } = require('../utils/mockData');

const createComplaint = async (req, res) => {
  try {
    const { category, subject, description, priority, roomNumber } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const newCmp = {
        _id: `cmp-${Date.now()}`,
        id: `CMP-2026-${Math.floor(100 + Math.random() * 900)}`,
        student: { name: 'Ayush', rollNumber: '25ASETCSE019', room: roomNumber || '204' },
        category: category || 'General',
        subject: subject || 'Room Maintenance',
        description: description || 'Issue reported.',
        priority: priority || 'Medium',
        date: 'Just Now',
        status: 'pending'
      };
      mockComplaints.unshift(newCmp);

      if (req.io) {
        req.io.emit('complaint:created', newCmp);
      }

      return sendSuccess(res, 'Complaint lodged successfully (Mock Mode)', newCmp, 201);
    }

    const student = await Student.findOne({ user: req.user.id });
    if (!student) return sendError(res, 'Student profile not found', 404);

    const complaint = await Complaint.create({
      student: student._id,
      category,
      subject,
      description,
      priority: priority || 'medium',
      status: 'pending'
    });

    if (req.io) {
      req.io.emit('complaint:created', complaint);
    }

    return sendSuccess(res, 'Complaint lodged successfully', complaint, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error lodging complaint', 500, error);
  }
};

const getMyComplaints = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Student complaints retrieved (Mock Mode)', mockComplaints);
    }

    const student = await Student.findOne({ user: req.user.id });
    if (!student) return sendError(res, 'Student profile not found', 404);

    const complaints = await Complaint.find({ student: student._id }).sort({ createdAt: -1 });
    return sendSuccess(res, 'Student complaints retrieved', complaints);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching complaints', 500, error);
  }
};

const getAllComplaints = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'All complaints retrieved (Mock Mode)', mockComplaints);
    }

    const complaints = await Complaint.find().populate({ path: 'student', populate: { path: 'user' } }).sort({ createdAt: -1 });
    return sendSuccess(res, 'All complaints retrieved', complaints);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching complaints', 500, error);
  }
};

const updateComplaintStatus = async (req, res) => {
  try {
    const { status, resolutionNotes } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const found = mockComplaints.find(c => c._id === req.params.id || c.id === req.params.id) || mockComplaints[0];
      found.status = status;
      if (resolutionNotes) found.resolutionNotes = resolutionNotes;

      if (req.io) {
        req.io.emit('complaint:resolved', found);
      }

      return sendSuccess(res, `Complaint status updated to ${status} (Mock Mode)`, found);
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return sendError(res, 'Complaint not found', 404);

    complaint.status = status;
    if (resolutionNotes) complaint.resolutionNotes = resolutionNotes;
    if (status === 'resolved' || status === 'Resolved') {
      complaint.resolvedBy = req.user.id;
      complaint.resolvedAt = new Date();
    }
    await complaint.save();

    if (req.io) {
      req.io.emit('complaint:resolved', complaint);
    }

    return sendSuccess(res, `Complaint status updated to ${status}`, complaint);
  } catch (error) {
    return sendError(res, error.message || 'Error updating complaint', 500, error);
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
};
