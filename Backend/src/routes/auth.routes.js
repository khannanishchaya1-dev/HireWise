const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const {register, login,logout,getMe} = require('../controller/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');


router.post('/register', register);
router.get('/me', authMiddleware, getMe);

router.post('/login', login);

router.get('/logout', authMiddleware, logout);
module.exports = router;