let Register = function () {
  
  this.emailInput = "#_username_register";
  this.passwordInput = "#_password_register";
  this.confirmPasswordInput="#_confirmPassword_register"
  this.fullNameInput = "#_fullName"
  this.submitButton = 'button[type="submit"]';
  this.bouttonDeconnexion = "._logout";

  this.register = async function (username, fullName, password, confirmPassword) {
   
    cy.on("uncaught:exception", (err, runnable) => {
      return false;
    });
    
    cy.get(this.emailInput).type(username);
    cy.get(this.fullNameInput).type(fullName);
    cy.get(this.passwordInput).type(password);
    cy.get(this.confirmPasswordInput).type(confirmPassword);
    cy.get(this.submitButton).click();
  };
};
module.exports = new Register();
