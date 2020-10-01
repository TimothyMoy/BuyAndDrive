const mongoose = require('mongoose');
require('dotenv').config();
const connectionString = process.env.MONGODB_URI

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