const router = require('express').Router();
const orderController = require('../controllers/orderController.js');
const auth = require('../auth.js');

const {
     getOrders,
     createOrder

} = orderController

const {
     userAuth,
     adminAuth,
     nonAdminAuth

} = auth

// Get All Orders [Admin Users Only]
router.get('/', userAuth, adminAuth, getOrders);

// Check-out Order [Non Admin Auth Users]
router.post('/', userAuth, nonAdminAuth, createOrder);







module.exports = router;