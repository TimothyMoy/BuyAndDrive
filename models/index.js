const mongoose = require('mongoose');
require('dotenv').config();
const connectionString = ('mongodb://localhost:27017/buyanddrive');

mongoose.connect(connectionString,{
  useNewUrlParser: true,
  useCreateIndex:true,
  useUnifiedTopology:true,
  useFindAndModify:false,
})

  .then(()=> console.log('MongoDB connected succesfully'))
  .catch((err)=> console.log(`MongoDB connection error:${err}`));

module.exports={
  User: require('./users'),
  cars: require('./cars'),
};

const PORT = process.env.PORT || 4000;
.
.
.
app.listen(PORT, () => console.log(`API started on port ${PORT}`));
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/YourDBName';