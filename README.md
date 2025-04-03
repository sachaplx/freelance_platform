# Projet freelance

## Structure du projet

html : Contient le code html qui charge le CSS & Javascript
css : Contient le code CSS qui formatte l'HTML afin de l'améliorer visuellement
js : Contient le code Javascript qui gère les interactions utilisateurs
data : Contient le fichier JSON qui simule une API

## Fonctionnement de l'application

Le projet contient une seule et unique page qui permet de visualiser, postuler et consulter ses candidatures via des cartes interactives.

## Pré-requis

L'application fonctionne via Docker grâce aux fichiers Dockerfile et docker-compose.yml et s'appuie sur JSON Server pour simuler une API (JSON Server requiert NODEJs).

## JSON Server

Afin de garantir le fonctionnement de l'API il faut lancer JSON Server pour se faire il faut utiliser l'invite de commande et naviguer à la racine du projet (Veillez à avoir installer node.js préalablement). Une fois dans le dossier racine il faut simplement lancer cette commande 
```bash
npm start
``` 
Le fichier package.json s'occupe de lancer les dépendances au démarrage. On peut aussi lancer JSON Server manuellement grâce à la commande
```bash
json-server --watch data/missions.json --port 2777
```

## Docker

Afin de lancer le serveur qui accueilera notre application j'utilise Docker pour lancer le serveur il suffit simplement d'ouvrir un invité de commandes et naviguer jusqu'au dossier racine du projet et ensuite éxecuter les commandes
```bash 
docker-compose build
docker-compose up
```
Pour arrêter le serveur, on utilise
```bash
docker-compose down
```
Tout les paramètres sont gérés grâce aux fichiers préalablement configurées