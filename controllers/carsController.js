const express = require('express');
const router = express.Router();
const db = require('../models');

// Current Path ='/cars'

//--Cars Index--
router.get('/', (req,res)=>{
  res.render('cars/index');
});

//--show--
router.get('/:id', (req,res)=>{
  db.cars.find({}, (err, allCars) => {
    if (err) return console.log(err);
    res.render('cars/show',{
      car: allCars,
    });   
  })
});



//--Car Create--
router.post('/show', (req,res)=>{
  db.cars.create(req.body, (err, newCar) => {
    if (err) return console.log(err);
    res.render('cars/show',{
      cars: newCar,
    });
  });
});


module.exports = router;