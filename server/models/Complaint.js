const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  category: {
    type: String,
    enum: ['plumbing', 'electrical', 'cleaning', 'furniture', 'mess', 'other'],
    required: [true, 'Please specify complaint category']
  },
  subject: {
    type: String,
    required: [true, 'Please specify complaint subject'],
    trim: true,
    maxlength: 150
  },
  description: {
    type: String,
    required: [true, 'Please provide complaint description'],
    trim: true
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  status: {
    type: String,
    enum: ['submitted', 'in_progress', 'resolved', 'rejected'],
    default: 'submitted'
  },
  responseComments: {
    type: String,
    default: ''
  },
  resolvedAt: Date
}, {
  timestamps: true
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
