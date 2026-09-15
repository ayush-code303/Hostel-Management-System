const Complaint = require('../models/Complaint');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Lodge a maintenance or room complaint
 * @route   POST /api/complaints
 * @access  Private (Student)
 */
const createComplaint = async (req, res) => {
  try {
    const { category, subject, description, priority } = req.body;

    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return sendError(res, 'Student profile not found', 404);
    }

    if (!category || !subject || !description) {
      return sendError(res, 'Please provide category, subject, and description', 400);
    }

    const complaint = await Complaint.create({
      student: student._id,
      category,
      subject,
      description,
      priority: priority || 'medium',
      status: 'pending'
    });

    return sendSuccess(res, 'Complaint lodged successfully', complaint, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error lodging complaint', 500, error);
  }
};

/**
 * @desc    Get all complaints lodged by the logged-in student
 * @route   GET /api/complaints/my-complaints
 * @access  Private (Student)
 */
const getMyComplaints = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return sendError(res, 'Student profile not found', 404);
    }

    const complaints = await Complaint.find({ student: student._id })
      .populate('resolvedBy', 'name email')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 'Student complaints retrieved', complaints);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching complaints', 500, error);
  }
};

/**
 * @desc    Get all complaints across the hostel (with category & status filter)
 * @route   GET /api/complaints
 * @access  Private (Warden & Admin)
 */
const getAllComplaints = async (req, res) => {
  try {
    const { category, status, priority } = req.query;
    let query = {};

    if (category && category !== 'All') query.category = category;
    if (status && status !== 'All') query.status = status;
    if (priority && priority !== 'All') query.priority = priority;

    const complaints = await Complaint.find(query)
      .populate({
        path: 'student',
        populate: { path: 'user' }
      })
      .populate('resolvedBy', 'name email')
      .sort({ createdAt: -1 });

    return sendSuccess(res, 'All complaints retrieved', complaints);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching complaints', 500, error);
  }
};

/**
 * @desc    Update complaint status & add resolution notes
 * @route   PUT /api/complaints/:id/status
 * @access  Private (Warden & Admin)
 */
const updateComplaintStatus = async (req, res) => {
  try {
    const { status, resolutionNotes } = req.body;

    if (!['pending', 'in-progress', 'resolved'].includes(status)) {
      return sendError(res, 'Invalid complaint status', 400);
    }

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return sendError(res, 'Complaint record not found', 404);
    }

    complaint.status = status;
    if (resolutionNotes) complaint.resolutionNotes = resolutionNotes;
    if (status === 'resolved') {
      complaint.resolvedBy = req.user.id;
      complaint.resolvedAt = new Date();
    }
    await complaint.save();

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
