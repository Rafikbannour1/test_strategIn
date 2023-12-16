const validator = require('validator');

const validateEmail = (email) => {
  return validator.isEmail(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  return passwordRegex.test(password);
};

module.exports = {
  validateEmail,
  validatePassword,
};
