const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const db = require('../models');

router.get('/login', (req,res)=>{
  res.render('auth/login');
});

router.get('/register', (req,res)=>{
  res.render('auth/register');
});

router.post('/login', (req,res)=>{
  db.users.findOne({email: req.body.email}, (err, foundUser)=>{
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
        res.redirect('/users/show');
      } else {
        return res.send('Passwords do not match');
      }   
    });
  });
});

router.post('/register', (req,res)=>{
  db.users.findOne({email:req.body.email},
  (err,foundUser) =>{
    if (err) return console.log(err);
    if (foundUser) return console.log('User already exist');
    bcrypt.genSalt(10, (err,salt)=>{
      if(err) return console.log(err);
      bcrypt.hash(req.body.password,
      salt, (err,hash)=>{
        if (err) return console.log(err);
        const{ name, email, password} = req.body;
        const newUser = {
          name,
          email,
          password: hash,
        };
        db.users.create(newUser, (err, createdUser) => {
          if(err) return console.log(err);
          res.redirect('/login');
        });
      });
    });
  });
});

module.exports = router;