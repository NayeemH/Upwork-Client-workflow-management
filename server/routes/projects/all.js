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

        const userIds = [];

        projectsInfo.forEach(project => {
            project.projectUser.forEach(({userId}) => {
                userIds.push(userId);
            });
        });

        const uniqueUserIds = [... new Set(userIds)];

        // Find data from the data
        const userData = await User.find(
            {_id: {$in: uniqueUserIds }}, 
            {username: 1, email: 1, image: 1, _id: 1}
        );

        // Assigning user data to the project data
        const newProjectInfo = projectsInfo.map(project => {
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