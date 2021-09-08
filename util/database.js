//database connection with sequelize
const Sequelize = require('sequelize');

const sequelize = new Sequelize('onlineshop', 'root', 'asd123', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;




//database connecting with no sequelize

// const mysql = require('mysql2');

// const pool = mysql.createPool({
//     host: 'localhost',
//     user:'root',
//     database:'onlineshop',
//     password:'asd123'
// });

// module.exports = pool.promise();