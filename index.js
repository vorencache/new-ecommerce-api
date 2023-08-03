// initialize dependencies
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const cors = require('cors');

// parsing middlewares & cors
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({origin: '*'}));

// main routes

     // users
     const userRoutes = require('./routes/userRoutes.js');
     app.use('/users', userRoutes);

     // products
     const productRoutes = require('./routes/productRoutes.js');
     app.use('/products', productRoutes);

     // orders
     const orderRoutes = require('./routes/orderRoutes.js');
     app.use('/orders', orderRoutes);

     // categories
     const categoryRoutes = require('./routes/categoryRoutes.js')
     app.use('/categories', categoryRoutes)


// CYCLIC.SH WEBHOSTINGSERVER 
     // FORMAT: Has to be Connected to Database before Listening to Port

// mongoDB connection
const connectDB = async () => {
     try{
          const conn = await mongoose.connect(process.env.MONGODB_URL, {
               useNewUrlParser: true,
               useUnifiedTopology: true
          });
          console.log(`MongoDB Connected: ${conn.connection.host}`)

     }catch(err){
          console.log(err);
          process.exit(1);
     }
}


// port listen
connectDB()
.then(() => {
     app.listen(port, () => console.log(`Now listening to requests at port ${port} ...`));
});
