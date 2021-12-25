const router = require('express').Router();

// Import routes
const user = require('./user');


// User Register and login function 
router.use('/user', user);



module.exports = router;