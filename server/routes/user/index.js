const router = require('express').Router();

// Import routes
const login = require('./login');
const emailRegister = require('./emailRegister');
const activate = require('./activate');
const refreshToken = require('./refreshToken');
const logout = require('./logout');
const resetPassword = require('./resetPassword');

// Routes
router.use('/login',login);
router.use('/emailRegister', emailRegister);
router.use('/activate', activate);
router.use('/refreshToken', refreshToken);
router.use('/resetPassword',resetPassword);
router.use('/logout', logout);


module.exports = router;