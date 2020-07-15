const express = require('express');
const router = express.Router();
const db = require('../models');

router.get('/login', (req,res)=>{
  res.render('auth/login');
});

module.exports = router;