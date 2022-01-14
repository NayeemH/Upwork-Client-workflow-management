const router = require('express').Router();

// Import routes
const getProfile = require('./getProfile');
const updateProfile = require('./updateProfile');

// Routes
router.use('/getProfile',getProfile);
router.use('/updateProfile', updateProfile);

module.exports = router;