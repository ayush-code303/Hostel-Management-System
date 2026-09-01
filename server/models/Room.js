const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
  hostel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Hostel',
    required: true
  },
  roomNumber: {
    type: String,
    required: [true, 'Please provide room number (e.g. 101)'],
    trim: true
  },
  floor: {
    type: Number,
    required: [true, 'Please specify floor number'],
    default: 1
  },
  capacity: {
    type: Number,
    required: [true, 'Please specify room maximum capacity'],
    default: 3
  },
  occupied: {
    type: Number,
    default: 0,
    min: 0
  },
  feeAmount: {
    type: Number,
    required: [true, 'Please specify room fee amount per term'],
    default: 25000
  },
  status: {
    type: String,
    enum: ['available', 'full', 'maintenance'],
    default: 'available'
  }
}, {
  timestamps: true
});

// Composite unique index: A room number must be unique within a specific hostel block
RoomSchema.index({ hostel: 1, roomNumber: 1 }, { unique: true });

module.exports = mongoose.model('Room', RoomSchema);
