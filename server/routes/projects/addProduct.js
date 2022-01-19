const router = require('express').Router();
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const { Project } = require('../../models/project');
const Product = require('../../models/product');
const User = require('../../models/user');




router.post('/', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {projectId, name, steps} = req.body;
        const {buffer, mimetype} = req.file;


        const project = await Project.findOne({_id: projectId});

        if(!project) throw Error('Project not found');

        // TODO: Check for valid user

        // Save the image        
        const images = await saveImage(buffer, mimetype);


        const product = new Product({
            projectId: project._id,
            name,
            image: images[1],
            steps: steps.map(name => ({name}))
        });

        const savedProduct = await product.save();

        project.productList.push(savedProduct._id);

        project.markModified("productList");
        await project.save();

        res.json({
            success: true,
            msg: 'Product is added'
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;