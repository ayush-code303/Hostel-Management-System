const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  reviewLeaveStatus
} = require('../controllers/leaveController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.use(protect);

router.post('/', authorize('student'), applyLeave);
router.get('/my-leaves', authorize('student'), getMyLeaves);
router.get('/', authorize('admin', 'warden'), getAllLeaves);
router.put('/:id/status', authorize('admin', 'warden'), reviewLeaveStatus);

module.exports = router;
