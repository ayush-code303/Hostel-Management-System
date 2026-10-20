const mongoose = require('mongoose');

const MessFeedbackSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student'
  },
  studentName: {
    type: String,
    required: true,
    default: 'Ayush'
  },
  rollNumber: {
    type: String,
    required: true,
    default: '25ASETCSE019'
  },
  mealType: {
    type: String,
    enum: ['Breakfast', 'Lunch', 'Snacks', 'Dinner'],
    required: [true, 'Please select meal type']
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: [true, 'Please provide rating from 1 to 5']
  },
  comment: {
    type: String,
    required: [true, 'Please provide feedback comments'],
    trim: true
  },
  date: {
    type: String,
    default: () => new Date().toISOString().split('T')[0]
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MessFeedback', MessFeedbackSchema);
