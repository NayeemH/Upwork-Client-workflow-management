const router = require('express').Router();
const { Project } = require('../../models/project');
const Product = require('../../models/product');
const User = require('../../models/user');




router.get('/:projectId', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {projectId} = req.params;

        const project = await Project.findOne({_id: projectId}, {__v: 0});

        if(!project) throw Error('Project not found');

        // TODO: Check for valid user access

        const products = await Product.find({projectId}, {__v: 0});


        const userIds = [];

        project.projectUser.forEach(({userId}) => {
            userIds.push(userId);
        });

        // Find data from the data
        const userData = await User.find(
            {_id: {$in: userIds }}, 
            {username: 1, email: 1, image: 1, _id: 1}
        );


        project.productList = products;
        project.projectUser = userData;


        res.json(project);
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;