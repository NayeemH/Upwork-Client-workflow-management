const router = require('express').Router();
const User = require('../../models/user');




router.post('/', async (req, res, next) => {
    try {
        const {userId} = req.user;
        
        const user = await User.findOne({_id: userId});

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