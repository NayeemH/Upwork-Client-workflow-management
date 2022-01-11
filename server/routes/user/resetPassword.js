const router = require('express').Router();
const crypto = require('crypto');
const User = require('../../models/user');
const {EmailAuth} = require('../../models/emailAuth');
const Token = require('../../models/token');
const {sendMail} = require('./sendMail');
const {handleErrors} = require('../../lib/error');
const {CLIENT_URL} = process.env;


router.post('/', async (req, res, next) => {
    try {
        const {email} = req.body;

        // No need to validate the email. Because only valid email can be saved on db.
        const emailPass = await EmailAuth.findOne({email});

        if(!emailPass) throw Error('Invalid Email');

        let token = await Token.findOne({ userId: emailPass.userId});
        if (!token) {
            token = await new Token({
                userId: emailPass.userId,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        // Send the response with the access Token
        res.json({
            success: true, 
            msg: "Please check your email." 
        });

        const user = await User.findOne({_id: emailPass.userId});

        try{
            const activateToken = `${user._id}.${token.token}?email=${encodeURI(email)}`;

            // Verify Email
            const emailResult = await sendMail({
                to: emailPass.email,
                subject: 'Verification mail',
                text: `Click on the given link ${CLIENT_URL}/activate/resetPassword/${activateToken}`,
                template: 'reset',
                context: {
                    username: user.username,
                    email: emailPass.email,
                    link: `${CLIENT_URL}/activate/resetPassword/${activateToken}`
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