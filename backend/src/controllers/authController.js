const bcrypt = require('bcrypt');

const { validateEmail, validatePassword } = require('../helpers/validationHelpers');

const User = require('../models/User');
const { generateAccessToken, generateRefreshToken } = require('../helpers/tokenHelpers');
const { registerLogger, loginLogger } = require('../../config/logger');


const registerUser = async (req, res) => {
  try {
    const { email, password, confirmPassword, fullname } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({ message: 'L\'adresse e-mail n\'est pas valide.' });
    }

    if (!validatePassword(password)) {
      return res.status(400).json({ message: 'Le mot de passe ne respecte pas les règles de complexité.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Les mots de passe ne correspondent pas.' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'L\'utilisateur avec cet e-mail existe déjà.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Utiliser une requête paramétrée pour empêcher l'injection 
    const newUser = new User({ email, password: hashedPassword, fullname });
    await newUser.save();

    res.status(201).json({ message: 'Inscription réussie !' });
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error.message);
    registerLogger.log("error", error.message);
    res.status(500).json({ message: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
       
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'L\'adresse e-mail ou le mot de passe est incorrect.' });
    }
    const isValidPassword= await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'L\'adresse e-mail ou le mot de passe est incorrect.' });
    }

    const token = generateAccessToken({ userId: user._id, email: user.email }) ; 
    const refreshToken  = generateRefreshToken({ userId: user._id, email: user.email }) ; 
    user.refreshToken = refreshToken;
    await user.save();

    res.status(200).json({ token, refreshToken  });  
  } catch (error) {
    console.error('Error during login:', error.message);
    loginLogger.log("error", error.message);
    res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
  }
};

const refreshAccessToken = async (req,res) => {
 try {
  const {refreshToken} = req.body; 
  const user = await User.findOne({ refreshToken });

  if (!user) {
    throw new Error('refresh token est invalide ');
  }

  
  const accessToken = generateAccessToken({ userId: user._id, email: user.email });
  res.status(200).json({ accessToken });
  
 } catch (error) {
  res.status(500).json({ message: error.message})
 } 
};




module.exports = { registerUser,login,refreshAccessToken };
