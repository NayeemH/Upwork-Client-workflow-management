const router = require('express').Router();

// Import routes
const sendLoginMail = require('./sendLoginMail');
const createProject = require('./createProject');

// Routes
router.use('/sendLoginMail', sendLoginMail);
router.use('/createProject', createProject);

module.exports = router;