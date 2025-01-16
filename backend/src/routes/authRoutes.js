const express = require('express');
const { loginWithEmail, signupWithPhone, resetPasswordWithEmail, loginWithNumber, signup, resetPasswordWithNumber, signOut } = require('../controllers/authController');

const router = express.Router();

router.post('/login-with-email', loginWithEmail);
router.post('/login-with-number', loginWithNumber)
router.post('/signup', signup);
router.post('/reset-password-email', resetPasswordWithEmail);
router.post('/reset-password-number', resetPasswordWithNumber);
router.post('/signout', signOut);

module.exports = router;
