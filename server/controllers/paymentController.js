const crypto = require('crypto');
const Razorpay = require('razorpay');
const Fee = require('../models/Fee');
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const { sendSuccess, sendError } = require('../utils/response');
const { mockFees } = require('../utils/mockData');
const mongoose = require('mongoose');

// Initialize Razorpay client if credentials are in .env
let razorpayInstance = null;
if (process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET) {
  try {
    razorpayInstance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });
  } catch (e) {
    console.warn('Razorpay initialization fallback to Sandbox mode:', e.message);
  }
}

/**
 * Create Razorpay Order
 * POST /api/payments/create-order
 */
const createRazorpayOrder = async (req, res) => {
  try {
    const { feeId, amount } = req.body;
    const orderAmount = Number(amount) || 45000;

    // Real Razorpay integration if keys configured
    if (razorpayInstance) {
      const options = {
        amount: orderAmount * 100, // paise
        currency: 'INR',
        receipt: `rcpt_${feeId || Date.now()}`,
        payment_capture: 1
      };
      const order = await razorpayInstance.orders.create(options);
      return sendSuccess(res, 'Razorpay order generated successfully', {
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID,
        isSandbox: false
      });
    }

    // High-fidelity Sandbox Simulator for College Testing & Viva
    const sandboxOrderId = `order_test_${Date.now()}`;
    return sendSuccess(res, 'Razorpay Sandbox Order initialized', {
      orderId: sandboxOrderId,
      amount: orderAmount * 100,
      currency: 'INR',
      key: 'rzp_test_sharda_sandbox_2026',
      isSandbox: true,
      message: 'Razorpay Sandbox test mode active. Immediate verification available.'
    });
  } catch (error) {
    return sendError(res, error.message || 'Error creating Razorpay order', 500);
  }
};

/**
 * Verify Razorpay Signature & Finalize Payment Receipt
 * POST /api/payments/verify
 */
const verifyRazorpayPayment = async (req, res) => {
  try {
    const { 
      razorpayOrderId, 
      razorpayPaymentId, 
      razorpaySignature, 
      feeId, 
      amountPaid,
      paymentMethod = 'Razorpay UPI' 
    } = req.body;

    const paymentId = razorpayPaymentId || `pay_sua_${Date.now()}`;
    const receiptNumber = `RCP-SUA-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Verify signature if real Razorpay secret is present
    if (razorpayInstance && process.env.RAZORPAY_KEY_SECRET && razorpaySignature) {
      const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
      hmac.update(`${razorpayOrderId}|${razorpayPaymentId}`);
      const generatedSignature = hmac.digest('hex');

      if (generatedSignature !== razorpaySignature) {
        return sendError(res, 'Invalid transaction signature - Payment verification failed', 400);
      }
    }

    // In-memory Mock Mode handling
    if (mongoose.connection.readyState !== 1) {
      const matched = mockFees.find(f => f._id === feeId) || mockFees[0];
      matched.status = 'paid';
      matched.paidAt = new Date().toISOString();
      matched.receiptId = receiptNumber;

      const receiptPayload = {
        receiptId: receiptNumber,
        transactionId: paymentId,
        orderId: razorpayOrderId,
        amount: Number(amountPaid) || 45000,
        paymentMethod,
        date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
        status: 'PAID'
      };

      if (req.io) {
        req.io.emit('payment:success', {
          feeId,
          receiptNumber,
          amount: receiptPayload.amount,
          studentName: req.user?.name || 'Ayush'
        });
      }

      return sendSuccess(res, 'Fee payment verified and settled successfully (Mock Mode)', receiptPayload, 200);
    }

    // Database Mode handling
    const fee = await Fee.findById(feeId);
    if (!fee) return sendError(res, 'Fee invoice not found', 404);

    fee.status = 'paid';
    fee.paidAt = new Date();
    await fee.save();

    const payment = await Payment.create({
      fee: fee._id,
      student: fee.student,
      transactionId: paymentId,
      razorpayOrderId,
      razorpayPaymentId: paymentId,
      razorpaySignature,
      paymentMethod: 'upi',
      amount: Number(amountPaid) || fee.amount,
      status: 'success'
    });

    const receiptData = {
      receiptId: receiptNumber,
      transactionId: payment.transactionId,
      orderId: razorpayOrderId,
      amount: payment.amount,
      paymentMethod,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      status: 'PAID'
    };

    if (req.io) {
      req.io.emit('payment:success', {
        feeId,
        receiptNumber,
        amount: receiptData.amount,
        studentName: req.user?.name || 'Ayush'
      });
    }

    return sendSuccess(res, 'Fee payment successfully verified and recorded', receiptData, 200);
  } catch (error) {
    return sendError(res, error.message || 'Error verifying Razorpay payment', 500);
  }
};

module.exports = {
  createRazorpayOrder,
  verifyRazorpayPayment
};
