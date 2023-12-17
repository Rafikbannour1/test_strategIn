import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

let registerPage = require("../page_objects/Register.js");

When(
  "Je saisis les informations d'inscription valide: email : {string},fullName : {string} ,password : {string} ,confirmPassword : {string}",
  (username, fullName, password, confirmPassword) => {
    registerPage.register(username, fullName, password, confirmPassword);
  }
);

When(
  "Je saisis les informations d'inscription sans email valide: email : {string},fullName : {string}, password : {string} , confirmPassword : {string}",
  (username, fullName,password, confirmPassword) => {
    registerPage.register(username, fullName, password, confirmPassword);
  }
);

When(
    "Je saisis les informations d'inscription avec un mot de passe non conforme: email : {string}, fullName : {string}, password : {string}, confirmPassword : {string}",
    (username, fullName,password, confirmPassword) => {
      registerPage.register(username, fullName, password, confirmPassword);
    }
  );
  
