const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z]).{6,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  validateEmail,
  validatePassword,
};
