const express = require('express');
const session = require('express-session');
const methodOverride = require('method-override');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 4000;



app.use(express.static(`${__dirname}/public`));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));





//--Controllers--
const userCtrl = require('./controllers/usersController');
const carsCtrl = require('./controllers/carsController');
const authCtrl = require('./controllers/authController');


//--View Engine Configuration--
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

//--Express Session--
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 
    // expires in 24hrs.
  }
}));

app.use((req,res,next)=>{
  if (req.url !== '/register' && req.url !== '/login' && req.url !== '/' && !req.session.currentUser)
  return res.redirect('/login');
  next();
});

//--Routes--
app.get('/', (req,res)=>{
  res.render('index');
});

//--User Routes--
app.use('/', authCtrl);

app.use('/users', userCtrl);

app.use('/cars', carsCtrl);



//--Server Listener--
app.listen(PORT,()=> console.log(`This server is running on port ${PORT}`));