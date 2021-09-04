const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user:'root',
    database:'onlineshop',
    password:'asd123'
});

module.exports = pool.promise();