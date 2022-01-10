const router = require('express').Router();
const {Project, projectValidator} = require('../../models/project');
const {handleErrors} = require('../../lib/error');
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const User = require('../../models/user');



router.post('/', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {name, description} = req.body;
        const {userId: adminId} = req.user;
        const {buffer, mimetype} = req.file;


        // Validate the input
        await projectValidator({name, description});


        const images = await saveImage(buffer, mimetype);


        const project = new Project({adminId, name, description, image: images[1]});

        // Save to the database
        const projectData = await project.save();
        await User.findOneAndUpdate({_id: adminId}, {$push: {projects: projectData._id}});


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