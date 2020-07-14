const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {type: String},
  email: String,
  id: Number,
  cars: [String],
}, {timestamps:true})

const user = mongoose.model('users', userSchema)

module.exports = user;