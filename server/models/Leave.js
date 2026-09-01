const mongoose = require('mongoose');

const LeaveSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  startDate: {
    type: Date,
    required: [true, 'Please specify leave start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please specify leave return date']
  },
  reason: {
    type: String,
    required: [true, 'Please state reason for leave request'],
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewComments: String,
  appliedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Leave', LeaveSchema);
