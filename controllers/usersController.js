const express = require('express');
const router = express.Router();
const db = require('../models');

//--User Index--

router.get('/', (req,res)=>{
  res.render('users/index');
});

module.exports = router;