const router = require('express').Router();
const User = require('../../models/user');
const crypto = require('crypto');
const {EmailAuth, EmailAuthValidator} = require('../../models/emailAuth');
const Settings = require('../../models/settings');
const Domain = require('../../models/domain');
const Token = require('../../models/token');
const {saveImage, fileFetch} = require('../../lib/imageConverter');
const {sendMail} = require('../user/sendMail');
const {HOST_URL} = process.env;


router.post('/', fileFetch.single('image'), async (req, res, next) => {
    try {
        const { username, email, password, subdomain} = req.body;
        const {buffer, mimetype} = req.file;

        await EmailAuthValidator({email, password});


        // Find the email 
        const findEmail = await EmailAuth.findOne({email});

        // Throw error if email already registers
        if(findEmail) throw Error('This email is already registered');

        const findDomain = await Domain.findOne({subdomain});
        if(findDomain) throw Error('This domain is already registered');


        // Creating user
        const newUser = new User({ username, email});
        // Save User data to database
        const newData = await newUser.save();

        // Save the image        
        const images = await saveImage(buffer, mimetype);

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
            verified: false,
            domain: subdomain
        });

        const createDomain = new Domain({
            subdomain,
            companyLogo: images[1]
        });


        // Save settings and 
        await Promise.all([
            createDomain.save(),
            auth.save(),
            setting.save()
        ]);


        // Send the response with the access Token
        res.json({
            success: true, 
            msg: "Admin account is created successfully. Verify your mail" 
        });

        let token = await Token.findOne({ userId: newData._id});
        if (!token) {
            token = await new Token({
                userId: newData._id,
                token: crypto.randomBytes(32).toString("hex"),
            }).save();
        }


        try{
            const activateToken = `${newData._id}.${token.token}?email=${encodeURI(email)}`;

            // Verify Email
            const emailResult = await sendMail({
                to: newData.email,
                subject: 'Verification mail',
                text: `Click on the given link ${HOST_URL}/api/activate/${activateToken}`,
                template: 'email',
                context: {
                    username: newData.name,
                    email: newData.email,
                    link: `${HOST_URL}/api/activate/${activateToken}`
                }
            });
        }
        catch(err) {
            console.log(err.message);
        }
    }
    catch(err) {
        next(err);
    }

});



module.exports = router;
