const mongoose = require('mongoose');
const dotenv = require("dotenv");
const express = require("express");
const app = express();
dotenv.config();

const connectDB = async () => {
      await mongoose.connect(process.env.DATABASE_URL).then(() => {
      console.log("MongoDB est connecté");

  })
  .catch(err => {
      console.log(err);
  }); ; 

    

};

const closeDB = async () => {
  await mongoose.connection.close();
};

module.exports = {connectDB,closeDB};
