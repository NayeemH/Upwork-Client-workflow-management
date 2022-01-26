const router = require('express').Router();
const { Project } = require('../../models/project');
const User = require('../../models/user');
const Settings = require('../../models/settings');




router.get('/:userType', async (req, res, next) => {
    try {
        const {userType} = req.params;

        // Check if the userType is valid
        if(!(userType === 'client' || userType === 'developer' || userType === 'manager')) {
            throw Error(`Invalid userType ${userType}`);
        }

        const settings = await Settings.find({userType});

        const userIds = settings.map(({userId}) => userId);

        const users = await User.find({_id: userIds}, {__v: 0});

        const allProjects = await Project.find({});

        const newUsers = users.map(user => {
            const projectData = user.projects.map(projectId => {
                const info = allProjects.find(value => value._id.toString() === projectId.toString());
                
                return {
                    _id: info && info._id,
                    name: info && info.name
                }
            });

            return {
                _id: user._id,
                name: user.username,
                email: user.email,
                image: user.image,
                projects: projectData
            }
        });


        res.json(newUsers);
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;