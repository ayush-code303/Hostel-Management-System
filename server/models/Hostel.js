const mongoose = require('mongoose');

const HostelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide hostel block name'],
    trim: true,
    unique: true
  },
  code: {
    type: String,
    required: [true, 'Please provide hostel code (e.g. BLOCK_A)'],
    uppercase: true,
    trim: true,
    unique: true
  },
  totalFloors: {
    type: Number,
    required: [true, 'Please specify total floors'],
    default: 3
  },
  totalRooms: {
    type: Number,
    required: [true, 'Please specify total rooms'],
    default: 30
  },
  capacity: {
    type: Number,
    required: [true, 'Please specify total student capacity'],
    default: 90
  },
  gender: {
    type: String,
    enum: ['boys', 'girls', 'coed'],
    required: [true, 'Please specify hostel gender classification']
  },
  warden: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Hostel', HostelSchema);
