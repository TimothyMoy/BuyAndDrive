const express = require('express');
const router = express.Router();
const db = require('../models');

//--Cars Index--
router.get('/', (req,res)=>{
  res.render('cars/index');
});


module.exports = router;