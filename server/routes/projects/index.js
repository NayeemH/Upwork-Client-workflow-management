const router = require('express').Router();

// Import routes
const all = require('./all');
const addProduct = require('./addProduct');
const getOneProject = require('./getOneProject');
const getStep = require('./getStep');

// Routes
router.use('/all', all);
router.use('/addProduct', addProduct);
router.use('/one', getOneProject);
router.use('/step', getStep);

module.exports = router;