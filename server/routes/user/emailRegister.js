const router = require('express').Router();
const User = require('../../models/user');
const {EmailAuth, EmailAuthValidator} = require('../../models/emailAuth');
const Settings = require('../../models/settings');
const {sendMail} = require('./sendMail');
const {issueToken} = require('../../lib/JWTUtils');
const {handleErrors} = require('../../lib/error');
const {HOST_URL} = process.env;


router.post('/', async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        await EmailAuthValidator({email, password});


        // Find the email 
        const findEmail = await EmailAuth.findOne({email});

        // Throw error if email already registers
        if(findEmail) throw Error('This email is already registered');

        
        // Creating user
        const newUser = new User({ username, email});
        // Save User data to database
        const newData = await newUser.save();

        // Create Refresh and Access Token
        const refreshToken = await issueToken({userId: newData._id, userType: "admin", tokenType: "refresh"}, '180d');
        

        // Store data to Auth database
        const auth = new EmailAuth({
            userId: newData._id,
            email,
            password
        });

        // Setup settings in database
        const setting = new Settings({
            userId: newData._id,
            userType: "admin",
            verified: true,
            sessions: {
                sessionId: 1,
                refreshToken,
                verified: true
            }
        });

        // Save settings and 
        await Promise.all([
            auth.save(),
            setting.save()
        ]);


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
            msg: "Your account is created successfully. Please confirm your email." 
        });

return;
        try{
            // Sending JSON response
            const activateToken = await issueToken({userId: newData._id, tokenType: "emailVerify"});
            // Verify Email
            const emailResult = await sendMail({
                to: newData.email,
                subject: 'Verification mail',
                text: `Click on the given link ${HOST_URL}/api/user/activate/${activateToken}`,
                template: 'email',
                context: {
                    username: newData.username,
                    email: newData.email,
                    link: `${HOST_URL}/api/user/activate/${activateToken}`
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
