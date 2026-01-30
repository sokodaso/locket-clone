const HttpError = require('../models/http-error');
const {prisma} = require('../prisma');

const userSignup =  async (req, res, next) => {
    console.log('Signing up user');
    const {name, email, password} = req.body;

    //Validation logic 
    if (!name || !email || !password) {
        return next(new HttpError('Invalid input, missing field', 422));
    }

    //Check if user exists
    let existingUser;
    try{
         existingUser = await prisma.user.findUnique({ where: { email: email } });
    }catch(err){
        const error = new HttpError('Signing up failed, please try again.',500);
        return next(error);
    }
    
    if(existingUser) {
        return next(new HttpError('User exists already, please login instead.', 422));
    }

    //Create new user
    let createdUser;
    try{
        createdUser= await prisma.user.create({
            data:{name, email, password}
        });
    }catch(err){
        const error = new HttpError('Signing up failed, please try again.',500);
        return next(error);
    }
    res.json({ message: 'User signed up' });
};

const userLogin = async (req, res, next) => {
    console.log('Logging in user');
    const {email, password} = req.body;
    const identifiedUser = await prisma.user.findUnique({ where: { email: email } });

    if (!identifiedUser || identifiedUser.password !== password) {
        return next(new HttpError('Invalid credentials, could not log you in.', 401));
    }
    res.json({ message: 'User logged in' });
};




exports.userLogin = userLogin;
exports.userSignup = userSignup;