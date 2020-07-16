const express = require('express');
const router = express.Router();
const db = require('../models');

//--User Profile--
  router.get('/profile', (req,res)=>{
    db.User.findById(req.session.currentUser._id, (err, foundUser)=>{
      if (err) return console.log(err);
      res.render('users/profile', {
        user: foundUser,
      });
    });
  });

module.exports = router;