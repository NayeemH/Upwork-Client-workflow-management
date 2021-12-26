const router = require('express').Router();

// Import routes
const user = require('./user');
const admin = require('./admin');



// User Register and login function 
router.use('/user', user);
router.use('/admin', admin);


module.exports = router;