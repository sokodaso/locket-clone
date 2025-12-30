//Dummy user data 
const DUMMY_USERS = [
    { id: 'u1', name: 'John Doe', email: 'johndoe@gmail.com', password: 'supersecret'},
    { id: 'u2', name: 'Jane Smith', email: 'janesmith@gmail.com', password: 'mypassword'}
];

const HttpError = require('../models/http-error');

const userLogin = (req, res, next) => {
    console.log('Logging in user');
    const {email, password} = req.body;
    const identifiedUser = DUMMY_USERS.find(user => user.email === email);

    if (!identifiedUser || identifiedUser.password !== password) {
        return next(new HttpError('Invalid credentials, could not log you in.', 401));
    }
    res.json({ message: 'User logged in' });
};

const userSignup =  (req, res, next) => {
    console.log('Signing up user');
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return next(new HttpError('Invalid input, missing field', 422));
    }

    const existingUser = DUMMY_USERS.find(user => user.email === email);

    if(existingUser) {
        return next(new HttpError('User exists already, please login instead.', 422));
    }

    const createdUser= {
        id: Math.random().toString(),
        name,
        email,
        password
    };

    DUMMY_USERS.push(createdUser);
    res.json({ message: 'User signed up' });
};

const getUsers = (req, res, next) => {
    res.json({ users: DUMMY_USERS });
};

exports.userLogin = userLogin;
exports.userSignup = userSignup;
exports.getUsers = getUsers;