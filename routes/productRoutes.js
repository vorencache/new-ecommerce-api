const router = require('express').Router();
const productController = require('../controllers/productController.js');
const auth = require('../auth.js');
const {
     getProducts,
     getActiveProducts,
     getProduct,
     addProduct,
     updateProduct,
     archiveProduct,
     activateProduct,
     countAllProducts,
     countActiveProducts

} = productController;

const {
     userAuth,
     adminAuth

} = auth;

// Get All Products
router.get('/', userAuth, adminAuth, getProducts);

// Get All Active Products
router.get('/active', getActiveProducts);

// Get Single Product
router.get('/:id', getProduct);

// Add Product [Admin Users Only]
router.post('/', userAuth, adminAuth, addProduct);

// Update Product [Admin Users Only]
router.put('/:id', userAuth, adminAuth, updateProduct);

// Archive Product (isActive -> false) [Admin Users Only]
router.patch('/:id/archive', userAuth, adminAuth, archiveProduct);

// Activate Product (isActive -> true) [Admin Users Only]
router.patch('/:id/activate', userAuth, adminAuth, activateProduct);

// Count All Products [Admin Users Only]
router.get('/get/count', userAuth, adminAuth, countAllProducts);

// Count All Active Products [Admin Users Only]
router.get('/get/count/active', userAuth, adminAuth, countActiveProducts);

module.exports = router;