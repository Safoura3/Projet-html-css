
/* =========================================
   MBOA KITCHEN — CALCULATEUR DE BUDGET
========================================= */

// 1. Récupérer les éléments HTML

const budgetInput = document.getElementById("budget-total");
const personnesInput = document.getElementById("nombre-personnes");
const listeJours = document.getElementById("liste-jours");


// 2. Préparer la liste des recettes

let recettes = [];


// 3. Calculer le coût d'une recette selon le nombre de personnes

function calculerCoutRecette(recette, nombrePersonnes) {

    const coefficient = nombrePersonnes / recette.personnes;

    let coutTotal = 0;

    recette.ingredients.forEach(ingredient => {

        const quantite = ingredient.quantite * coefficient;
        const prix = ingredient.prix_unitaire;

        let coutIngredient = 0;

        if (ingredient.unite === "g" || ingredient.unite === "ml") {
            coutIngredient = (quantite / 1000) * prix;
        } else {
            coutIngredient = quantite * prix;
        }

        coutTotal += coutIngredient;

    });

    return coutTotal;
}


// 4. Tester le calcul du coût du Ndolé

function testerCalcul() {

    const ndole = recettes.find(recette => recette.nom === "Ndolé");

    if (ndole) {

        const cout = calculerCoutRecette(ndole, 4);

        console.log(
            "Coût du Ndolé pour 4 personnes :",
            cout.toFixed(2),
            "€"
        );

    }

}


// 5. Charger les recettes depuis le fichier JSON

async function chargerRecettes() {

    try {

        const reponse = await fetch("../JSON/recettes.json");

        if (!reponse.ok) {
            throw new Error("Impossible de charger les recettes.");
        }

        recettes = await reponse.json();

        console.log("Recettes chargées avec succès !");
        console.log(recettes);

        testerCalcul();

    } catch (erreur) {

        console.error("Erreur de chargement :", erreur);

    }

}


// 6. Vérifier les éléments HTML et lancer le chargement

if (budgetInput && personnesInput && listeJours) {

    console.log("Le calculateur Mboa Kitchen est prêt !");

    chargerRecettes();

} else {

    console.error("Un élément du calculateur est introuvable.");

}
