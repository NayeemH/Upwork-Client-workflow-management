const router = require('express').Router();

// Import routes
const all = require('./all');
const addProduct = require('./addProduct');
const getOneProject = require('./getOneProject');
const getStep = require('./getStep');
const addCollection = require('./addCollection');
const addFeedBack = require('./addFeedback');
const stepApprove = require('./stepApprove');
const downloadProject = require('./downloadProject');
const downloadProduct = require('./downloadProduct');
const downloadSelect = require('./downloadSelect');


// Routes
router.use('/all', all);
router.use('/addProduct', addProduct);
router.use('/one', getOneProject);
router.use('/step', getStep);
router.use('/collection', addCollection);
router.use('/feedback', addFeedBack);
router.use('/stepApprove', stepApprove);
router.use('/download', downloadProject);
router.use('/product/download', downloadProduct);
router.use('/select/download', downloadSelect);


module.exports = router;