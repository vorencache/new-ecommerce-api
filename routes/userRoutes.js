const router = require('express').Router();
const userController = require('../controllers/userController.js');
const auth = require('../auth.js');


const {
     getUserDetails,
     registerUser,
     loginUser,
     setAdmin,
     countAllUsers,
     countAdminUsers

} = userController;

const {
     userAuth,
     adminAuth

} = auth;

// Get Logged User's Details  thru Token
router.get('/details', userAuth, getUserDetails);

// Register User
router.post('/register', registerUser);

// Login User
router.post('/login', loginUser);

// Set user as Admin [Admin Only]
router.patch('/setadmin', userAuth, adminAuth, setAdmin);

// Count All Users [Admin Only]
router.get('/get/count', userAuth, adminAuth, countAllUsers);

// Count Admin Users [Admin Only]
router.get('/get/count/admin', userAuth, adminAuth, countAdminUsers);




module.exports = router;