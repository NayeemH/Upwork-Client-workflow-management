

const getDomain = (req, res, next) => {
    
    if(req.user) {
        if(req.user.domain === req.subdomains[0]) {
            return next();
        }
        else {
            return next(Error('You are not authorized in this domain'));
        }
    }
    else {
        req.user = {
            domain: req.subdomains[0]
        };
    }
    return next();
}

module.exports = getDomain;