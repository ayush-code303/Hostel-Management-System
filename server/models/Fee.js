const mongoose = require('mongoose');

const FeeSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  term: {
    type: String,
    required: [true, 'Please specify fee academic term (e.g. Semester 1 2026)'],
    trim: true
  },
  amount: {
    type: Number,
    required: [true, 'Please specify total fee amount']
  },
  dueDate: {
    type: Date,
    required: [true, 'Please specify payment due date']
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'overdue'],
    default: 'pending'
  },
  paymentDetails: {
    paidAmount: { type: Number, default: 0 },
    paidAt: Date,
    transactionRef: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Fee', FeeSchema);
