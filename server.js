const express = require('express')
const app = express();

const PORT = process.env.PORT || 4000;

app.use(express.static(__dirname + '/public'));

//--View Engine Configuration--
app.set('view engine', 'ejs');

app.use(express.static(`${__dirname}/public`));

//--Routes--
app.get('/', (req,res)=>{
  res.render('index');
});

//--Server Listener--
app.listen(PORT,()=> console.log(`This server is running on port ${PORT}`));