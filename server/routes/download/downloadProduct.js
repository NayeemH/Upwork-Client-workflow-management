const router = require('express').Router();

const {Project} = require('../../models/project');
const Product = require('../../models/product');
const Step = require('../../models/step');
const imageZip = require('../../lib/imageZip');

router.get('/:productId', async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {productId} = req.params;

        const product = await Product.findOne({_id: productId}, {__v: 0});

        if(!product) throw Error('Product not found');

        const project = await Project.findOne({_id: product.projectId});

        if(!project) throw Error('Project not found');

        
        // Check for valid user access
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this project");


        // Find the steps which has contain final image
        const finalImageSteps = await Step.find({_id: {$in: product.steps}});

        const images = [];
        finalImageSteps.forEach((step, i) => {
            if(step.finalImage) {
                images.push({
                    path: step.finalImage,
                    name: step.name
                });
            }
        });

        const buffer = imageZip(images, product.name);

        res.set('Content-Type','application/zip');
        res.set('Content-Disposition',`attachment; filename=${product.name}.zip`);
        res.set('Content-Length',buffer.length);
        res.send(buffer);

    }
    catch(err) {
        next(err);
    }
});


module.exports = router;