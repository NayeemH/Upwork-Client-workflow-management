const router = require('express').Router();

// Import routes
const sendLoginMail = require('./sendLoginMail');
const createProject = require('./createProject');
const deleteProject = require('./deleteProject');
const userInfo = require('./userInfo');

// Routes
router.use('/sendLoginMail', sendLoginMail);
router.use('/createProject', createProject);
router.use('/deleteProject', deleteProject);
router.use('/userInfo', userInfo);

module.exports = router;