const router = require('express').Router();
const { Project } = require('../../models/project');
const Product = require('../../models/product');
const User = require('../../models/user');
const Step = require('../../models/step');




router.get('/:projectId', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {projectId} = req.params;

        const project = await Project.findOne({_id: projectId}, {__v: 0});

        if(!project) throw Error('Project not found');

        // Check for valid user access
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this project");


        const products = await Product.find({projectId}, {__v: 0});

        // Find all the steps
        const querySteps = [];

        products.forEach(product => {
            querySteps.push(...product.steps);
        });

        const steps = await Step.find({_id: {$in: querySteps}}, {_id: 1, name: 1, viewed: 1, finalImage: 1});


        const newProducts = products.map(product => {
            const newSteps = product.steps.map(step => {
                const newStep = steps.find(({_id}) => _id.toString() === step.toString());
                const {_id, name, viewed, finalImage} = newStep;

                return {_id, name, viewed, finalImage};
            });
            const {_id, name, image, currentStep, completed} = product;
            return {_id, name, image, steps: newSteps, currentStep, completed};
        });


        // Find all User information
        const userIds = [];

        project.projectUser.forEach(({userId}) => {
            userIds.push(userId);
        });

        // Find data from the data
        const userData = await User.find(
            {_id: {$in: userIds }}, 
            {username: 1, email: 1, image: 1, _id: 1}
        );


        project.productList = newProducts;
        project.projectUser = userData;


        res.json(project);
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;