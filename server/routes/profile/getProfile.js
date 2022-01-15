const router = require('express').Router();
const User = require('../../models/user');




router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.user;
        
        const user = await User.findOne({_id: userId}, {username: 1, email: 1, _id: 1, image: 1});

        res.json({
            success: true,
            data: user,
        });
    }
    catch(err) {
        next(err);
    }
});


module.exports = router;