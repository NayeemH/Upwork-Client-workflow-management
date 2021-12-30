const router = require('express').Router();
const crypto = require('crypto');
const {Project} = require('../../models/project');
const {ProjectToken, ProjectTokenValidator }= require('../../models/projectLoginToken');
const {EmailAuth} = require('../../models/emailAuth');
const {sendMail} = require('../user/sendMail');
const {handleErrors} = require('../../lib/error');
const {CLIENT_URL} = process.env;



router.post('/', async (req, res, next) => {
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

        let activateURL = '/activate/loginMail';

        if(user) {
            activateURL += `/user/${projectId}.${projectToken.token}?email=${encodeURI(email)}` // This is frantend link
        }
        else {
            activateURL += `/notuser/${projectId}.${projectToken.token}?email=${encodeURI(email)}`; // This is frantend link
        }


        try{
            // Verify Email
            const emailResult = await sendMail({
                to: email,
                subject: 'Login to the Project',
                text: `Click on the given link ${CLIENT_URL}${activateURL}`,
                template: 'loginmail',
                context: {
                    email: email,
                    link: `${CLIENT_URL}${activateURL}` // Create this link to react router
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




module.exports = router;