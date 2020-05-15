
const { validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = async (req, res, next) => {
    try{
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
          const error =  new Error('Invalid input');
          error.statusCode = 422;
          error.data = errors.array();
          throw error;
      }
      const email = req.body.email;
      const password = req.body.password;
      const hashPw = await bcryptjs.hash(password, 12)
      const user = new User({email: email, password: hashPw});
      const result = await user.save();
      res.status(201).json({message: 'Create Success', userId: result._id});
    } catch(e) {
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
}; 

exports.login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    let loadUser;
    try{
        const user = await User.findOne({email: email});
        if(!user) {
            const e = new Error('Email or password fail');
            e.statusCode = 401;
            throw e;
        }
        loadUser = user;
        const isEqual = await bcryptjs.compare(password, user.password);
        if(!isEqual) {
            const e = new Error('Email or password fail');
            e.statusCode = 401;
            throw e;
        }
        const token = jwt.sign({
            email: loadUser.email,
            userId: loadUser._id.toString()
        }, 'Iamthebest',
        { expiresIn: '1h'});
        res.status(200).json({token: token, expirationTime: 3600, userId: loadUser._id.toString()});
    } catch(e) {
        if(!e.statusCode){
            e.statusCode = 500;
        }
        next(e);
    }
}
exports.getUserStatus = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ status: user.status });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };
  
  exports.updateUserStatus = async (req, res, next) => {
    const newStatus = req.body.status;
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        const error = new Error('User not found.');
        error.statusCode = 404;
        throw error;
      }
      user.status = newStatus;
      await user.save();
      res.status(200).json({ message: 'User updated.' });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };