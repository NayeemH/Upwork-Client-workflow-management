const router = require('express').Router();
const {Project, projectValidator} = require('../../models/project');
const {handleErrors} = require('../../lib/error');



router.post('/', async (req, res, next) => {
    try {
        const {name, description} = req.body;
        const {userId: adminId} = req.user;

        // Validate the input
        await projectValidator({name, description});


        const project = new Project({adminId, name, description});

        // Save to the database
        await project.save();


        // Send the response
        res.json({
            success: true, 
            msg: `This project is created. The project id is ${project._id}`
        });
    }
    catch (err) {
        const errors = handleErrors(err);
        next(errors);
    }
});


module.exports = router;