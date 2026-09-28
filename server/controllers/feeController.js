const mongoose = require('mongoose');
const Fee = require('../models/Fee');
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');
const { mockFees } = require('../utils/mockData');

const getAllFees = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Fee records retrieved (Mock Mode)', mockFees);
    }

    const { status, term } = req.query;
    let query = {};
    if (status && status !== 'All') query.status = status;
    if (term && term !== 'All') query.term = term;

    const fees = await Fee.find(query).populate({ path: 'student', populate: { path: 'user' } }).sort({ dueDate: -1 });
    return sendSuccess(res, 'Fee records retrieved', fees);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching fee records', 500, error);
  }
};

const getMyFees = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Student fee records retrieved (Mock Mode)', {
        fees: mockFees,
        payments: [
          {
            _id: 'pay-01',
            amount: 45000,
            transactionId: 'TXN-SUA-2026-89412',
            paymentMethod: 'UPI / NetBanking',
            status: 'success',
            createdAt: '2026-08-10'
          }
        ]
      });
    }

    const student = await Student.findOne({ user: req.user.id });
    if (!student) return sendError(res, 'Student profile not found', 404);

    const fees = await Fee.find({ student: student._id }).sort({ dueDate: -1 });
    const payments = await Payment.find({ student: student._id }).sort({ createdAt: -1 });

    return sendSuccess(res, 'Student fee records retrieved', { fees, payments });
  } catch (error) {
    return sendError(res, error.message || 'Error fetching student fees', 500, error);
  }
};

const generateFee = async (req, res) => {
  try {
    const { studentId, term, amount, dueDate } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const newFee = {
        _id: `fee-${Date.now()}`,
        student: { _id: studentId, rollNumber: '25ASETCSE019', user: { name: 'Ayush' } },
        term: term || 'Term 2 (Spring 2027)',
        amount: amount || 45000,
        dueDate: dueDate || '2027-01-15',
        status: 'pending'
      };
      mockFees.unshift(newFee);
      return sendSuccess(res, 'Fee invoice generated (Mock Mode)', newFee, 201);
    }

    const student = await Student.findById(studentId);
    if (!student) return sendError(res, 'Student not found', 404);

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

const recordPayment = async (req, res) => {
  try {
    const { paymentMethod, transactionId, amountPaid } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const found = mockFees.find(f => f._id === req.params.id) || mockFees[0];
      found.status = 'paid';
      found.paidAt = new Date().toISOString();
      found.receiptId = `RCP-SUA-2026-${Math.floor(100 + Math.random() * 900)}`;

      return sendSuccess(res, 'Payment recorded successfully (Mock Mode)', {
        fee: found,
        payment: {
          transactionId: transactionId || 'TXN-SUA-2026-ONLINE',
          amount: amountPaid || found.amount,
          paymentMethod: paymentMethod || 'Razorpay UPI'
        }
      });
    }

    const fee = await Fee.findById(req.params.id);
    if (!fee) return sendError(res, 'Fee invoice not found', 404);
    if (fee.status === 'paid') return sendError(res, 'This fee invoice has already been settled', 400);

    const txId = transactionId || `TXN-SUA-${Date.now().toString().slice(-6)}`;
    const payment = await Payment.create({
      fee: fee._id,
      student: fee.student,
      amount: amountPaid || fee.amount,
      transactionId: txId,
      paymentMethod: paymentMethod || 'Online (UPI/Card)',
      status: 'success'
    });

    fee.status = 'paid';
    fee.paidAt = new Date();
    await fee.save();

    return sendSuccess(res, 'Payment recorded successfully', { fee, payment });
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
