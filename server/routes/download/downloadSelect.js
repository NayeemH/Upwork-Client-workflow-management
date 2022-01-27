const router = require('express').Router();

const {Project} = require('../../models/project');
const Product = require('../../models/product');
const Step = require('../../models/step');
const imageZip = require('../../lib/imageZip');

router.post('/:projectId', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {projectId} = req.params;
        const {productList} = req.body;


        const project = await Project.findOne({_id: projectId}, {__v: 0});

        if(!project) throw Error('Project not found');

        // Check for valid user access
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this project");

        const products = await Product.find({_id: {$in: productList}, projectId});

        const querySteps = [];

        products.forEach(product => {
            querySteps.push(product.steps[product.steps.length -1 ]);
        });

        // Find the steps which has contain final image

        const finalImageSteps = await Step.find({_id: {$in: querySteps}});

        const images = [];
        finalImageSteps.forEach((step, i) => {
            if(step.finalImage) {
                images.push({
                    path: step.finalImage,
                    name: products[i].name
                });
            }
        });

        const buffer = imageZip(images, project.name);

        res.set('Content-Type','application/zip');
        res.set('Content-Disposition',`attachment; filename=${project.name}.zip`);
        res.set('Content-Length',buffer.length);
        res.send(buffer);

    }
    catch(err) {
        next(err);
    }
});


module.exports = router;