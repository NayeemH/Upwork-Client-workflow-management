const router = require('express').Router();

// Import routes
const loginMailActivate = require('./loginMailActivate');
const resetPassword = require('./resetPassword');
const download = require('./download');

// Routes
router.use('/loginMail', loginMailActivate);
router.use('/resetPassword', resetPassword);
router.use('/download', download);

module.exports = router;