const express = require('express');
const router = express.Router();
const db = require('../models');

//--User Index--

router.get('/', (req,res)=>{
  res.render('users/index');
});

//--User New--

router.get('/new', (req,res)=>{
  res.render('users/new');
});

module.exports = router;