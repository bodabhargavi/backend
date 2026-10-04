const express = require('express');
const router = express.Router();
const { createClient, getClients, getClientById } = require('../controllers/clientController');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, createClient);
router.get('/', protect, getClients);
router.get('/:id', protect, getClientById);

module.exports = router;