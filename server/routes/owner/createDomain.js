const router = require('express').Router();
const User = require('../../models/user');
const {EmailAuth, EmailAuthValidator} = require('../../models/emailAuth');
const Settings = require('../../models/settings');
const Domain = require('../../models/domain');
const {issueToken} = require('../../lib/JWTUtils');
const {saveImage, fileFetch} = require('../../lib/imageConverter');

router.post('/', fileFetch.single('image'), async (req, res, next) => {
    try {
        const { username, email, password, subdomain, companyName } = req.body;
        const {buffer, mimetype} = req.file;

        await EmailAuthValidator({email, password});


        // Find the email 
        const findEmail = await EmailAuth.findOne({email});

        // Throw error if email already registers
        if(findEmail) throw Error('This email is already registered');

        
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
            verified: true,
            domain: subdomain
        });

        const createDomain = new Domain({
            subdomain,
            companyName,
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
            msg: "Admin account is created successfully" 
        });
    }
    catch(err) {
        next(err);
    }

});



module.exports = router;
