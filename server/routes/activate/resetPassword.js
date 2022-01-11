const router = require('express').Router();
const Token = require('../../models/token');
const {EmailAuth} = require('../../models/emailAuth');



// token =>  id.token
router.post('/:param', async (req, res, next) => {
    try {
        const {param} = req.params;
        const {password} = req.body;

        const info = param.split('.');

        // const user = await EmailAuth.findOne({userId: info[0]});
        // if (!user) throw Error("invalid link or expired");

        const token = await Token.findOne({
            userId: info[0],
            token: info[1],
        });

        if (!token) throw Error("Invalid link or expired");
        
        const emailAuth = await EmailAuth({userId: info[0]});
        emailAuth.password = password;

        await Promise.all([
            emailAuth.save(),
            token.delete()
        ]);

        res.json({
            success: true,
            msg: "Password is reseted"
        });
    }
    catch (err) {
        err.status = 400;
        next(err);
    }
});



module.exports = router;