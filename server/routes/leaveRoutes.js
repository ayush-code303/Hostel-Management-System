const express = require('express');
const router = express.Router();
const {
  applyLeave,
  getMyLeaves,
  getAllLeaves,
  reviewLeaveStatus,
  getGatePassDetails
} = require('../controllers/leaveController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.use(protect);

router.post('/', authorize('student'), applyLeave);
router.get('/my-leaves', authorize('student'), getMyLeaves);
router.get('/', authorize('admin', 'warden'), getAllLeaves);
router.put('/:id/status', authorize('admin', 'warden'), reviewLeaveStatus);
router.get('/:id/gate-pass', getGatePassDetails);

module.exports = router;
