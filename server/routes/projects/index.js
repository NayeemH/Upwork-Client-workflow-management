const router = require('express').Router();

// Import routes
const all = require('./all');
const addProduct = require('./addProduct');
const getOneProject = require('./getOneProject');

// Routes
router.use('/all', all);

router.use('/addProduct', addProduct);

router.use('/one', getOneProject);


module.exports = router;