const express = require('express');
const router = express.Router();
const { setAvailability, getAvailability, bookSession, getSessions } = require('../controllers/schedulingController');
const protect = require('../middleware/authMiddleware');

router.post('/availability', protect, setAvailability);
router.get('/availability/:therapistId', getAvailability);
router.post('/book', bookSession);
router.get('/sessions', protect, getSessions);

module.exports = router;