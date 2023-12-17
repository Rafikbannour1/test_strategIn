import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';

let loginPage = require('../page_objects/Login.js');



When('Je me connecte en tant que utilisateur {string} avec mon password {string}', (username, password) => {

  loginPage.login(username, password);

});




