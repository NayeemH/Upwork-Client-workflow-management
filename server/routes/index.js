const router = require('express').Router();

// Import routes
const user = require('./user');
const admin = require('./admin');
const isAuth = require('./authenticate/isAuth');
const isAdmin = require('./authenticate/isAdmin');
const activate = require('./activate');
const project = require('./projects');
const profile = require('./profile');

// User Register and login function 
router.use('/user', user);

// Admin need permission
router.use('/admin', isAuth, isAdmin, admin);

// Activation routes
router.use('/activate', activate);

// Projects routes
router.use('/project',isAuth, project);

// Profile Info
router.use('/profile', isAuth, profile);

module.exports = router;