const router = require('express').Router();

// Import routes
const user = require('./user');
const admin = require('./admin');
const isAuth = require('./authenticate/isAuth');
const isAdmin = require('./authenticate/isAdmin');
const domain = require('./authenticate/subDomain');
const activate = require('./activate');
const project = require('./projects');
const profile = require('./profile');
const download = require('./download');
const downloadLink = require('./activate/download');
const owner = require('./owner');

// Owner Info
router.use('/', owner);

// User Register and login function 
router.use('/user', domain, user);

// Admin need permission
router.use('/admin', isAuth, isAdmin, domain, admin);

// Activation routes
router.use('/activate', activate);

// Projects routes
router.use('/project',isAuth, domain, project);

// Profile Info
router.use('/profile', isAuth, domain, profile);


// Download link
router.use('/download', downloadLink);

// Profile Info
router.use('/download', isAuth, domain, download);





module.exports = router;