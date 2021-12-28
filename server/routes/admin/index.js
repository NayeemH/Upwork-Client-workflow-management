const router = require('express').Router();

// Import routes
const sendLoginMail = require('./sendLoginMail');

// Routes
router.use('/sendLoginMail', sendLoginMail);


module.exports = router;