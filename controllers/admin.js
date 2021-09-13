const Cart = require('../models/cart');
const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/add-product',
        activeAddProduct: true,
        editable: false
    });
}

exports.getAdminProducts = (req, res, next) => {
    Product.findAll()
        .then(
            products => {
                res.render('admin/products', {
                    layout: false,
                    prods: products,
                    pageTitle: 'AdminProducts',
                    path: '/admin/products'
                });
            }
        )
        .catch(err => {
            console.log(err)
        })
}

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
                if (!product) {
                    return res.redirect('/');
                }
                res.render('admin/edit-product', {
                    pageTitle: 'Edit Product',
                    path: '/admin/edit-product',
                    activeAddProduct: true,
                    editable: editMode,
                    product: product
                });
            }

        )
        .catch(err => {
            console.log(err)
        })
    }

exports.postEditProduct = (req, res, next) => {
    //extract the id of the product first
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedImageUrl = req.body.imageUrl;
    const updatedPrice = req.body.price;
    const updatedDesc = req.body.description;
    Product.findByPk(prodId)
    .then(product => {
        console.log("myProd ", product);
        product.title = updatedTitle;
        product.imageUrl = updatedImageUrl;
        product.price = updatedPrice;
        product.description = updatedDesc;
       return product.save();
    })
    .then(result => {
        console.log("UPDATED PRODUCT!");
        res.redirect('/admin/products');
    })
    .catch(err => console.log(err));

};

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = +req.body.price;
    const description = req.body.description;
    Product.create({
            title: title,
            price: price,
            imageUrl: imageUrl,
            description: description
        })
        .then(result => {
            console.log("Product created!");
            res.redirect('/admin/products');
        })
        .catch(err => {
            console.log(err);
        })
}

exports.deleteProduct = (req, res, next) => {
    const id = req.body.prodId;
    Product.findByPk(id)
    .then(product => {
       return product.destroy();
    })
    .then(result => {
       console.log("DELETED PRODUCT");
       res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
}