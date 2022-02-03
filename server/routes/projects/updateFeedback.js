const router = require('express').Router();
const { Project } = require('../../models/project');
const Collection = require('../../models/collection');
const ObjectId = require('mongoose').Types.ObjectId;
const User = require('../../models/user');



router.patch('/:feedbackId', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {message} = req.body;
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

        const user = await User.findOne({_id: userId});

        await Collection.findOneAndUpdate(
            {_id: collection._id, "feedbacks._id": new ObjectId(feedbackId)}, 
            {$set: {"feedbacks.$.userName": user.username, "feedbacks.$.userImage": user.image, "feedbacks.$.userRole": userType, "feedbacks.$.message": message}}
        );
        


        res.json({
            success: true,
            msg: 'Feedback is updated'
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;