const express = require('express');
const router = express.Router();
const {userSignup, userLogin, getUsers} = require('../controllers/users-controller');

//POST api/users/signup
router.post('/signup',userSignup);

//POST api/users/login
router.post('/login', userLogin);

//GET api/users
router.get('/', getUsers); 

module.exports = router;