const express = require('express');
const router = express.Router();
const {userSignup, userLogin} = require('../controllers/users-controller');

//POST api/users/signup
router.post('/signup',userSignup);

//POST api/users/login
router.post('/login', userLogin);

module.exports = router;