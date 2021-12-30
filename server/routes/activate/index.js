const router = require('express').Router();

// Import routes
const loginMailActivate = require('./loginMailActivate');


// Routes
router.use('/loginMail', loginMailActivate)



module.exports = router;