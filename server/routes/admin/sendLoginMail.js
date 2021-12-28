const router = require('express').Router();
const crypto = require('crypto');
const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin');
const User = require('../../models/user');
const Project = require('../../models/project');
const {ProjectToken, ProjectTokenValidator }= require('../../models/projectLoginToken');
const {EmailAuth, EmailAuthValidator} = require('../../models/emailAuth');
const Settings = require('../../models/settings');
const {sendMail} = require('../user/sendMail');
const {issueToken} = require('../../lib/JWTUtils');
const {handleErrors} = require('../../lib/error');
const {HOST_URL} = process.env;



router.post('/', isAuth, isAdmin, async (req, res, next) => {
    try {
        const { projectId, email, userType } = req.body;
        const {userId: adminId} = req.user;

        await ProjectTokenValidator({projectId, email, userType});

        // Check if the userType is valid
        if(!(userType === 'client' || userType === 'developer' || userType === 'manager')) {
            throw Error(`Invalid userType ${userType}`);
        }

        // Find the project
        const project = await Project.findOne({adminId, _id: projectId});

        if(!project) throw Error("Project Not Found"); 

        // Find the project token
        let projectToken = await ProjectToken.findOne({projectId, email, userType});

        // If doesn't find the project token then create the token
        if (!projectToken) {
            projectToken = new ProjectToken({
                adminId,
                projectId,
                email,
                userType,
                token: crypto.randomBytes(32).toString("hex")
            });
            await projectToken.save();
        }

        // Send the response with the access Token
        res.json({
            success: true, 
            msg: `Email is send to the ${userType}` 
        });

        const user = await EmailAuth.findOne({email});

        let activateURL = '/admin/sendLoginMail';

        if(user) {
            activateURL += `/user/${projectId}.${projectToken.token}` // This is frantend link
        }
        else {
            activateURL += `/notuser/${projectId}.${projectToken.token}`; // This is frantend link
        }


        try{
            // Verify Email
            const emailResult = await sendMail({
                to: email,
                subject: 'Login to the Project',
                text: `Click on the given link ${HOST_URL}${activateURL}`,
                template: 'loginmail',
                context: {
                    email: email,
                    link: `${HOST_URL}${activateURL}` // Create this link to react router
                }
            });
        }
        catch(err) {
            console.log(err.message);
        }
    }
    catch (err) {
        const errors = handleErrors(err);
        next(errors);
    }
});



router.post('/:user/:token', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const {user, token} = req.params;


        const info = token.split('.');


        const projectToken = await ProjectToken.findOne({projectId: info[0], token: info[1]});

        if (!projectToken) throw Error("Invalid link");

        // Destructuring the porjectToken values
        const {projectId, email, userType} = projectToken;

        await EmailAuthValidator({email, password});

        // Creating user
        if(user === 'notuser') {
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
                msg: "Your account is created and project is updated successfully" 
            });

            // Adding him to the projects


// Here


            // Save settings and 
            await Promise.all([
                auth.save(),
                setting.save(),
                projectToken.delete()
            ]);
        }
        else if(user === 'user') {
            // Adding him to the projects
            

// Here


            // Send the response
            res.json({
                success: true, 
                msg: "Your project is added successfully" 
            });

            // Remove the token
            await projectToken.delete();
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
