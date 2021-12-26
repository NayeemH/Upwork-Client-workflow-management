const router = require('express').Router();
const crypto = require('crypto');
const isAuth = require('../authenticate/isAuth');
const isAdmin = require('../authenticate/isAdmin');
const User = require('../../models/user');
const {ProjectToken, EmailValidator }= require('../../models/projectLoginToken');
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

        await EmailValidator({projectId, email, userType});


        let projectToken = await ProjectToken.findOne({projectId, email, userType});

        if (!projectToken) {
            projectToken = new ProjectToken({
                adminId,
                projectId,
                email,
                userType,
                token: crypto.randomBytes(32).toString("hex")
            });
        }
        await projectToken.save();

        // Send the response with the access Token
        res.json({
            success: true, 
            msg: `Email is send to the ${userType}` 
        });


        try{
            const activateToken = `${projectId}.${projectToken.token}`;

            // Verify Email
            const emailResult = await sendMail({
                to: email,
                subject: 'Login to the Project',
                text: `Click on the given link ${HOST_URL}/admin/sendLoginMail/${activateToken}`,
                template: 'loginmail',
                context: {
                    email: email,
                    link: `${HOST_URL}/admin/sendLoginMail/${activateToken}` // Create this link to react router
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



router.post('/:token', async (req, res, next) => {
    try {
        const {username, password} = req.body;
        const {token} = req.params;


        const info = token.split('.');


        let projectToken = await ProjectToken.findOne({projectId: info[0], token: info[1]});

        if (!projectToken) throw Error("Invalid link");

        await EmailAuthValidator({email: projectToken.email, password});

        // Creating user
        const newUser = new User({ username, eamil: projectToken.email});
        // Save User data to database
        const newData = await newUser.save();


        // Create Refresh and Access Token
        const refreshToken = await issueToken({
            userId: newData._id,
            userType: projectToken.userType,
            tokenType: "refresh"}, '180d');
        

        // Store data to Auth database
        const auth = new EmailAuth({
            userId: newData._id,
            eamil: projectToken.email,
            password
        });

        // Setup settings in database
        const setting = new Settings({
            userId: newData._id,
            userType: projectToken.userType,
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
            msg: "Your account is updated successfully" 
        });


        


        // Adding him to the projects


        // Save settings and 
        await Promise.all([
            auth.save(),
            setting.save(),
            projectToken.delete()
        ]);
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
});



module.exports = router;
