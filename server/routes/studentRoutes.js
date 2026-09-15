const express = require('express');
const router = express.Router();
const {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.use(protect);

router.get('/', authorize('admin', 'warden'), getAllStudents);
router.get('/:id', getStudentById);
router.put('/:id', authorize('admin', 'warden'), updateStudent);
router.delete('/:id', authorize('admin'), deleteStudent);

module.exports = router;
