const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  rollNumber: {
    type: String,
    required: [true, 'Please provide roll number'],
    unique: true,
    uppercase: true,
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Please specify academic department'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please specify academic year'],
    min: 1,
    max: 5
  },
  phone: {
    type: String,
    required: [true, 'Please provide student phone number'],
    trim: true
  },
  guardianPhone: {
    type: String,
    required: [true, 'Please provide guardian phone number'],
    trim: true
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String
  },
  roomAllocation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Allocation',
    default: null
  },
  status: {
    type: String,
    enum: ['active', 'graduated', 'suspended'],
    default: 'active'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', StudentSchema);
