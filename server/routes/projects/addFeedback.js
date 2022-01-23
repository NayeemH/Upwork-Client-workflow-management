const router = require('express').Router();
const { Project } = require('../../models/project');
const Collection = require('../../models/collection');




router.post('/:collectionId', async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {message, points} = req.body;
        const {collectionId} = req.params;

        const collection = await Collection.findOne({_id: collectionId}, {__v: 0});

        if(!collection) throw Error('collection not found');

        const project = await Project.findOne({_id: collection.projectId});

        if(!project) throw Error('Project not found');


        // Check if this user is manager or admin
        if(!((userType === 'client') || (userType === 'admin'))) throw Error('You are not authorized. Only admin and manager can use this');


        // Check for valid user
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this project");



        await Collection.findOneAndUpdate(
            {_id: collection._id}, 
            {$push: {feedbacks: {message, points}}}
        );
        

        res.json({
            success: true,
            msg: 'FeedBack is added'
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;