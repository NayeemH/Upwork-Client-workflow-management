const router = require('express').Router();

// Import routes
const downloadProject = require('./downloadProject');
const downloadProduct = require('./downloadProduct');
const downloadSelect = require('./downloadSelect');
const downloadLink = require('./downloadLink');

// Routes
router.use('/project', downloadProject);
router.use('/product', downloadProduct);
router.use('/select', downloadSelect);
router.use('/link', downloadLink);

module.exports = router;