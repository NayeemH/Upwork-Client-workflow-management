const router = require('express').Router();
const Product = require('../../models/product');
const { Project } = require('../../models/project');
const Step = require('../../models/step');
const User = require('../../models/user');




router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.user;

        const user = await User.findOne({_id: userId});

        const projectsInfo = await Project.find(
            {_id: {$in: [...user.projects]}}, 
            {image: 1, name: 1, description: 1, _id: 1, projectUser: 1, productList: 1}
        );

        const userIds = [];
        const productIds = [];

        projectsInfo.forEach(project => {
            project.projectUser.forEach(({userId}) => {
                userIds.push(userId);
            });
            productIds.push(...project.productList);
        });

        const uniqueUserIds = [... new Set(userIds)];

        // Find data from the data
        const userData = await User.find(
            {_id: {$in: uniqueUserIds }}, 
            {username: 1, email: 1, image: 1, _id: 1}
        );

        const products = await Product.find({_id: {$in: productIds}});

        const stepIds = [];
        products.forEach(product => {
            stepIds.push(...product.steps);
        });

        const steps = await Step.find({_id: {$in: stepIds}});


        let finalProjects = [];

        let flag = 1;
        for(let i = 0; i < projectsInfo.length; i++) {
            for(let j = 0; j < projectsInfo[i].productList.length; j++) {
                const product = products.find(value => value._id.toString() === projectsInfo[i].productList[j].toString());
                if(!product) continue;
                for(let k = 0; k < product.steps.length; k++) {
                    const step = steps.find(value => value._id.toString() === product.steps[k].toString());

                    if(!step.finalImage) {
                        flag = 0;
                        break;
                    }
                }
                if(!flag) {
                    break;
                }
            }
            if(!flag || projectsInfo[i].productList.length === 0) {
                flag = 1;
                finalProjects.push(projectsInfo[i]);
                continue;
            }
        }


        // Assigning user data to the project data
        const newProjectInfo = finalProjects.map(project => {
            const newProjectUser = project.projectUser.map(user => {
                
                const info = userData.find(value => value._id.toString() === user.userId.toString());
                
                return {
                    userId: user.userId,
                    username: info && info.username,
                    email: info && info.email,
                    userType: user.userType,
                    image: info && info.image
                }
            });

            return {
                id: project._id,
                name: project.name,
                description: project.description,
                image: project.image,
                productNumber: project.productList.length,
                projectUser: newProjectUser
            }
        });


        res.json(newProjectInfo);
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;