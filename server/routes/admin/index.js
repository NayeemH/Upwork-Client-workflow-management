const router = require('express').Router();

// Import routes
const sendLoginMail = require('./sendLoginMail');
const createProject = require('./createProject');
const deleteProject = require('./deleteProject');

// Routes
router.use('/sendLoginMail', sendLoginMail);
router.use('/createProject', createProject);
router.use('/deleteProject', deleteProject);

module.exports = router;