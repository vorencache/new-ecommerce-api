const router = require('express').Router();
const categoryController = require('../controllers/categoryController.js');
const {
     getCategories,
     addCategory,
     deleteCategory,
     getCategory,
     updateCategory

} = categoryController;

const {
     userAuth,
     adminAuth
     
} = require('../auth.js')

router.get('/', getCategories);

router.post('/', userAuth, adminAuth, addCategory);

router.get('/:id', userAuth, adminAuth, getCategory);

router.put('/:id', userAuth, adminAuth, updateCategory);

router.delete('/:id', userAuth, adminAuth, deleteCategory);


module.exports = router;