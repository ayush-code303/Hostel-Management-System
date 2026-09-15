const express = require('express');
const router = express.Router();
const {
  getActiveNotices,
  createNotice,
  deleteNotice
} = require('../controllers/noticeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.get('/', getActiveNotices);
router.post('/', protect, authorize('admin', 'warden'), createNotice);
router.delete('/:id', protect, authorize('admin', 'warden'), deleteNotice);

module.exports = router;
