const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
     orderItems: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'OrderItem',
          required: true
     }],
     status: {
          type: String,
          default: 'Pending'
     },
     totalAmount: {
          type: Number,
          required: true
     },
     orderedBy: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User'
     },
     shipmentAddress: {
          type: String,
          required: true
     },
     paymentMethod: {
          type: String,
          required: true
     },
     dateOrdered: {
          type: Date,
          default: Date.now
     }
});

module.exports = mongoose.model("Order", orderSchema);