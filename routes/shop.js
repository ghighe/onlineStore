
const express = require('express');
const shopRouter = express.Router();
const shopController = require('../controllers/shop');

shopRouter.get('/', shopController.getIndex);

shopRouter.get('/products', shopController.getProducts);

shopRouter.get('/products/:productId', shopController.getProduct);

shopRouter.get('/cart', shopController.getCart);

shopRouter.post('/cart', shopController.postCart);

shopRouter.get('/checkout', shopController.getCheckout);

shopRouter.get('/orders', shopController.getOrders);

shopRouter.post('/cart-delete-item', shopController.postCartDeleteProduct);

module.exports = shopRouter;