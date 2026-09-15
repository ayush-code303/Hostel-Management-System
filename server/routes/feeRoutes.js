const express = require('express');
const router = express.Router();
const {
  getAllFees,
  getMyFees,
  generateFee,
  recordPayment
} = require('../controllers/feeController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.use(protect);

router.get('/', authorize('admin', 'warden'), getAllFees);
router.get('/my-fees', authorize('student'), getMyFees);
router.post('/', authorize('admin'), generateFee);
router.post('/:id/pay', recordPayment);

module.exports = router;
