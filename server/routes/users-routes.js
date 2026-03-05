const express = require('express');
const router = express.Router();
const {userSignup, userLogin, userProfile} = require('../controllers/users-controller');


//GET api/users/:uid
router.get('/:uid', userProfile);

//POST api/users/signup
router.post('/signup',userSignup);

//POST api/users/login
router.post('/login', userLogin);

module.exports = router;