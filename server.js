const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 4000;


app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));

//--Controllers--
const userCtrl = require('./controllers/usersController');

const carsCtrl = require('./controllers/carsController');

//--View Engine Configuration--
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

//--Routes--
app.get('/', (req,res)=>{
  res.render('index');
});

//--User Routes--
app.use('/users', userCtrl);

app.use('/cars', carsCtrl);

//--Server Listener--
app.listen(PORT,()=> console.log(`This server is running on port ${PORT}`));