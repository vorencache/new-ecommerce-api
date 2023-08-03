const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
     name: {
          type: String,
          required: [true, "Product name is required"]
     },
     description: {
          type: String,
          required: [true, "Product description is required"]
     },
     price: {
          type: Number,
          required: [true, "Product price is required"]
     },
     isActive: {
          type: Boolean,
          default: true
     },
     image: {
          type: String,
          default: ''
     },
     category: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
          default: '6486029cfc9ab15f65c87bb8'
     },
     isFeatured: {
          type: Boolean,
          default: false
     },
     dateCreated: {
          type: Date,
          default: Date.now
     }
});

module.exports = mongoose.model("Product", productSchema);