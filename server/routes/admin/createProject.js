const router = require('express').Router();
const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin');
const {Project, ProjectValidator} = require('../../models/project');
const {handleErrors} = require('../../lib/error');




router.post('/', isAuth, isAdmin, async (req, res, next) => {
    try {
        const {name, description} = req.body;
        const {userId: adminId} = req.user;

        // Validate the input
        await ProjectValidator({name, description});


        const project = new Project({adminId, name, description});

        // Save to the database
        await project.save();


        // Send the response
        res.json({
            success: true, 
            msg: `Email is send to the ${userType}` 
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        next(errors);
    }
});


module.exports = router;