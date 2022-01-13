const router = require('express').Router();
const isAuth = require('../authenticate/isAuth');

// Import routes
const login = require('./login');
const emailRegister = require('./emailRegister');
const refreshToken = require('./refreshToken');
const logout = require('./logout');
const resetPassword = require('./resetPassword');
const user = require('./user');

// Routes
router.use('/login',login);
router.use('/emailRegister', emailRegister);
router.use('/refreshToken', refreshToken);
router.use('/resetPassword',resetPassword);
router.use('/logout', logout);
router.use('/', isAuth, user);

module.exports = router;