const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true,
        editable:false
    });
}

exports.getAdminProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('admin/products', {
            layout: false,
            prods: products,
            pageTitle: 'AdminProducts',
            path: '/admin/products'
        });
    });
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if(!editMode) {
       return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId, prod => {
        if(!prod) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            activeAddProduct: true,
            editable: editMode,
            product:prod
        });
    })

}

exports.postEditProduct = (req,res,next) => {
    //extract the id of the product first
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(prodId,updatedTitle,updatedImageUrl,updatedDesc,updatedPrice);
    updatedProduct.save();
    res.redirect('/admin/products');
};

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const imagePath = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;
    Product.create({
            title: title,
            price: price,
            imageUrl: imagePath,
            description: description
        })
        .then(result => {
            //console.log(result);
            console.log("Product created!");
        })
        .catch(err => {
            console.log(err);
        })
    }

exports.deleteProduct = (req,res,next) => {
    const id = req.body.prodId;
    Product.deleteById(id);
    res.redirect('/admin/products');
}
