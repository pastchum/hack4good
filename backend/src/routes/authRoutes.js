const express = require('express');
const { loginUser, resetPassword } = require('../controllers/authController');

const router = express.Router();

// Login user
router.post('/login', loginUser);

// Reset password
router.post('/reset-password', resetPassword);

module.exports = router;
