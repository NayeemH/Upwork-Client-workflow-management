const router = require('express').Router();
const User = require('../../models/user');
const {saveImage, fileFetch} = require('../../lib/imageConverter');



router.patch('/', fileFetch.single('image'), async (req, res, next) => {
    try {
        const {userId} = req.user;
        const {username, description} = req.body;

        const updateInfo = {};
        
        // Check if username and description is given
        if(username) updateInfo.username = username;
        //if(description) updateInfo.description = description;

        if(req.file) {
            const {buffer, mimetype} = req.file;

            const images = await saveImage(buffer, mimetype);
            updateInfo.image = images[1];
        }
        
        await User.findOneAndUpdate({_id: userId}, {$set: updateInfo});

        res.json({
            success: true,
            msg: ['Project is updated successfully'],
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;