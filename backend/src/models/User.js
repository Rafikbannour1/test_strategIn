const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'L\'email est requis.'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Le mot de passe est requis.'],
  },
  fullname: {
    type: String,
    required: [true, 'Le nom complet est requis.'],
    trim: true,
  },
  refreshToken: {
    type: String
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
