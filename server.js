const express = require('express')
const app = express();

const PORT = process.env.PORT || 4000;

//--Controllers--
const userCtrl = require('./controllers/usersController');

//--View Engine Configuration--
app.set('view engine', 'ejs');

//--Routes--
app.get('/', (req,res)=>{
  res.render('index');
});

app.use('/users', userCtrl);

//--Server Listener--
app.listen(PORT,()=> console.log(`This server is running on port ${PORT}`));