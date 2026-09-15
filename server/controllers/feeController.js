const Fee = require('../models/Fee');
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Get all fee records (Admin / Warden view)
 * @route   GET /api/fees
 * @access  Private (Admin & Warden)
 */
const getAllFees = async (req, res) => {
  try {
    const { status, term } = req.query;
    let query = {};

    if (status && status !== 'All') query.status = status;
    if (term && term !== 'All') query.term = term;

    const fees = await Fee.find(query)
      .populate({
        path: 'student',
        populate: { path: 'user' }
      })
      .sort({ dueDate: -1 });

    return sendSuccess(res, 'Fee records retrieved', fees);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching fee records', 500, error);
  }
};

/**
 * @desc    Get fee records for currently logged-in student
 * @route   GET /api/fees/my-fees
 * @access  Private (Student)
 */
const getMyFees = async (req, res) => {
  try {
    const student = await Student.findOne({ user: req.user.id });
    if (!student) {
      return sendError(res, 'Student profile not found', 404);
    }

    const fees = await Fee.find({ student: student._id }).sort({ dueDate: -1 });
    const payments = await Payment.find({ student: student._id }).sort({ createdAt: -1 });

    return sendSuccess(res, 'Student fee records retrieved', {
      fees,
      payments
    });
  } catch (error) {
    return sendError(res, error.message || 'Error fetching student fees', 500, error);
  }
};

/**
 * @desc    Generate a fee invoice for a student
 * @route   POST /api/fees
 * @access  Private (Admin only)
 */
const generateFee = async (req, res) => {
  try {
    const { studentId, term, amount, dueDate } = req.body;

    if (!studentId || !term || !amount || !dueDate) {
      return sendError(res, 'Please provide student ID, term, amount, and due date', 400);
    }

    const student = await Student.findById(studentId);
    if (!student) {
      return sendError(res, 'Student not found', 404);
    }

    const fee = await Fee.create({
      student: student._id,
      term,
      amount,
      dueDate: new Date(dueDate),
      status: 'pending'
    });

    return sendSuccess(res, 'Fee invoice generated successfully', fee, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error generating fee invoice', 500, error);
  }
};

/**
 * @desc    Record fee payment transaction
 * @route   POST /api/fees/:id/pay
 * @access  Private (Student, Warden, Admin)
 */
const recordPayment = async (req, res) => {
  try {
    const { paymentMethod, transactionId, amountPaid } = req.body;

    const fee = await Fee.findById(req.params.id);
    if (!fee) {
      return sendError(res, 'Fee invoice not found', 404);
    }

    if (fee.status === 'paid') {
      return sendError(res, 'This fee invoice has already been settled', 400);
    }

    const txId = transactionId || `TXN-SUA-${Date.now().toString().slice(-6)}`;

    // Create payment record
    const payment = await Payment.create({
      fee: fee._id,
      student: fee.student,
      amount: amountPaid || fee.amount,
      transactionId: txId,
      paymentMethod: paymentMethod || 'Online (UPI/Card)',
      status: 'success'
    });

    // Update fee record
    fee.status = 'paid';
    fee.paidAt = new Date();
    await fee.save();

    return sendSuccess(res, 'Payment recorded successfully', {
      fee,
      payment
    });
  } catch (error) {
    return sendError(res, error.message || 'Error recording payment', 500, error);
  }
};

module.exports = {
  getAllFees,
  getMyFees,
  generateFee,
  recordPayment
};
