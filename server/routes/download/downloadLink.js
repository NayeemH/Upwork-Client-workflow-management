const crypto = require('crypto');
const router = require('express').Router();

const {Project} = require('../../models/project');
const Product = require('../../models/product');
const Download = require('../../models/download');


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


        const newProductList = products.map(product => product._id);

        
        const token = crypto.randomBytes(6).toString('hex');
        const download = new Download({
            productList: newProductList,
            name: project.name,
            token
        });

        await download.save();

        res.json({
            success: true,
            downloadLink: `${process.env.HOST_URL}/api/download/${token}`
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;