const express = require('express');
const router = express.Router();
const {
  markAttendance,
  getStudentAttendance,
  getHostelAttendanceStats
} = require('../controllers/attendanceController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.use(protect);

router.post('/', authorize('admin', 'warden'), markAttendance);
router.get('/student/:studentId', getStudentAttendance);
router.get('/stats', authorize('admin', 'warden'), getHostelAttendanceStats);

module.exports = router;
