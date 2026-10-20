const express = require('express');
const router = express.Router();
const {
  getWeeklyMenu,
  getMessFeedback,
  submitMessFeedback
} = require('../controllers/messController');
const { protect } = require('../middleware/authMiddleware');

// Public or student-accessible menu
router.get('/menu', getWeeklyMenu);

// Protect feedback endpoints
router.get('/feedback', protect, getMessFeedback);
router.post('/feedback', protect, submitMessFeedback);

module.exports = router;
