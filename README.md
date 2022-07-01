# mini-API
API pour site de vente de figurines 3d
une fois inscrit sur la plate-forme, l'utilisateur crée son avatar personnaliser et commande sa figurine MINI
en 3d autoalimentée 

# VERSIONS 1 fonctionnalite user et tests unitaires ok 
mini-API: v1.0


# VERSIONS 1.1 fonctionnalite order, products, chart & discount tests unitaires ok 
mini-API: v1.1

# Commencer
Les instructions suivantes permettent d'obtenir une copie du projet et de l'exécuter sur une machine locale 

# Prérequis
Avoir d'installer :
- un éditeur de code (ex visual studio code)
- MongoDB
- Node JS 

# Installation et environnement 

1. Creer un dossier en locale

2. Cloner le projet en cliquant sur :
   - le bouton code en vert
   - copier le lien du projet 
   - et dans le terminale saisir :  git clone + lien du projet

3. Ouvrir le projet via l'éditeur de code et saisir npm install dans le terminal pour charger toutes les dépendances 

4. Aller dans le dossier Config du projet et crée un fichier .env dans lequele on va retrouver : 
   - le PORT sur lequele va tourner l'api 
   - le client_URL (url du frontend ou *)
   - myDbUrl le lien permettant la connexion a mongo atlas 
   - le TOKEN_SECRET 
   - EMAIL adresse email (gmail) depuis laquelle partiront les notifications et autres emails 
   - PASSWORD le mot de passe xoauth2 gmail

5. Ouvrir le terminale de l'éditeur de code et saisir : 
   - npm start ou npm run dev pour exécuter le programme 

6. pour faire tourner l'api sur docker aller sur : https://hub.docker.com/r/ksteve2021/mini-api et faire un pull des images du repository

# Tests unitaires 

Pour exécuter les tests unitaires, aller dans le terminale de l'éditeur et taper npm run test