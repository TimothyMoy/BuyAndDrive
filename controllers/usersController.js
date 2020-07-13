const express = require('express');
const router = express.Router();
const db = require('../models');

//--User Index--

router.get('/', (req,res)=>{
  res.render('users/index');
});

//--User New--

router.get('/signin', (req,res)=>{
  res.render('users/new');
});

//--User Create--
router.post('/', (req,res)=>{
  db.users.create(req.body, (err, newUser)=>{
    if(err) return console.log(err);
    res.redirect('/users');
  });
});

module.exports = router;