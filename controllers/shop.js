const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/product-list', {
            layout: false,
            prods: products,
            pageTitle: 'All Products',
            path: '/products'
        });
    })
    .catch(err => console.log(err));
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findByPk(prodId)
        .then(product => {
            //  console.log(product);
            res.render('shop/product-detail', {
                pageTitle: product.title,
                product: product,
                path: '/products'
            })
        })
        .catch(err => {
            console.log(err)
        });
}

exports.getIndex = (req, res, next) => {
    Product.findAll()
    .then(products => {
        res.render('shop/index', {
            layout: false,
            prods: products,
            pageTitle: 'Shop',
            path: '/'
        });
    })
    .catch(err => {console.log(err)});
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {
        Product.fetchAll(products => {
            const CartProducts = [];
            //iterating over the list of products
            for (product of products) {
                //if we find a prod in the cart which have an id === with the id of a prod in the products list we added it to a new array
                cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    CartProducts.push({
                        productData: product,
                        qty: cartProductData.qty
                    });
                }
            }
            res.render('shop/cart', {
                layout: false,
                path: '/cart',
                pageTitle: 'Your Cart',
                products: CartProducts
            })
        })
    }
)}


exports.postCart = (req, res, next) => {
    const prodId = req.body.productId; //now the productId is part of the body request
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    })
    res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        layout: false,
        path: '/orders',
        pageTitle: 'Your orders'
    })
}

exports.getCheckout = (req, res, next) => {
    res.render('/shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    })
}

exports.postCartDeleteProduct = (req,res,next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    })

}