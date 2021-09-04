const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const notFoundRoute = require('./controllers/404');
const db = require('./util/database');

const app = express();


app.set('view engine', 'ejs'); //important is the type of engine with which we are working with
//app.set('views', 'views');

//use the body parse to get the value from the incoming requests
app.use(bodyParser.urlencoded({extended:true}));
//serve file static means that no routes are involved and they will be addressed directly to the filesystem
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', shopRoutes);
app.use('/admin',adminRoutes);


//app.use('/products', adminRoutes);

//if the incoming request cannot find a valid path we use a catch all request
app.use(notFoundRoute.notFoundController);




app.listen(5000);