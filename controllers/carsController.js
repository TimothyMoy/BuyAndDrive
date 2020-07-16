const express = require('express');
const router = express.Router();
const db = require('../models');
const { route } = require('./usersController');

// Current Path ='/cars'

//--Cars Index--
router.get('/', (req,res)=>{
  db.cars.find({},(err, allCars)=>{
    res.render('cars/index',{
      cars: allCars,
    })
  })
})

//--Cars New--
router.get('/new',(req,res)=>{
  res.render('cars/new');
});

//--Cars Show--
router.get('/:id', (req,res)=>{
  db.cars.findById(req.params.id)
  .populate({path: 'cars'})
  .exec((err, foundCar)=>{
    res.render('cars/show',{
      cars: foundCar,
    });
  });
});


//--Car Create--
router.post('/', (req,res)=>{
  db.cars.create(req.body, (err, newCar) => {
    if (err) return console.log(err);
    res.redirect('cars/');
  });
});

//--Car Edit--
router.get('/:id/edit', (req, res)=>{
  db.cars.findById(req.params.id, (err,foundCar)=> {
    res.render('cars/edit',{
      cars: foundCar,
    });
  });
});

//--Car Update--
router.put('/:id', (req,res)=>{
  db.cars.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err,updatedCar)=>{
      res.redirect('/cars');
    }
  );
});

//--Car Delete--
router.delete('/:id', (req,res)=>{
  db.cars.findByIdAndDelete(req.params.id, (err, deletedCar)=>{
    db.cars.deleteMany({
      _id:{
        $in:deletedCar
      }
    }, (err,data)=>{
      res.redirect('/cars');
    })
  });
});


module.exports = router;