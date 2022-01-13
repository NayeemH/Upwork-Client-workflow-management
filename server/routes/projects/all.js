const router = require('express').Router();
const { Project } = require('../../models/project');
const User = require('../../models/user');




router.post('/', async (req, res, next) => {
    try {
        const {userId} = req.user;

        const user = await User.findOne({_id: userId});

        const projectsInfo = await Project.find(
            {_id: {$in: [...user.projects]}}, 
            {image: 1, name: 1, description: 1, _id: 1, projectUser: 1}
        );

        res.json(projectsInfo);
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;