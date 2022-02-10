const router = require('express').Router();
const Token = require('../../models/token');
const User = require('../../models/user');
const Settings = require('../../models/settings');
const {CLIENT_DOMAIN} = process.env;

// token =>  id.token
router.get('/:param', async (req, res, next) => {
    try {
        const {param} = req.params;

        const info = param.split('.');


        const token = await Token.findOne({
            userId: info[0],
            token: info[1],
        });

        if (!token) throw Error("Invalid link or expired");
        
        
        
        await Promise.all([
            Settings.findOneAndUpdate({userId: info[0]}, {$set: {verified: true}}),
            token.delete()
        ]);

        const setting = await Settings.findOne({userId: info[0]});
        
        res.redirect(`http://${setting.domain}.${CLIENT_DOMAIN}/login`)
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
});



module.exports = router;