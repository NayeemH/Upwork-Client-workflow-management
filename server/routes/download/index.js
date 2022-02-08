const router = require('express').Router();

// Import routes
const downloadProject = require('./downloadProject');
const downloadProduct = require('./downloadProduct');
const downloadSelect = require('./downloadSelect');


// Routes
router.use('/project', downloadProject);
router.use('/product', downloadProduct);
router.use('/select', downloadSelect);


module.exports = router;