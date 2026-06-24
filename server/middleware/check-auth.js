const HttpError  = require('../models/http-error');
const jwt = require('jsonwebtoken');

const checkAuth = (req, res, next) => {
    //Check for authorization header
    if(!req.headers.authorization){
        return next(new HttpError('Authorization header missing', 401));
    }

    //Extract token from header
    const token = req.headers.authorization.split(' ')[1]; //Authorization: 'Bearer TOKEN'
    if(!token){
        return next(new HttpError('Authentication failed', 401));
    }

    //Verify token
    try{
        const decodedToken = jwt.verify(token, process.env.JWT);
        req.userData = {userId: decodedToken.userId};
        next();
    }catch(err){
        return next(new HttpError('Authentication failed', 401));
    }
};

module.exports = checkAuth;