const router = require('express').Router();
const { Project } = require('../../models/project');
const Collection = require('../../models/collection');
const Step = require('../../models/step');
const User = require('../../models/user');



router.post('/:collectionId', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {message, points} = req.body;
        const {collectionId} = req.params;

        const collection = await Collection.findOne({_id: collectionId}, {__v: 0});

        if(!collection) throw Error('collection not found');

        const project = await Project.findOne({_id: collection.projectId});

        if(!project) throw Error('Project not found');



        // Check for valid user
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this project");

        const user = await User.findOne({_id: userId});

        await Collection.findOneAndUpdate(
            {_id: collection._id}, 
            {$push: {feedbacks: {message, points, userName: user.username, userImage: user.image, userRole: userType}}}
        );
        
        
        await Step.findOneAndUpdate({collections: collection._id}, {$inc: {feedbackLength: 1}});
        

        res.json({
            success: true,
            msg: 'Feedback is added'
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;