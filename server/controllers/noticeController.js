const mongoose = require('mongoose');
const Notice = require('../models/Notice');
const { sendSuccess, sendError } = require('../utils/response');
const { mockNotices } = require('../utils/mockData');

const getActiveNotices = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Notices retrieved successfully (Mock Mode)', mockNotices);
    }

    const { audience } = req.query;
    let query = { isActive: true };
    if (audience && audience !== 'all') {
      query.targetAudience = { $in: ['all', audience] };
    }

    const notices = await Notice.find(query).populate('publishedBy', 'name role').sort({ isPinned: -1, createdAt: -1 });
    return sendSuccess(res, 'Notices retrieved successfully', notices);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching notices', 500, error);
  }
};

const createNotice = async (req, res) => {
  try {
    const { title, content, targetAudience, category, isPinned } = req.body;

    if (mongoose.connection.readyState !== 1) {
      const newNotice = {
        _id: `ntc-${Date.now()}`,
        id: mockNotices.length + 1,
        title: title || 'Campus Notice',
        content: content || 'Notice details.',
        targetAudience: targetAudience || 'All Hostel Residents',
        category: category || 'general',
        isPinned: isPinned || false,
        publishedBy: { name: 'Dr. R. K. Sharma', role: 'admin' },
        createdAt: new Date().toISOString()
      };
      mockNotices.unshift(newNotice);
      return sendSuccess(res, 'Notice broadcasted successfully (Mock Mode)', newNotice, 201);
    }

    const notice = await Notice.create({
      title,
      content,
      targetAudience: targetAudience || 'all',
      category: category || 'general',
      isPinned: isPinned || false,
      publishedBy: req.user.id
    });

    return sendSuccess(res, 'Notice broadcasted successfully', notice, 201);
  } catch (error) {
    return sendError(res, error.message || 'Error broadcasting notice', 500, error);
  }
};

const deleteNotice = async (req, res) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return sendSuccess(res, 'Notice removed (Mock Mode)');
    }

    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) return sendError(res, 'Notice not found', 404);
    return sendSuccess(res, 'Notice removed successfully');
  } catch (error) {
    return sendError(res, error.message || 'Error deleting notice', 500, error);
  }
};

module.exports = {
  getActiveNotices,
  createNotice,
  deleteNotice
};
