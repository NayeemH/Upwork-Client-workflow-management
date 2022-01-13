const router = require('express').Router();
const crypto = require('crypto');
const User = require('../../models/user');
const {Project} = require('../../models/project');
const {ProjectToken}= require('../../models/projectLoginToken');
const {EmailAuth, EmailAuthValidator} = require('../../models/emailAuth');
const Settings = require('../../models/settings');
const {issueToken} = require('../../lib/JWTUtils');




router.post('/:user/:token', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const {user, token} = req.params;


        const info = token.split('.');


        const projectToken = await ProjectToken.findOne({projectId: info[0], token: info[1]});

        if (!projectToken) throw Error("Invalid link");

        // Destructuring the porjectToken values
        const {projectId, email, userType} = projectToken;


        // Creating user
        if(user === 'notuser') {
            // Validate the password
            await EmailAuthValidator({email, password});


            const newUser = new User({ username, email});
            // Save User data to database
            const newData = await newUser.save();

            // Create Refresh and Access Token
            const refreshToken = await issueToken({
                userId: newData._id,
                userType,
                tokenType: "refresh"}, '180d');


            // Store data to Auth database
            const auth = new EmailAuth({
                userId: newData._id,
                email,
                password
            });

            // Setup settings in database
            const setting = new Settings({
                userId: newData._id,
                userType,
                verified: true,
                sessions: {
                    sessionId: crypto.randomBytes(10).toString('hex'),
                    refreshToken,
                    verified: true
                }
            });

            // Setting refresh token to cookie
            res.cookie('refreshToken', refreshToken, {
                maxAge: 15552000000, 
                httpOnly: true,
            //  secure: true,  // This will be in production
                path: '/api/user'
            });

            // Send the response with the access Token
            res.json({
                success: true, 
                msg: "Your account is created successfully" 
            });


            // Save settings and 
            await Promise.all([
                auth.save(),
                setting.save(),
                projectToken.delete()
            ]);


            // Checking if the project is exists
            const project = await Project.findById(projectId);

            // Project not found
            if(!project) return console.log('Something went wrong');

            // Adding him to the projects
            project.projectUser.push({
                userId: newData._id,
                userType
            });
            project.markModified("projectUser");

            // Adding porject id to him
            newData.projects.push(projectId);
            newData.markModified('projects');

            try {
                await Promise.all([
                    project.save(),
                    newData.save()
                ]);
            }
            catch(error) {
                console.log(error);
            }            
        }
        else if(user === 'user') {
            // Adding him to the projects
            
            // Checking if the project is exists
            const [project, newData] = await Promise.all([
                Project.findById(projectId),
                User.findOne({email})
            ]);

            // Send the response
            res.json({
                success: true, 
                msg: "Your project is added successfully" 
            });

            // Project not found
            if(!project) return console.log('Something went wrong');

            // Adding him to the projects
            project.projectUser.push({
                userId: newData._id,
                userType
            });
            project.markModified("projectUser");

            // Adding porject id to him
            newData.projects.push(projectId);
            newData.markModified('projects');

            try {
                await Promise.all([
                    project.save(),
                    newData.save(),
                    projectToken.delete()
                ]);
            }
            catch(error) {
                console.log(error);
            }  

        }
        else if(user === 'reject') {
            // Send the response
            res.json({
                success: true, 
                msg: "The project is rejected successfully" 
            });

            // Remove the token
            await projectToken.delete();
        }

        else {
            // Remove the token
            await projectToken.delete();

            // Return invalid request
            return next(Error("Invalid Request"));
        }
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
});



module.exports = router;
