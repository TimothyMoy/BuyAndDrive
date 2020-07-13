const express = require('express')
const app = express();

const PORT = process.env.PORT || 4000;


app.use(express.static(__dirname + '/public'));

//--Controllers--
const userCtrl = require('./controllers/usersController');


//--View Engine Configuration--
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

//--Routes--
app.get('/', (req,res)=>{
  res.render('index');
});

app.use('/users', userCtrl);

//--Server Listener--
app.listen(PORT,()=> console.log(`This server is running on port ${PORT}`));