#language: fr

@TESTSTRATEGIN
Fonctionnalité: Fonctionnalité: [GESTION DES COMPTES][REGISTER] En tant qu'utilisateur avec mes informations valides je pourrais m'inscrire à la plateforme test strateg in

Contexte:
Etant donné Le navigateur est ouvert et je suis sur la page accueil non connecté

Scénario: [GESTION DES COMPTES] S'inscrire (informations valides)
Quand Je clique sur le boutton Register dans le menu
Et Je saisis les informations d'inscription valide: email : "rafik.bannour932147@gmail.com",fullName : "rafik bnr" ,password : "147258E" ,confirmPassword : "147258E" 
Alors la formulaire "Login" est affiché

Scénario: [GESTION DES COMPTES] S'inscrire avec email invalide
Quand Je clique sur le boutton Register dans le menu
Et Je saisis les informations d'inscription sans email valide: email : "rafik.bannour.com",fullName : "rafik bnr", password : "147258E" , confirmPassword : "147258E"
Alors Message erreur 'L\'adresse e-mail n\'est pas valide.' est affiche

Scénario: [GESTION DES COMPTES] S'inscrire avec un mot de passe non conforme
Quand Je clique sur le boutton Register dans le menu
Et Je saisis les informations d'inscription avec un mot de passe non conforme: email : "rafik.bannour119905@gmail.com", fullName : "rafik bnr", password : "weakpassword", confirmPassword : "weakpassword"
Alors Message erreur 'Le mot de passe ne respecte pas les règles de complexité.' est affiche






