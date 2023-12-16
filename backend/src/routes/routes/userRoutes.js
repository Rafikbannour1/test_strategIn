const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');
const AuthMiddleware = require('../../middleware/authMiddleware ');


router.get('/users',AuthMiddleware, userController.getAllUsers);


module.exports = router;
