const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  milesDriven: Number,
  mpg: Number,
  proposedPrice: Number,
  img: 
    { data: Buffer, contentType: String },
},{timestamps:true})

const cars = mongoose.model('cars', carSchema)

module.exports = cars;