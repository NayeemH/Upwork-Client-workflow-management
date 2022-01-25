const router = require('express').Router();
const { Project } = require('../../models/project');
const Step = require('../../models/step');
const Collection = require('../../models/collection');




router.post('/:stepId', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {stepId} = req.params;

        const step = await Step.findOne({_id: stepId}, {__v: 0});

        if(!step) throw Error('Step not found');

        const project = await Project.findOne({_id: step.projectId});

        if(!project) throw Error('Project not found');


        // Check if this user is manager or admin
        if(!((userType === 'manager') || (userType === 'admin' || userType === 'client'))) throw Error('You are not authorized. Only admin and manager can use this');


        // Check for valid user
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this project");

        const lastCollectionId = step.collections[step.collections.length - 1];

        const collection = await Collection.findOne({_id: lastCollectionId});

        
        await Step.findOneAndUpdate(
            {_id: stepId}, 
            {$set: {finalImage: collection.image}}
        );
        

        res.json({
            success: true,
            msg: 'Step is approved'
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;