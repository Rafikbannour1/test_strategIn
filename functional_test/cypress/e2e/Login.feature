#language: fr

@TESTSTRATEGIN
Fonctionnalité: [GESTION DES COMPTES][LOGIN] En tant qu'utilisateur avec mes identifiants valides je pourrais m'authentifier à la plateforme test strateg in

Contexte:
Etant donné Le navigateur est ouvert et je suis sur la page accueil non connecté

Scénario: [GESTION DES COMPTES] Se connecter (email existant, mot de passe inexistant)
Quand Je clique sur le boutton Login dans le menu 
Et Je me connecte en tant que utilisateur "rafik.bannour99@gmail.com" avec mon password "TestPasswordNotValide"
Alors Message erreur "L'adresse e-mail ou le mot de passe est incorrect" est affiche

Scénario: [GESTION DES COMPTES] Se connecter (email inexistant, mot de passe existant)
Quand Je clique sur le boutton Login dans le menu
Quand Je me connecte en tant que utilisateur "rafik.bannour96@gmail.com" avec mon password "123456E"
Alors Message erreur "L'adresse e-mail ou le mot de passe est incorrect." est affiche


Scénario: [GESTION DES COMPTES] Se connecter (Identifiants valides)
Quand Je clique sur le boutton Login dans le menu
Et Je me connecte en tant que utilisateur "rafik.bannour99@gmail.com" avec mon password "147258A"
Alors la page "Welcome" est affiché


