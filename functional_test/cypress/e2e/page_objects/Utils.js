let Utils = function () {

	this.boutonLogin = '._login';
	this.titrePage = '._pageTitle' ;
	this.erreurMessage = '._alert_error' ; 
	this.bouttonRegister = '._register' ; 
	this.titreFormulaire = '._loginHeader' ; 
	
	this.verifTitrePageAffichee = async function (titre) {

		cy.get(this.titrePage).should('contain.text', titre);

	};

	this.verifTitreFormulaireAffichee = async function (titre) {

		cy.get(this.titreFormulaire).should('contain.text', titre);

	};

	


	this.erreurMessageAffiche = async function (message) {

		cy.get(this.erreurMessage).should('contain.text', message);

	}; 


	this.cliqueBoutonLogin= async function () {

		cy.get(this.boutonLogin).click();

	}; 

	
	this.cliqueBoutonRegister= async function () {

		cy.get(this.bouttonRegister).click();

	}; 



};
module.exports = new Utils();