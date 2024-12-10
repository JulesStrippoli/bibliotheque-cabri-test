**La bibliothèque Cabri**

## 1. Généralités

## 1.1. Versions

Les informations sur les différentes versions sont regroupées dans le fichier `CHANGELOG.md`

## 1.2. Stack technologique

- Framework frontend : [VueJS](https://vuejs.org/)
- Système de recherche : [FuseJS](https://fusejs.io/)
- Framework  CSS : [Tailwindcss](https://tailwindcss.com/)
- Pack d'icônes : [Font Awesome](https://fontawesome.com/)


## 1.4. Présentation de l'architecture

La solution est organisée par un espace de travail VueJS tel que l'arborescence présentée ci-dessous :

```
/
|--/public
|--/src
   |--/assets
   |--/collections-data
   |--/components

```

### 1.4.1. Applications

Les applications sont contenues dans le dossier `/blabla`

**bibliothèque Cabri**

description

**LTI provider**

description

# 2. Règles de développement

## 2.1. Type des issues

Il existe 5 types d'issues :

* **User story** : Demande de fonctionnalité formulée tel que : « En tant que x, je souhaite y, afin de z »
* **Documentation** : Demande de documentation
* **Conception** : Demande de conception
* **Bug** : Demande de résolution de bug
* **Technical story** : Tâche technique autre

> NB : Ticket = Issue

## 2.2. Principaux scripts

* `npm install` : installer les dépendances de la solution
* `npm start` : démarrer la solution en mode de développement

## 2.3. Procédure d'implémentation d'une issue
 
1. Créer une nouvelle branche de développement depuis la branche `master` selon la nomenclature suivante : `issue/<quelques mots décrivant l'issue>`

   > Pour se placer dans la branche `master` : `git checkout master`
   >
   > Pour créer une nouvelle branche : `git checkout -b issue/lorem-ipsum`

5. Traiter l'issue

   > Ne pas hésiter à traiter l'issue en binôme si cela semble nécessaire.

6. Ajouter les fichiers au versionnement, les commiter et pousser la branche finalisée vers le dépôt de code

   > Pour ajouter les fichiers au versionnement : `git add <nom du fichier>`
   >
   > Pour commiter les fichiers : `git commit -m "<en anglais : verbe d'action à l'infinitif + description>"`
   >
   > Pour pousser la branche : `git push origin issue/lorem-ipsum `

7. Créer une demande de fusion de la branche de développement depuis l'onglet « Pull Requests » du dépôt bitbucket

8. Faire relire son code par un autre membre de l'équipe

9.  Procéder à la fusion de la branche de développement vers la branche `master` en cliquant sur le bouton « Merge pull request » de la « Pull request » précédemment créée

10. Clôturer l'issue

    > Pour cloturer une issue, il faut cliquer sur son titre pour l'ouvrir, puis cliquer sur le bouton « Close issue »

## 2.3. Conventions de nommage

### 2.3.1 TypeScript

| Élément            | Casse      |
| ------------------ | ---------- |
| Classe d'objet     | PascalCase |
| Classe d'interface | PascalCase |
| Fichier            | kebab-case |
| Variable           | camelCase  |

# 3. Installation de l'environnement de développement

## 3.1. Installation des prérequis

**Installer Node.js 16.15.0**

* Pour Windows, télécharger et installer le fichier suivant : https://nodejs.org/dist/v16.15.0/node-v16.15.0-x64.msi
* Pour macOS, télécharger et installer le fichier suivant : https://nodejs.org/dist/v16.15.0/node-v16.15.0.pkg