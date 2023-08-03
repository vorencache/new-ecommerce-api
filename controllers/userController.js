const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



// Get Logged User's Details  thru Token
const getUserDetails = (req, res) => {
     User.findById(req.user._id)
     .then(user => res.json(user))
     .catch(() => res.sendStatus(403));
}

// Register User
const registerUser = (req, res) => {

     User.findOne({email: req.body.email})
     .then(user => {
          if(user)
          return res.status(409).json("Email already exists");

          if(req.body.password.length < 8)
          return res.status(409).json("Password must contain atleast a minimum of 8 characters");

          user = new User({
               firstName: req.body.firstName,
               lastName: req.body.lastName,
               email: req.body.email,
               password: bcrypt.hashSync(req.body.password, 10),
               mobileNo: req.body.mobileNo
          })
     
          user.save()
          .then(newUser => res.json(newUser))
          .catch(err => res.status(400).json(err.message));

     })
     .catch(() => res.sendStatus(500));

     
}

// Login User
const loginUser = (req, res) => {
     User.findOne({email: req.body.email})
     .then(user => {
          if(!user)
          return res.status(400).json("Incorrect Email or Password")

          bcrypt.compare(req.body.password, user.password)
          .then(isPasswordCorrect => {
               if(!isPasswordCorrect)
               return res.status(400).json("Incorrect Email or Password");

               const dataPayload = {
                    _id: user._id,
                    email: user.email,
                    isAdmin: user.isAdmin
               }

               const encodedToken = jwt.sign(dataPayload, process.env.JWT_SECRET);
               res.json(encodedToken);
          })
          .catch(err => res.status(500).json(err.message));
     })
     .catch(() => res.sendStatus(500));
}

// Set user as Admin [Admin Only]
const setAdmin = (req, res) => {
     User.findOne({email: req.body.adminEmail})
     .then(auth => {

          if(!auth)
          return res.status(400).json("Invalid Admin Credentials")

          bcrypt.compare(req.body.password, auth.password)
          .then(isPasswordCorrect => {
               if(!isPasswordCorrect)
               return res.status(400).json("Invalid Admin Credentials");

	       if(!auth.isAdmin)
               return res.status(400).json("You are not an Admin!");

               User.findOne({email: req.body.email})
               .then(user => {
                    if(!user) return res.status(400).json('user not found')
                    user.isAdmin = true;
                    user.save()
                    .then(updatedUser => res.json('User has been set as Admin'))
                    .catch(() => res.sendStatus(500));
               })
               .catch(() => res.sendStatus(500));


          })
     })
     .catch(() => res.sendStatus(500));
    
}

// Count All Users [Admin Only]
const countAllUsers = (req, res) => {
     User.countDocuments()
     .then(userCount => res.json(userCount))
     .catch(() => res.sendStatus(500));
}

// Count Admin Users [Admin Only]
const countAdminUsers = (req, res) => {
     User.countDocuments({isAdmin: true})
     .then(userCount => res.json(userCount))
     .catch(() => res.sendStatus(500));
}

module.exports = {
     getUserDetails,
     registerUser,
     loginUser,
     setAdmin,
     countAllUsers,
     countAdminUsers

}