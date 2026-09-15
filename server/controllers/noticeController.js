const Notice = require('../models/Notice');
const { sendSuccess, sendError } = require('../utils/response');

/**
 * @desc    Get all active notices
 * @route   GET /api/notices
 * @access  Public / Private
 */
const getActiveNotices = async (req, res) => {
  try {
    const { audience } = req.query;
    let query = { isActive: true };

    if (audience && audience !== 'all') {
      query.targetAudience = { $in: ['all', audience] };
    }

    const notices = await Notice.find(query)
      .populate('publishedBy', 'name role')
      .sort({ isPinned: -1, createdAt: -1 });

    return sendSuccess(res, 'Notices retrieved successfully', notices);
  } catch (error) {
    return sendError(res, error.message || 'Error fetching notices', 500, error);
  }
};

/**
 * @desc    Broadcast a new campus notice
 * @route   POST /api/notices
 * @access  Private (Warden & Admin)
 */
const createNotice = async (req, res) => {
  try {
    const { title, content, targetAudience, category, isPinned } = req.body;

    if (!title || !content) {
      return sendError(res, 'Please provide title and notice content', 400);
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

/**
 * @desc    Delete a notice
 * @route   DELETE /api/notices/:id
 * @access  Private (Warden & Admin)
 */
const deleteNotice = async (req, res) => {
  try {
    const notice = await Notice.findByIdAndDelete(req.params.id);
    if (!notice) {
      return sendError(res, 'Notice not found', 404);
    }

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
