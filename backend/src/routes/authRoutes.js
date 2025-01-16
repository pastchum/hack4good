// const express = require('express');
// const { loginUser, resetPassword } = require('../controllers/authController');

// const router = express.Router();

// // Login user
// router.post('/login', loginUser);

// // Reset password
// router.post('/reset-password', resetPassword);

// module.exports = router;
const express = require('express');
const { loginWithEmail, signupWithPhone, resetPasswordWithEmail } = require('../controllers/authController');

const router = express.Router();

router.post('/login', loginWithEmail);
router.post('/signup', signupWithPhone);
router.post('/reset-password-email', resetPasswordWithEmail);

// Add other routes as needed

module.exports = router;
