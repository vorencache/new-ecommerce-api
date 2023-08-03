const Order = require('../models/Order.js');
const OrderItem = require('../models/OrderItem.js');


// Get All Orders [Admin Only]
const getOrders = (req, res) => {
     Order.find({}).populate(
          [
               {
                    path: 'orderItems',
                    populate: {
                         path: 'product',
                         select: 'name price'
                    }
               },
               {
                    path: 'orderedBy',
                    select: 'email'
               }
          ]
     )
     .then(orders => res.json(orders))
     .catch(() => res.sendStatus(500));
}


// Check-out Order [Non-Admin Authenticated Users Only]
const createOrder = async (req, res) => {
     try{
          const orderItemsIds = Promise.all(req.body.orderItems.map(async orderItem => {
               let newOrderItem = new OrderItem({
                    quantity: orderItem.quantity,
                    product: orderItem._id
               })
     
               newOrderItem = await newOrderItem.save();
     
               return newOrderItem._id;
          }))
     
          const orderItemsIdsResolved = await orderItemsIds;
     
          /* let totalAmount = await Promise.all(orderItemsIdsResolved.map(async orderItemId => {
               const orderItem = await OrderItem.findById(orderItemId).populate('product', 'price');
               const subtotal = orderItem.product.price * orderItem.quantity;
     
               return subtotal;
          }))
     
          totalAmount = totalAmount.reduce((a , b) => a + b, 0)
          
          console.log(totalAmount); */
     
          let newOrder = new Order({
               orderItems: orderItemsIdsResolved,
               totalAmount: req.body.totalAmount,
               orderedBy: req.body.orderedBy,
               shipmentAddress: req.body.shipmentAddress,
               paymentMethod: req.body.paymentMethod
          })
     
          newOrder = await newOrder.save();
     
          res.json(newOrder)

     }catch(err){
          res.status(400).json(err.message)
     }
     
     
}


module.exports = {
     getOrders,
     createOrder
}