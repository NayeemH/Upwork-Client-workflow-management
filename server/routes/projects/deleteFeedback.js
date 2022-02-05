const router = require('express').Router();
const { Project } = require('../../models/project');
const Collection = require('../../models/collection');
const Step = require('../../models/step');
const ObjectId = require('mongoose').Types.ObjectId;




router.delete('/:feedbackId', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {feedbackId} = req.params;

        const collection = await Collection.findOne({"feedbacks._id": new ObjectId(feedbackId)}, {__v: 0});

        if(!collection) throw Error('collection not found');

        const project = await Project.findOne({_id: collection.projectId});

        if(!project) throw Error('Project not found');


        // Check if this user is manager or admin
        if(!((userType === 'client') || (userType === 'admin') || (userType === 'manager'))) throw Error('You are not authorized. Only admin and manager can use this');


        // Check for valid user
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this project");



        await Collection.findOneAndUpdate(
            {_id: collection._id}, 
            {$pull: {feedbacks: {_id: feedbackId}}}
        );
        

        await Step.findOneAndUpdate({collections: collection._id}, {$inc: {feedbackLength: -1}});


        res.json({
            success: true,
            msg: 'Feedback is deleted'
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;