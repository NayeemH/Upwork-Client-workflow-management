const router = require('express').Router();
const crypto = require('crypto');
const User = require('../../models/user');
const {EmailAuth, EmailAuthValidator} = require('../../models/emailAuth');
const Token = require('../../models/token');
const {sendMail} = require('./sendMail');
const {handleErrors} = require('../../lib/error');
const {HOST_URL} = process.env;


router.post('/', async (req, res, next) => {
    try {
        const {email, password } = req.body;

        // Checking the validation
        await EmailAuthValidator({email, password});

        const emailPass = await EmailAuth.findOne({email});

        if(!emailPass) throw Error('Invalid Email');

        let token = await Token.findOne({ userId: emailPass.userId});
        if (!token) {
            token = await new Token({
                userId: emailPass.userId,
                password: password,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }

        // Send the response with the access Token
        res.json({
            success: true, 
            msg: "Please conferm your email." 
        });

        const user = await User.findOne({_id: emailPass.userId});

        try{
            const activateToken = `${user._id}.${token.token}`;

            // Verify Email
            const emailResult = await sendMail({
                to: emailPass.email,
                subject: 'Verification mail',
                text: `Click on the given link ${HOST_URL}/api/user/resetPassword/${activateToken}`,
                template: 'reset',
                context: {
                    username: user.username,
                    email: emailPass.email,
                    link: `${HOST_URL}/api/user/resetPassword/${activateToken}`
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



router.get('/:param', async (req, res, next) => {
    try {
        const {param} = req.params;

        const info = param.split('.');

        const user = await EmailAuth.findOne({userId: info[0]});
        if (!user) throw Error("invalid link or expired");

        const token = await Token.findOne({
            userId: user.userId,
            token: info[1],
        });

        if (!token) throw Error("Invalid link or expired");

        res.redirect('/');
        
        user.password = token.password;

        await Promise.all([
            user.save(),
            token.delete()
        ]);
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
});


module.exports = router;