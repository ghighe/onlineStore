const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const notFoundRoute = require('./controllers/404');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();


app.set('view engine', 'ejs'); //important is the type of engine with which we are working with
//app.set('views', 'views');

//use the body parse to get the value from the incoming requests
app.use(bodyParser.urlencoded({extended:true}));
//serve file static means that no routes are involved and they will be addressed directly to the filesystem
app.use(express.static(path.join(__dirname, 'public')));

//register the user when the server is starting...
//it will not execute at the start below method but it will execute sequelize.sync() function
app.use((req,res,next) => {
    User.findByPk(1)
    .then(user => {
        //attached current user in the request object
        req.user = user;
        next();
    })
    .catch(err => {console.log(err)});
})

app.use('/', shopRoutes);
app.use('/admin',adminRoutes);


//app.use('/products', adminRoutes);

//if the incoming request cannot find a valid path we use a catch all request
app.use(notFoundRoute.notFoundController);

//define sequelizer table relations
Product.belongsTo(User, {constraints: true, onDelete:'CASCADE'});
User.hasMany(Product);

//tell sequelize to syncronize every model we have in the application
sequelize.sync()
    .then(result => {
        return User.findByPk(1);
        //console.log(result);

    })
    .then(user => {
        if(!user) {
            User.create({name:'Alex', email:'test@yahoo.com'});
        }
        return user;
    })
    .then(user => {
        // console.log(user);
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });

console.log("I have added something to development brench");
