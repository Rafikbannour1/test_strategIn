const  jwt = require ("jsonwebtoken");
require("dotenv").config();  

 const AuthMiddleware = async (req, res, next) => {
    try {  
    
  
      if (!req.headers["authorization"])
         {throw new Error('Non autorisé') ; }
     
     
        const token = req.headers["authorization"].split(" ")[1] ;
       
      jwt.verify(token, process.env.JWT_SECRET_KEY_ACCESS, (err, payload) => {
        if (err) {
          throw new Error('Non autorisé') ; 
        }
        req.payload = payload;
        next();
      });
    } catch (error) {
      res.status(500).json({error : error.message}) ; 
    }
  };

  module.exports = AuthMiddleware ; 