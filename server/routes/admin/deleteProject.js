const router = require('express').Router();
const {Project} = require('../../models/project');



router.post('/', async (req, res, next) => {
    try {
        const {projectId} = req.body;
        const {userId: adminId} = req.user;

        const project = await Project.findOne({_id: projectId, adminId});            

        if (!project) throw Error("Project not found");

        await project.delete();

        // Send the response
        res.json({
            success: true, 
            msg: `This project is deleted. The project id is ${project._id}`
        });
    }
    catch (err) {
        next(err);
    }
});


module.exports = router;