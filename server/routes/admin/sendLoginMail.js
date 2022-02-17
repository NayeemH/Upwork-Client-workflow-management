const router = require('express').Router();
const crypto = require('crypto');
const {Project} = require('../../models/project');
const {ProjectToken, ProjectTokenValidator }= require('../../models/projectLoginToken');
const {EmailAuth} = require('../../models/emailAuth');
const {sendMail} = require('../user/sendMail');
const User = require('../../models/user');
const {CLIENT_DOMAIN} = process.env;



router.post('/', async (req, res, next) => {
    try {
        const { projectId, email, userType } = req.body;
        const {userId: adminId, domain} = req.user;

        await ProjectTokenValidator({projectId, email, userType});

        // Check if the userType is valid
        if(!(userType === 'client' || userType === 'developer' || userType === 'manager')) {
            throw Error(`Invalid userType ${userType}`);
        }

        // Find the project
        const project = await Project.findOne({adminId, _id: projectId});

        if(!project) throw Error("Project Not Found"); 

        // Check if the user already logged in or not
        const user = await EmailAuth.findOne({email});

        if(user) {
            await Promise.all([
                User.findOneAndUpdate({_id: user.userId}, {$push: {projects: project._id}}),
                Project.findOneAndUpdate({_id: project._id}, {$push: {projectUser: {userId: user.userId, userType}}})
            ]);

            res.json({
                success: true, 
                msg: `Successfully added to the project` 
            });

            try{
                // Verify Email
                const emailResult = await sendMail({
                    to: email,
                    subject: 'Added to a Project',
                    text: `Added to a Project`,
                    template: 'projectAdded',
                    context: {
                        email: email,
                        projectName: project.name
                    }
                });
            }
            catch(err) {
                console.log(err.message);
            }

            return;
        }

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

        
        let activateURL = '/activate/loginMail';

        
        activateURL += `/notuser/${projectId}.${projectToken.token}?email=${encodeURI(email)}`; // This is frantend link
        

        try{
            // Verify Email
            const emailResult = await sendMail({
                to: email,
                subject: 'Login to the Project',
                text: `Click on the given link http://${domain}.${CLIENT_DOMAIN}${activateURL}`,
                template: 'loginmail',
                context: {
                    email: email,
                    link: `http://${domain}.${CLIENT_DOMAIN}${activateURL}` // Create this link to react router
                }
            });
        }
        catch(err) {
            console.log(err.message);
        }
    }
    catch (err) {
        next(err);
    }
});




module.exports = router;