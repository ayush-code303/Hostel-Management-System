const express = require('express');
const router = express.Router();
const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus
} = require('../controllers/complaintController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.use(protect);

router.post('/', authorize('student'), createComplaint);
router.get('/my-complaints', authorize('student'), getMyComplaints);
router.get('/', authorize('admin', 'warden'), getAllComplaints);
router.put('/:id/status', authorize('admin', 'warden'), updateComplaintStatus);

module.exports = router;
