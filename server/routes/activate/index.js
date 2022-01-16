const router = require('express').Router();

// Import routes
const loginMailActivate = require('./loginMailActivate');
const resetPassword = require('./resetPassword');

// Routes
router.use('/loginMail', loginMailActivate);
router.use('/resetPassword', resetPassword);


module.exports = router;