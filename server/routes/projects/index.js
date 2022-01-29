const router = require('express').Router();

// Import routes
const all = require('./all');
const addProduct = require('./addProduct');
const getOneProject = require('./getOneProject');
const getStep = require('./getStep');
const addCollection = require('./addCollection');
const addFeedBack = require('./addFeedback');
const stepApprove = require('./stepApprove');
const downloadProductList = require('./downloadProductList');
const approvedProjects = require('./approvedProjects');
const activeProjects = require('./activeProjects');


// Routes
router.use('/all', all);
router.use('/addProduct', addProduct);
router.use('/one', getOneProject);
router.use('/step', getStep);
router.use('/collection', addCollection);
router.use('/feedback', addFeedBack);
router.use('/stepApprove', stepApprove);
router.use('/download', downloadProductList);
router.use('/approved', approvedProjects);
router.use('/active', activeProjects);

module.exports = router;