const mongoose = require('mongoose');

const NoticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide notice title'],
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: [true, 'Please provide notice body content']
  },
  targetAudience: {
    type: String,
    enum: ['all', 'students', 'wardens'],
    default: 'all'
  },
  category: {
    type: String,
    enum: ['general', 'academic', 'event', 'emergency'],
    default: 'general'
  },
  publishedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  attachments: [{
    fileName: String,
    fileUrl: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Notice', NoticeSchema);
