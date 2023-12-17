# Automatisation BackOffice DIGISAP

Outil de test d'automatisation des tests de non regresion


# Présentation de l'outil 
## __cypress__

Cypress est un outil de test front utlisé pour automatiser des tests front. c'est un équivalant de selenium.


# Techno utilisées

javascript, noodjs, CI/CD, html/css, json, Cucumber, Gherkin


## Navigateur utilisé
- firefox
- chrome
- edge

A noté : pour tester avec les différents navigateurs, vous devez avoir les navigateurs sur votre machine.


## Elément à avoir sur son poste de travail
- cucumber-html-reporter
- cypress
- cypress-cucumber-preprocessor
- cypress-downloadfile
- cypress-file-upload
- cypress-junit-reporter
- cypress-mochawesome-reporter
- cypress-xpath
- mocha
- mocha-junit-reporter
- mochawesome
- mochawesome-merge
- mochawesome-report-generator
- multiple-cucumber-html-reporter
- cypress-multi-reporters
- cypress-real-events
- cypress-tags
  

## Comment installer ces élément
Dans un terminal tapez la commande suivante

* sous linux 

> sudo npm install

Cette commande va lire le fichier package.json et lancer l'installation de tout les dépendances

# Détails des différents répertoire
cypress/cucumber-json: résultat de test au format json (nomDeLaFeature.json)

cypress/screenshots: photo pris encas d'echec. NomDuScénario.png

cypress/videos: video pris après chaque fin d'execution d'une feature (NomDeLaFeature.mp4)

cypress/e2e/page_objects: contient les différents éléments quoi doits trouvé le script sur une page web

cypress/e2e/UnePage: contient l'appele de fonction associé a une étape de votre gherkin

uneFreature.feature: il s'agit d'un ficher gherkin les régles de syntax  sont disponibes à cette adress: https://cucumber.io/docs/gherkin/


# Commande à connaitre
## lancez cypress en mode graphique
> npx cypress open


## Lancez cypress en mod graphique sur un env spécifique (graphique)
> npx cypress open --config baseUrl="UneUrl"


## Lancez un test spécifique en commande 
> npx cypress run --spec "cypress/integration/uneFeature.feature


## Lancez tout les tests en mode commande
> npx cypress run


## Lancez tout les tests sur un env spécifique (commande)
> npx cypress run --config baseUrl="UneUrl"


## Généré un rapport complet
node reports 


# Présentation des différents rapports 
Cypress va généré différents rappot photo, video,et json


### ___Rapport photo___
Il ce situe dans cypress/screenshots/. durant un test, si cypress tombe en erreur, celui-ci prendra une capture d'écran


### ___Rapport vidéo___
Il ce situe dans cypress/videos/. ces vidéos sont au format mp4 et sera généré à la fin du test. chaque videos sera nommé avec le .feature utiliser pendant le test. chaque vidéos est compressé 32 fois (besoin d'un bon CPU)


### ___Rapport json___
ils contiennent beacoups d'informations, comme le non du scénario, l'étape du scénarion , la duré d'execution ainsi que son status. utilisable dans une CI/CD avec un script pour analyser ce fichier.

Ils sont stockés dans des fichiers cucumber.json, son nommage est fait comme pour les autres de façon autonome.


# Création d'un cas de test 
1.  
crée un gherkin dans le répertoire cypress/e2e/
ce fichier doit avoir pour non la page que vous testez.

exemple : Acceuil.feature

2. 
crée un répertoire avec le nom de la page a tester dans cypress/e2e/, vous devrier avoir cypress/e2e/MaPage.

dans ce répertoire ajouté un script avec le nom de votre page à tester. vous devez avoir le résultat cypress/e2e/MaPage/MaPage.js

ce ficher est très important il va permettre au projet de faire le lien entre votre gherkin et votre interaction sur la page

3. 
dans cypress/e2e/page_objects, ajouté un fichier MaPage.js

ce fichier contient:

- vos déclaration d'éléments sur la page à trouver sur la page.
- vos fonction qui seront appelé dans cypress/e2e/MaPage/MaPage.js.
