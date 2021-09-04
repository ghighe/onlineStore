const express = require('express');

const adminController = require('../controllers/admin');
const productRouter = express.Router();

// /admin/add-product => GET
productRouter.get('/add-product', adminController.getAddProduct);
// /admin/products => GET
productRouter.get('/products', adminController.getAdminProducts);
// /admin/add-product => POST
productRouter.post('/add-product', adminController.postProduct);

productRouter.get('/edit-product/:productId', adminController.getEditProduct);

productRouter.post('/edit-product', adminController.postEditProduct);

productRouter.post('/delete-product', adminController.deleteProduct);



// module.exports = {
//     routes: router,
//     products:products
// };

module.exports = productRouter;