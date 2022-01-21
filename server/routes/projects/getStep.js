const router = require('express').Router();
const { Project } = require('../../models/project');
const Product = require('../../models/product');
const Step = require('../../models/step');


router.get('/:stepId', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {stepId} = req.params;

        const step = await Step.findOne({_id: stepId}, {__v: 0, finalCollection: 0});

        if(!step) throw Error('Step not found');

        const project = await Project.findOne({_id: step.projectId});

        if(!project) throw Error('Project not found');

        // Check for valid user access
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this step");

        
        if(userType === 'client') {
            await Step.findOneAndUpdate({_id: stepId}, {$set: {viewed: true}});
        }


        res.json(step);
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;