const Product = require('../models/Product.js');



// Get All Products
const getProducts = (req, res) => {
     Product.find({})
     .then(products => res.json(products))
     .catch(() => res.sendStatus(500));
}

// Get All Active Products
const getActiveProducts = (req, res) => {
     let filter = {isActive: true};

     if(req.query.categories){
          filter = {
               isActive: true,
               category: req.query.categories.split(',')
          }
     }

     Product.find(filter)
     .then(activeProducts => res.json(activeProducts))
     .catch(() => res.sendStatus(500));
}

// Get Single Product
const getProduct = (req, res) => {
     Product.findById(req.params.id)
     .then(product => {
          if(!product)
          return res.status(400).json("Product not found");

          res.json(product);
     })
     .catch(err => res.status(400).json(err.message));
}

// Add Product [Admin Users Only]
const addProduct = (req, res) => {
     const product = new Product({
          name: req.body.name,
          description: req.body.description,
          price: req.body.price
     })

     product.save()
     .then(newProduct => res.json(newProduct))
     .catch(err => res.status(400).json(err.message));
}

// Update Product [Admin Users Only]
const updateProduct = (req, res) => {

    const product = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price
    }

    Product.findByIdAndUpdate(req.params.id, product, {new: true})
    .then(updatedProduct => {
       if(!updatedProduct)
       return res.status(400).json("Product not found");

       res.json(updatedProduct);
    })
    .catch(err => res.status(400).json(err.message));
}

// Archive Product (isActive -> false) [Admin Users Only]
const archiveProduct = (req, res) => {
     Product.findById(req.params.id)
     .then(product => {
          product.isActive = false
          product.save()
          .then(updatedProduct => res.json(updatedProduct))
          .catch(() => res.sendStatus(500));
     })
     .catch(err => res.status(400).json(err.message));
}

// Activate Product (isActive -> true) [Admin Users Only]
const activateProduct = (req, res) => {
     Product.findById(req.params.id)
     .then(product => {
          product.isActive = true
          product.save()
          .then(updatedProduct => res.json(updatedProduct))
          .catch(() => res.sendStatus(500));
     })
     .catch(err => res.status(400).json(err.message));
}

// Count All Products [Admin Users Only]
const countAllProducts = (req, res) => {
     Product.countDocuments()
     .then(productCount => {
          if(!productCount)
          return res.sendStatus(500);

          res.json(productCount);
     })
     .catch(() => res.sendStatus(500));
}

// Count Active Products [Admin Users Only]
const countActiveProducts = (req, res) => {
     Product.countDocuments({isActive: true})
     .then(result => {
          if(!result)
          return res.sendStatus(500);

          res.json(result);
     })
     .catch(() => res.sendStatus(500));
}

module.exports = {
     getProducts,
     getActiveProducts,
     getProduct,
     addProduct,
     updateProduct,
     archiveProduct,
     activateProduct,
     countAllProducts,
     countActiveProducts
}


