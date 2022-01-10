const router = require('express').Router();

// Import routes
const all = require('./all');

// Routes
router.use('/all', all);


module.exports = router;