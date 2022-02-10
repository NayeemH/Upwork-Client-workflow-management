const router = require('express').Router();
const Domain = require('../../models/domain');

router.get('/', async (req, res, next) => {
    try {
        const {domain} = req.user;

        const domainValue =  await Domain.findOne({subdomain: domain});
        

        // Send the response with the access Token
        res.json({
            success: true, 
            data: domainValue
        });
    }
    catch(err) {
        next(err);
    }

});



module.exports = router;
