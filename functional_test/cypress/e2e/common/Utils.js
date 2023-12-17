import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

let utilsPage = require('../page_objects/Utils.js');

Given('Le navigateur est ouvert et je suis sur la page accueil non connecté', () => {
 
  cy.visit(Cypress.env('baseUrl'));

});

When('Je clique sur le boutton Login dans le menu', () => {

  utilsPage.cliqueBoutonLogin();

});

When('Je clique sur le boutton Register dans le menu', () => {

  utilsPage.cliqueBoutonRegister();

});


Then('Message erreur {string} est affiche', (titre) => {

  utilsPage.erreurMessageAffiche(titre);

});


Then('la page {string} est affiché', (titre) => {

  utilsPage.verifTitrePageAffichee(titre);

});

Then('la formulaire {string} est affiché', (titre) => {

  utilsPage.verifTitreFormulaireAffichee(titre);

});





