const express = require('express');
const router = express.Router();
const {
  getAllRooms,
  createRoom,
  allocateRoom,
  deallocateRoom
} = require('../controllers/roomController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.get('/', getAllRooms);
router.post('/', protect, authorize('admin', 'warden'), createRoom);
router.post('/allocate', protect, authorize('admin', 'warden'), allocateRoom);
router.post('/deallocate', protect, authorize('admin', 'warden'), deallocateRoom);

module.exports = router;
