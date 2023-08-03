const jwt = require('jsonwebtoken');

const userAuth = (req, res, next) => {
     const authHeader = req.headers.authorization;
     if(!authHeader)
     return res.status(403).json("Access Denied");

     const token = authHeader.slice(7); // Remove 'Bearer ' from string
     try{
          const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
          
          req.user = decodedToken;

          next();

     }catch{
          res.sendStatus(403);
     }
     

}

const adminAuth = (req, res, next) => {
     if(!req.user.isAdmin)
     return res.status(403).json("Must be an Admin to have access")

     next();
}

const nonAdminAuth = (req, res, next) => {
     if(req.user.isAdmin)
     return res.status(403).json("Can't be accessed by Admin users")

     next();
}

module.exports = {
     userAuth,
     adminAuth,
     nonAdminAuth
}