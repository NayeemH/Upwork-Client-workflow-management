const fs = require('fs');
const path = require('path');
const sizeOf = require('image-size');
const router = require('express').Router();

const {Project} = require('../../models/project');
const Product = require('../../models/product');
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

        const products = await Product.find({projectId});

        const querySteps = [];

        products.forEach(product => {
            querySteps.push(product.steps[product.steps.length -1 ]);
        });

        // Find the steps which has contain final image

        const finalSteps = await Step.find({_id: {$in: querySteps}});

        const finalProducts = [];
        finalSteps.forEach((step, i) => {
            if(step.finalImage) {
                const buffer = fs.readFileSync(path.resolve(`data/image/original/${step.finalImage}`));
                const {width, height} = sizeOf(buffer);

                finalProducts.push({
                    _id: products[i]._id,
                    name: products[i].name,
                    image: products[i].image,
                    size: buffer.length / 1024,
                    width,
                    height
                });
            }
        });

        res.json({
            success: true,
            data: finalProducts
        })

    }
    catch(err) {
        next(err);
    }
});


module.exports = router;