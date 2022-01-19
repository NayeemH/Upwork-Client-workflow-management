const router = require('express').Router();
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const { Project } = require('../../models/project');
const Product = require('../../models/product');
const User = require('../../models/user');




router.post('/', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {userId, userType} = req.user;
        const {projectId, name, steps} = req.body;
        const {buffer, mimetype} = req.file;

        // Check if this user is manager or admin
        if(!((userType === 'manager') || (userType === 'admin'))) throw Error('You are not authorized. Only admin and manager can use this');

        const project = await Project.findOne({_id: projectId});

        if(!project) throw Error('Project not found');

        // Check for valid user
        const checkUser = project.projectUser.find((user) => user.userId.toString() === userId);

        if(!(project.adminId.toString() === userId || checkUser)) throw Error("Can not access this project");



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