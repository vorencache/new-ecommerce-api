const Category = require('../models/Category.js')


const getCategories = (req, res) => {
     Category.find({})
     .then(result => res.json(result))
     .catch(err => res.status(500).json(err.message));
}

const addCategory = (req, res) => {
     const category = new Category({
          name: req.body.name,
          icon: req.body.icon,
          color: req.body.color
     })

     category.save()
     .then(newCategory => res.status(201).json(newCategory))
     .catch(err => res.status(400).json(err.message));
}

const deleteCategory = (req, res) => {
     Category.findOne({_id: req.params.id})
     .then(category => {
          if(!category)
          return res.status(400).json('Category not found')

          category.deleteOne();
          
          res.json("Successfully deleted category");
     })
     .catch((err) => res.status(400).json(err.message));
}

const getCategory = (req, res) => {
     Category.findById(req.params.id)
     .then(category => {
          if(!category)
          return res.status(400).json("Category not found");

          res.json(category);
     })
     .catch(err => res.status(400).json(err.message));
}

const updateCategory = (req, res) => {

     const category = {
          name: req.body.name,
          icon: req.body.icon,
          color: req.body.color
     }

     Category.findByIdAndUpdate(req.params.id, category, {new: true})
     .then(updatedCategory => {
          if(!updatedCategory)
          return res.status(400).json("Category not found");

          res.json(updatedCategory);
     })
     .catch(err => res.status(400).json(err.message));
}



module.exports = {
     getCategories,
     addCategory,
     deleteCategory,
     getCategory,
     updateCategory
}