# Mboa Kitchen – Saveurs d'Afrique

Site vitrine dédié à la cuisine d'Afrique centrale et de l'Ouest : des recettes expliquées pas à pas, une sélection de restaurants africains en Île-de-France, un comparateur de budget et un lexique des ingrédients.

Projet de groupe du module **TI504N – Programmation Web** (Efrei Paris, 2026-2027), réalisé en HTML, CSS et JavaScript, sans framework ni bibliothèque.

## Équipe

| Membre | Pages |
|---|---|
| Safoura | Accueil, Restaurants, socle commun (header, footer, `style.css`) |
| Keren | Recettes, Le Marché |
| Kadidja | Budget, À propos |

## Pages

- **Accueil** (`index.html`) – Safoura : bannière avec carrousel de plats, points forts, catégories, plat du jour, idée de repas au hasard, aperçu des restaurants
- **Restaurants** (`pages/restaurants.html`) – Safoura : restaurants africains d'Île-de-France chargés depuis un fichier JSON, filtres par cuisine, compteur et lien d'itinéraire Google Maps
- **Recettes** (`pages/recettes.html`) – Keren : recettes chargées depuis un fichier JSON, filtres par pays et végétarien, fiche détaillée (ingrédients, étapes) avec calcul des quantités selon le nombre de portions, formulaire « Proposer votre recette »
- **Le Marché** (`pages/marche.html`) – Keren : lexique des ingrédients sous forme de tableau avec recherche en direct, adresses d'épiceries en Île-de-France, agenda des prochains rendez-vous
- **Budget** (`pages/budget.html`) – Kadidja : calculateur de budget repas (budget total, nombre de personnes, jauge du budget utilisé, total de la semaine et budget restant, planning par jour)
- **À propos** (`pages/a-propos.html`) – Kadidja : histoire du projet, présentation de l'équipe et formulaire de contact

## Maquette

La maquette du site (wireframe de chaque page, palette de couleurs, typographies, thèmes clair et sombre) a été réalisée avant le développement et est fournie avec le livrable sur Moodle.

## Fonctionnalités JavaScript

- Menu burger sur mobile
- Thème clair / sombre mémorisé d'une page à l'autre (`localStorage`)
- Carrousel automatique avec boutons précédent / suivant
- Plat tiré au hasard
- Cartes de recettes et de restaurants générées à partir de fichiers JSON (`fetch`, `async` / `await`, gestion des erreurs)
- Filtres et calcul des portions
- Recherche en direct dans le lexique du Marché
- Calculateur de budget
- Validation des formulaires (proposition de recette, contact)

## Structure du projet
## Partie de Keren : Recettes et Le Marché

### Pages

- **`pages/recettes.html`** : la page Recettes affiche les plats sous forme de cartes, filtrables par pays et par option végétarienne. En cliquant sur une carte, on ouvre la fiche du plat (image, description, temps, piment, étapes) avec un tableau d'ingrédients dont les quantités s'adaptent au nombre de portions. Un formulaire permet aussi de proposer sa propre recette.
- **`pages/marche.html`** : la page Le Marché présente les produits de la cuisine africaine en trois sections : un lexique des ingrédients avec recherche en direct, des adresses où acheter en Île-de-France, et un agenda de trois rendez-vous à venir.

### Fichiers JavaScript

- **`javascript/recettes.js`** : charge `json/recettes.json` avec `fetch`, construit les cartes avec `createElement`, applique les filtres par pays et végétarien, remplit la fiche et recalcule les quantités selon les portions (règle de trois sur une base de 4 personnes).
- **`javascript/formulaire.js`** : valide le formulaire « Proposer votre recette » à l'envoi. `preventDefault()` bloque le rechargement, chaque champ est vérifié, et un message d'erreur ou de remerciement s'affiche.
- **`javascript/marche.js`** : filtre les lignes du lexique à chaque lettre tapée dans le champ de recherche, sans tenir compte des majuscules ni des accents, et affiche un message si aucun ingrédient ne correspond.

### Données et styles

- **`json/recettes.json`** : les recettes (nom, pays, temps, piment, ingrédients, étapes), séparées du HTML pour pouvoir les modifier sans toucher au code.
- **`css/recettes.css`** et **`css/marche.css`** : styles des deux pages, qui utilisent les variables de couleur de `style.css` pour s'adapter au thème sombre.

### Sources de l'agenda (Le Marché)

- Marché de Noël Africain, 28 novembre 2026 : lemarchedenoelafricain.com et calendrier des marchés de Noël de la Ville de Paris.
- Salon Made In Africa, 12 décembre 2026 : dreamteamafrica.com.
- Foire d'Afrique Paris, 6 au 8 mai 2027 : foiredafrique.fr.



### Pages

- **`pages/recettes.html`** : la page Recettes affiche les plats sous forme de cartes, filtrables par pays et par option végétarienne. En cliquant sur une carte, on ouvre la fiche du plat (image, description, temps, piment, étapes) avec un tableau d'ingrédients dont les quantités s'adaptent au nombre de portions. Un formulaire permet aussi de proposer sa propre recette.
- **`pages/marche.html`** : la page Le Marché présente les produits de la cuisine africaine en trois sections : un lexique des ingrédients avec recherche en direct, des adresses où acheter en Île-de-France, et un agenda de trois rendez-vous à venir.

### Fichiers JavaScript

- **`javascript/recettes.js`** : charge `json/recettes.json` avec `fetch`, construit les cartes avec `createElement`, applique les filtres par pays et végétarien, remplit la fiche et recalcule les quantités selon les portions (règle de trois sur une base de 4 personnes).
- **`javascript/formulaire.js`** : valide le formulaire « Proposer votre recette » à l'envoi. `preventDefault()` bloque le rechargement, chaque champ est vérifié, et un message d'erreur ou de remerciement s'affiche.
- **`javascript/marche.js`** : filtre les lignes du lexique à chaque lettre tapée dans le champ de recherche, sans tenir compte des majuscules ni des accents, et affiche un message si aucun ingrédient ne correspond.

### Données et styles

- **`json/recettes.json`** : les recettes (nom, pays, temps, piment, ingrédients, étapes), séparées du HTML pour pouvoir les modifier sans toucher au code.
- **`css/recettes.css`** et **`css/marche.css`** : styles des deux pages, qui utilisent les variables de couleur de `style.css` pour s'adapter au thème sombre.

### Sources de l'agenda (Le Marché)

- Marché de Noël Africain, 28 novembre 2026 : lemarchedenoelafricain.com et calendrier des marchés de Noël de la Ville de Paris.
- Salon Made In Africa, 12 décembre 2026 : dreamteamafrica.com.
- Foire d'Afrique Paris, 6 au 8 mai 2027 : foiredafrique.fr.

### Crédits photos (Le Marché)

| Photo | Auteur | Licence | Lien |
|---|---|---|---|
| "img/marche/epicerie-1.jpg"| altasobscura.com  | licence CC-BY-SA| https://img.atlasobscura.com/PagDBc50qx2WY-tKA-epximtdNg6JgZjGHKlLlNkThQ/rt:fit/h:400/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy8zYzI3/OTAyOTQ3MzBhNzQ1/NTNfMjAyMzEyX1Bh/cmlzX0ZyYW5jZS0y/NjU3LmpwZw.jpg|
| "img/marche/epicerie-2.jpg"|716lavie.com | licence CC-BY-SA| https://716lavie.com/wp-content/uploads/2021/09/Koyaka-kitchen-75018-paris-716lavie.jpg|
| "img/marche/epicerie-3.jpg" | maison-sore.com| licence CC-BY-SA| https://maison-sore.com/cdn/shop/files/6027x3616_cover_d33f89a104bc4fd5ac48deed61b1ae35.jpg?v=1706306364&width=832|