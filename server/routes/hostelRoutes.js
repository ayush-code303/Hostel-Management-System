const express = require('express');
const router = express.Router();
const {
  getAllHostels,
  getHostelById,
  createHostel,
  updateHostel
} = require('../controllers/hostelController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.get('/', getAllHostels);
router.get('/:id', getHostelById);
router.post('/', protect, authorize('admin'), createHostel);
router.put('/:id', protect, authorize('admin'), updateHostel);

module.exports = router;
