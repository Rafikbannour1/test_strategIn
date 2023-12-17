let Login = function () {

	this.emailInput = '#_username';
	this.passwordInput = '#_password';
	this.submitButton = 'button[type="submit"]';
	this.homePage = '.table-title';
	this.bouttonDeconnexion = '._logout';
	this.alertLoginError = '._login_alert_error';

	this.verifAlerteErrorEmail = async function (messageError) {

		cy.get(this.alertEmailError).should('contain.text', messageError);

	};

	this.login = async function (email, password) {

		cy.on('uncaught:exception', (err, runnable) => {

            return false

        })
		
		cy.get(this.emailInput).clear();
		cy.get(this.emailInput).type(email).should('have.value', email);
		cy.get(this.passwordInput).clear();
		cy.get(this.passwordInput).type(password).should('have.value', password);
		cy.get(this.submitButton).first().click();

	};


};
module.exports = new Login();