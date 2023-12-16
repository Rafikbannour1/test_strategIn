const express = require('express');
const router = express.Router();

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

router.use('/', authRoutes);
router.use('/',userRoutes) ; 


module.exports = router;
