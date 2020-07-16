const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../models');

//--Login Form Route--
router.get('/login', (req,res)=>{
  res.render('auth/login');
});

//--Register Form Route--
router.get('/register', (req,res)=>{
  res.render('auth/register');
});

//--Login Route--
router.post('/login', (req,res)=>{
  db.User.findOne({username: req.body.username}, (err, foundUser)=>{
    if (err) return console.log(err);
    if(!foundUser){
      return res.send('No user Found');
    }
    bcrypt.compare(req.body.password,foundUser.password,(err, isMatch)=>{
      if (err) return console.log(err);
      if (isMatch){
        const currentUser = {
          _id: foundUser._id,
          username: foundUser.username,
          email: foundUser.email,
          isLoggedIn: true,
        }
        req.session.currentUser = currentUser;
        res.redirect('/users/profile');
      } else {
        return res.send('Passwords do not match');
      }   
    });
  });
});

//--Register Route--
router.post('/register', (req,res)=>{
  db.User.findOne({email:req.body.email},
  (err,foundUser) =>{
    if (err) return console.log(err);
    if (foundUser) return console.log('User already exist');
    bcrypt.genSalt(10, (err,salt)=>{
      if(err) return console.log(err);
      bcrypt.hash(req.body.password,
      salt, (err,hash)=>{
        if (err) return console.log(err);
        const{ username, email, password} = req.body;
        const newUser = {
          username,
          email,
          password: hash,
        };
        db.User.create(newUser, (err, createdUser) => {
          if(err) return console.log(err);
          res.redirect('/login');
        });
      });
    });
  });
});

//--Logout Route--
router.get('/logout', (req,res) => {
  if (!req.session.currentUser) return res.send('You must be logged in to logout');
  req.session.destroy((err) => {
    if(err) return console.log(err);
    res.redirect('/login');
  });
});

module.exports = router;