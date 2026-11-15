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
