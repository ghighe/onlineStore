const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull: false,
        primaryKey:true
    },
    title: Sequelize.STRING,
    price: {
        type:Sequelize.DOUBLE,
        allowNull:false
    },
    imageUrl: {
        type:Sequelize.STRING,
        allowNull:false
    },
    description: {
        type:Sequelize.STRING,
        allowNull:false
    },
});

module.exports = Product;













// const db = require('../util/database');
// const Cart = require('../models/cart');


// module.exports = class Product {
//     constructor(id, title, imgPath, description, price) {
//         this.id = id;
//         this.title = title;
//         this.imgPath = imgPath;
//         this.description = description;
//         this.price = price;
//     }

//     save() {
//         return  db.execute('INSERT INTO products (title,price,description,imgPath) VALUES (?,?,?,?)',
//       [this.title, this.price, this.description, this.imgPath]);
//     }

//     static deleteById(id) {

//     }

//     static fetchAll() {
//        return db.execute('SELECT * FROM products');
//     };

//     static findById(id) {
//        return db.execute('SELECT * from products WHERE products.id = ?', [id]);
//     }

// }