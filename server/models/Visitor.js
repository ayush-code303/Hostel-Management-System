const mongoose = require('mongoose');

const VisitorSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  visitorName: {
    type: String,
    required: [true, 'Please provide visitor name'],
    trim: true
  },
  relation: {
    type: String,
    required: [true, 'Please state relationship with student (e.g. Parent, Sibling)'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide visitor phone number'],
    trim: true
  },
  entryTime: {
    type: Date,
    default: Date.now
  },
  exitTime: Date,
  status: {
    type: String,
    enum: ['inside', 'exited'],
    default: 'inside'
  },
  loggedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Visitor', VisitorSchema);
