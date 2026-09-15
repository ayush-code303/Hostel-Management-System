const Visitor = require('../models/Visitor');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Log a new campus visitor entry
 * @route   POST /api/visitors
 * @access  Private (Warden & Admin)
 */
const logVisitorEntry = async (req, res) => {
  try {
    const { studentRoll, visitorName, relation, phone } = req.body;

    if (!studentRoll || !visitorName || !relation || !phone) {
      return sendError(res, 'Please provide student roll number, visitor name, relation, and phone number', 400);
    }

    const student = await Student.findOne({ rollNumber: studentRoll.toUpperCase() });
    if (!student) {
      return sendError(res, `No registered student found with roll number ${studentRoll}`, 404);
    }

    const visitor = await Visitor.create({
      student: student._id,
      visitorName,
      relation,
      phone,
      entryTime: new Date(),
      status: 'inside',
      loggedBy: req.user.id
    });

    return sendSuccess(res, 'Visitor entry logged successfully', visitor, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error logging visitor entry', 500, error);
  }
};

/**
 * @desc    Mark visitor exit from hostel premises
 * @route   PUT /api/visitors/:id/exit
 * @access  Private (Warden & Admin)
 */
const markVisitorExit = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) {
      return sendError(res, 'Visitor record not found', 404);
    }

    if (visitor.status === 'exited') {
      return sendError(res, 'Visitor has already checked out', 400);
    }

    visitor.exitTime = new Date();
    visitor.status = 'exited';
    await visitor.save();

    return sendSuccess(res, 'Visitor exit stamped successfully', visitor);
  } catch (error) {
    return sendError(res, error.message || 'Error stamping visitor exit', 500, error);
  }
};

/**
 * @desc    Get all active visitors currently inside campus premises (with overstay check)
 * @route   GET /api/visitors/active
 * @access  Private (Warden & Admin)
 */
const getActiveVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find({ status: 'inside' })
      .populate({
        path: 'student',
        populate: { path: 'user' }
      })
      .sort({ entryTime: -1 });

    const now = new Date();
    const enrichedVisitors = visitors.map(v => {
      const minutesInside = Math.round((now - new Date(v.entryTime)) / (1000 * 60));
      const hoursInside = (minutesInside / 60).toFixed(1);
      const isOverstay = minutesInside > 240; // > 4 hours or past 8 PM visiting curfew

      return {
        ...v.toObject(),
        minutesInside,
        hoursInside,
        isOverstay
      };
    });

    return sendSuccess(res, 'Active visitors retrieved', enrichedVisitors);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching active visitors', 500, error);
  }
};

/**
 * @desc    Get complete visitor log history
 * @route   GET /api/visitors
 * @access  Private (Warden & Admin)
 */
const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .populate({
        path: 'student',
        populate: { path: 'user' }
      })
      .populate('loggedBy', 'name email')
      .sort({ entryTime: -1 })
      .limit(100);

    return sendSuccess(res, 'Visitor log history retrieved', visitors);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching visitor log', 500, error);
  }
};

module.exports = {
  logVisitorEntry,
  markVisitorExit,
  getActiveVisitors,
  getAllVisitors
};
