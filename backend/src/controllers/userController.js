const dotenv = require("dotenv");

dotenv.config();


const User = require('../models/User');

const getAllUsers = async (req, res) => {
    try {
      const users = await User.find().select('-__v');; 
      res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };




module.exports = { getAllUsers };
