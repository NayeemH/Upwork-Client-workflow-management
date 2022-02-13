const router = require('express').Router();

// Import routes
const createDomain = require('./createDomain');
const getDomainInfo = require('./getDomainInfo');
const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin');
const domain = require('../authenticate/subDomain');

// Routes
router.use('/createDomain', createDomain);
router.use('/getDomainInfo', getDomainInfo);

module.exports = router;