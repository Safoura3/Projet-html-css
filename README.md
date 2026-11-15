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

- **Accueil** (`index.html`) : carrousel de plats, catégories, plat du jour, idée de repas au hasard, aperçu des restaurants
- **Recettes** (`pages/recettes.html`) : recettes filtrables par pays et végétariennes, fiche détaillée avec calcul des quantités selon le nombre de portions
- **Restaurants** (`pages/restaurants.html`) : restaurants africains d'Île-de-France filtrables par cuisine, avec lien d'itinéraire
- **Budget** (`pages/budget.html`) : calculateur de budget repas
- **Le Marché** (`pages/marche.html`) : lexique des ingrédients, adresses et agenda
- **À propos** (`pages/a-propos.html`) : présentation du projet et de l'équipe

## Fonctionnalités JavaScript

- Menu burger sur mobile
- Thème clair / sombre mémorisé d'une page à l'autre (`localStorage`)
- Carrousel automatique avec boutons précédent / suivant
- Plat tiré au hasard
- Cartes de recettes et de restaurants générées à partir de fichiers JSON (`fetch`, `async` / `await`, gestion des erreurs)
- Filtres et calcul des portions
- Calculateur de budget

## Structure du projet
