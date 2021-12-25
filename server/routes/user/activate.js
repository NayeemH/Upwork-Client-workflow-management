const router = require('express').Router();
const {verifyToken} = require('./../../lib/JWTUtils');
const Settings = require('../../models/settings');

router.get('/:code', async (req, res, next) => {
    const {code} = req.params;

    try {
        const payload = await verifyToken(code);

        // Check for email verification
        if(payload.tokenType === 'emailVerify') {
            // check if the token is expired
            if(payload.exp * 1000 >= Date.now()) {
                // Find the user with that id and update the verified option
                const doc = await Settings.findOneAndUpdate({userId: payload.userId}, {verified: true});

                if(doc) {
                    return res.json({success: true, msg: 'You are verified'});
                }
                else throw Error('Enter valid token');
            }
            else throw Error('Token expired');
        }
        // Check for invalid session type
        else throw Error('Invalid token');

    }
    catch(err) {
        res.json({success: false, msg: [err.message]});
    }
});

module.exports = router;
