const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const {register, login,logout} = require('../controller/auth.controller');


router.post('/register', register);

router.post('/login', login);

router.get('/logout', logout);
module.exports = router;