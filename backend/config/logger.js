const {createLogger,transports,format} = require('winston') ; 
const path = require('path');
const winston = require('winston'); 

const registerLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: path.join(__dirname, '../logs/register.log'),
      maxsize: 1000000,
      maxFiles: 5
    })
  ]
});

const loginLogger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.json()
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({
        filename: path.join(__dirname, '../logs/login.log'),
        maxsize: 1000000,
        maxFiles: 5
      })
    ]
  });

module.exports = {registerLogger,loginLogger} ; 

  