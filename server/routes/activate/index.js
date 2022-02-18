const router = require('express').Router();

// Import routes
const loginMailActivate = require('./loginMailActivate');
const resetPassword = require('./resetPassword');
const download = require('./download');
const domain = require('../authenticate/subDomain');

// Routes
router.use('/loginMail', domain, loginMailActivate);
router.use('/resetPassword', resetPassword);
router.use('/download', download);

module.exports = router;