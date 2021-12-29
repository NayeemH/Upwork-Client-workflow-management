const router = require('express').Router();
const Settings = require('../../models/settings');
const {verifyToken} = require('../../lib/JWTUtils');
const {error} = require('../../lib/error');

router.post('/', async (req, res, next) => {
    
    try {
        const {refreshToken} = req.cookies;

        if(!refreshToken) throw Error('Refresh Token Required');

        // Check the token
        const payload = await verifyToken(refreshToken);

        // Check if it is a refresh token
        if(payload.tokenType !== 'refresh') throw Error('Invalid Token');
       
        // Clear the cookie
        res.clearCookie('refreshToken', {
            path: '/api/user'
        });

        // check if the token is expired
        if(payload.exp * 1000 >= Date.now()) {
            // Find the user with that Id
            const user = await Settings.findOne({userId: payload.userId});

            if(!user) throw Error('User Not Found');

            // Find the index of that refreshToken in memory
            const index = user.sessions.findIndex(session => session.refreshToken === refreshToken);
            
            // If not exits
            if(index === -1) {
                console.log('Previous token is used');
                throw Error('Your account may be compromised. Please login again. And also remove your session');
            }

            // Send the response
            res.json({
                success: true,
                msg: ['Logged out']
            });

            // Remove the refresh token from the session
            user.sessions.splice(index, 1);


            // Tell the mongoose that sessions array is changed
            user.markModified('sessions');
            await user.save();
        }
    }
    catch(err) {
        err.status = 403;
        next(err);
    }
});


module.exports = router;