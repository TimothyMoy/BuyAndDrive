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

//--User Show--
router.get('/:id', (req,res)=>{
  db.users.find({}, (err, allUsers)=>{
    if(err) return console.log(err);
    res.render('users/show', {
      users: allUsers,
    });
  });
});

//--User Create--
router.post('/:id', (req,res)=>{
  db.users.create(req.body, (err, newUser)=>{
    if(err) return console.log(err);
    res.render('users/show', {
      user: newUser,
    });
  });
});

module.exports = router;