const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();


const accessTokenSecretKey  = process.env.JWT_SECRET_KEY_ACCESS ;  
const refreshTokenSecruteKey = process.env.JWT_SECRET_KEY_REFRESH ; 

const  generateAccessToken = (user) => {
  return jwt.sign(user, accessTokenSecretKey, { expiresIn: '1h' });
}

const  generateRefreshToken = (user) => {
    return jwt.sign(user, refreshTokenSecruteKey, { expiresIn: '1y' });
  }

module.exports = {
  generateAccessToken,
  generateRefreshToken
};