const express = require('express');
const router = express.Router();
const {
  logVisitorEntry,
  markVisitorExit,
  getActiveVisitors,
  getAllVisitors
} = require('../controllers/visitorController');
const { protect } = require('../middleware/authMiddleware');
const { authorize } = require('../middleware/rbacMiddleware');

router.use(protect);
router.use(authorize('admin', 'warden'));

router.post('/', logVisitorEntry);
router.put('/:id/exit', markVisitorExit);
router.get('/active', getActiveVisitors);
router.get('/', getAllVisitors);

module.exports = router;
