const router = require('express').Router();
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const { Project } = require('../../models/project');
const Step = require('../../models/step');
const Collection = require('../../models/collection');




router.post('/:stepId', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {title, description} = req.body;
        const {buffer, mimetype} = req.file;
        const {stepId} = req.params;

        const step = await Step.findOne({_id: stepId}, {__v: 0});

        if(!step) throw Error('Step not found');

        const project = await Project.findOne({_id: step.projectId});

        if(!project) throw Error('Project not found');


        // Check if this user is manager or admin
        if(!((userType === 'manager') || (userType === 'admin' || userType === 'developer'))) throw Error('You are not authorized. Only admin and manager can use this');


        // Check for valid user
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this project");

        // Check if this step is approved
        if(step.finalImage) throw Error('This step is already approved');

        
        // Save the image        
        const images = await saveImage(buffer, mimetype);

        const collection = new Collection({
            projectId: project._id,
            title,
            description,
            image: images[0],
        });
        const newCollection = await collection.save();

        await Step.findOneAndUpdate(
            {_id: stepId}, 
            {$push: {collections: newCollection._id}}
        );
        

        res.json({
            success: true,
            msg: 'Collection is added'
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;