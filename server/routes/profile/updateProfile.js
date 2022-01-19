const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const {EmailAuth }= require('../../models/emailAuth');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.patch('/', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {username, password, newPassword} = req.body;

        const updateInfo = {};
        
        // Check if username and description is given
        if(username) updateInfo.username = username;
        //if(description) updateInfo.description = description;

        if(password && newPassword) {
            const user = await EmailAuth.findOne({userId});
            
            const valid = await bcrypt.compare(password, user.password);

            if(!valid) throw Error('Invalid Password');

            user.password = newPassword;
            await user.save();
        }

        if(req.file) {
            const {buffer, mimetype} = req.file;

            const images = await saveImage(buffer, mimetype);
            updateInfo.image = images[1];
        }
        
        await User.findOneAndUpdate({_id: userId}, {$set: updateInfo});

        res.json({
            success: true,
            msg: ['Profile is updated successfully'],
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;