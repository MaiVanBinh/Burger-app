const authController = require('../controllers/auth');
const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const User = require('../models/user');
const isAuth = require('../middleware/is-auth');

router.post('/signup',[
    body('email')
    .isEmail()
    .withMessage('Email invalid')
    .custom((value, { req }) => {
        return User.findOne({email: value}).then(userDoc => {
            if(userDoc) {
                return Promise.reject('Email already exists');
            }
        })
    }).normalizeEmail(),
    body('password','password error').trim().isLength({min: 5}),
] ,authController.signup);

router.post('/login', authController.login);

module.exports = router;