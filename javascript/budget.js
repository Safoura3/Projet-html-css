
/* =========================================
   MBOA KITCHEN — MOTEUR DU CALCULATEUR
   Recettes + Restaurants + Budget hebdomadaire
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const budgetInput = document.getElementById("budget-total");
    const personnesInput = document.getElementById("nombre-personnes");
    const listeJours = document.getElementById("liste-jours");

    const affichageBudget = document.getElementById("affichage-budget");
    const totalSemaine = document.getElementById("total-semaine");
    const budgetRestant = document.getElementById("budget-restant");
    const cercleBudget = document.getElementById("cercle-budget");
    const pourcentageBudget = document.getElementById("pourcentage-budget");
    const statutBudget = document.getElementById("statut-budget");

    // NOUVEAU : gestion de l'impression
    const boutonImprimer = document.querySelector(".budget-imprimer");

    const messageBudgetImpression = document.getElementById(
        "message-budget-impression"
    );

    const jours = [
        "Lundi",
        "Mardi",
        "Mercredi",
        "Jeudi",
        "Vendredi",
        "Samedi",
        "Dimanche"
    ];

    let recettes = [];
    let restaurants = [];

    let derniereDepense = 0;

    /* -------------------------------------
       PLANNING
    ------------------------------------- */

    const planning = jours.map(() => ({
        repas: {
            midi: creerRepas(),
            soir: creerRepas()
        }
    }));

    function creerRepas() {
        return {
            actif: false,
            type: "maison",
            recette: 0,
            portions: 2,
            portionsPersonnalisees: false,
            restaurant: 0,
            plat: 0,
            prixPersonne: 0
        };
    }

    /* -------------------------------------
       OUTILS
    ------------------------------------- */

    function nombreValide(valeur, minimum = 0) {
        const nombre = Number(valeur);

        if (!Number.isFinite(nombre)) {
            return minimum;
        }

        return Math.max(minimum, nombre);
    }

    function euro(valeur) {
        return nombreValide(valeur).toLocaleString("fr-FR", {
            style: "currency",
            currency: "EUR"
        });
    }

    function echapper(texte) {
        return String(texte ?? "").replace(/[&<>"']/g, caractere => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[caractere]);
    }

    function obtenirNombrePersonnes() {
        return Math.max(
            1,
            Math.floor(nombreValide(personnesInput.value, 1))
        );
    }

    /* -------------------------------------
       CALCUL DES INGREDIENTS
    ------------------------------------- */

    function coutIngredient(ingredient, portions, personnesBase) {

        const quantite = nombreValide(ingredient.quantite);
        const prixUnitaire = nombreValide(ingredient.prix_unitaire);

        const coefficient = portions / personnesBase;
        const quantiteAchat = quantite * coefficient;

        const unite = String(ingredient.unite || "")
            .toLowerCase()
            .trim();

        if (unite === "g" || unite === "ml") {
            return (quantiteAchat / 1000) * prixUnitaire;
        }

        return quantiteAchat * prixUnitaire;
    }

    function calculerCoutRecette(recette, portions) {

        if (!recette || !Array.isArray(recette.ingredients)) {
            return 0;
        }

        const personnesBase = Math.max(
            1,
            nombreValide(recette.personnes, 4)
        );

        return recette.ingredients.reduce((total, ingredient) => {
            return total + coutIngredient(
                ingredient,
                portions,
                personnesBase
            );
        }, 0);
    }

    /* -------------------------------------
       CALCUL D'UN REPAS
    ------------------------------------- */

    function calculerCoutRepas(repas) {

        if (!repas.actif) {
            return 0;
        }

        if (repas.type === "maison") {

            const recette = recettes[repas.recette];

            return calculerCoutRecette(
                recette,
                repas.portions
            );
        }

        if (repas.type === "restaurant") {

            const restaurant = restaurants[repas.restaurant];

            if (!restaurant) {
                return 0;
            }

            if (
                Array.isArray(restaurant.prix_plats)
                && restaurant.prix_plats.length > 0
            ) {

                const plat = restaurant.prix_plats[repas.plat];

                if (!plat) {
                    return 0;
                }

                return nombreValide(plat.prix) * repas.portions;
            }

            const prixPersonne = nombreValide(
                repas.prixPersonne
            );

            return prixPersonne * repas.portions;
        }

        return 0;
    }

    function calculerCoutJour(jour) {

        return calculerCoutRepas(jour.repas.midi)
            + calculerCoutRepas(jour.repas.soir);
    }

    function calculerTotalSemaine() {

        return planning.reduce((total, jour) => {
            return total + calculerCoutJour(jour);
        }, 0);
    }

    /* -------------------------------------
       INGREDIENTS D'UNE RECETTE
    ------------------------------------- */

    function afficherIngredients(recette, portions) {

        if (!recette || !Array.isArray(recette.ingredients)) {
            return "";
        }

        const personnesBase = Math.max(
            1,
            nombreValide(recette.personnes, 4)
        );

        const lignes = recette.ingredients.map(ingredient => {

            const quantite = nombreValide(ingredient.quantite)
                * portions / personnesBase;

            const quantiteAffichee = Number(quantite.toFixed(2));

            return `
                <li>
                    ${echapper(ingredient.nom)}
                    : ${quantiteAffichee}
                    ${echapper(ingredient.unite)}
                </li>
            `;
        }).join("");

        return `
            <details class="ingredients-details">
                <summary>Voir les ingrédients et quantités</summary>
                <ul>${lignes}</ul>
            </details>
        `;
    }

    /* -------------------------------------
       CHOIX DES RECETTES
    ------------------------------------- */

    function afficherOptionsRecettes(repas, indexJour, moment) {

        return recettes.map((recette, index) => `
            <option
                value="${index}"
                ${index === repas.recette ? "selected" : ""}
            >
                ${echapper(recette.nom)}
            </option>
        `).join("");
    }

    /* -------------------------------------
       CHOIX DES RESTAURANTS
    ------------------------------------- */

    function afficherOptionsRestaurants(repas) {

        return restaurants.map((restaurant, index) => `
            <option
                value="${index}"
                ${index === repas.restaurant ? "selected" : ""}
            >
                ${echapper(restaurant.nom)}
            </option>
        `).join("");
    }

    function afficherFicheRestaurant(repas, indexJour, moment) {

        const restaurant = restaurants[repas.restaurant];

        if (!restaurant) {
            return `
                <p class="empty-recipes">
                    Aucun restaurant disponible pour le moment.
                </p>
            `;
        }

        const prixConnu = restaurant.prix !== null
            && restaurant.prix !== ""
            && Number.isFinite(Number(restaurant.prix));

        const prixTexte = prixConnu
            ? `${euro(Number(restaurant.prix))} par personne`
            : "Prix moyen non renseigné";

        const image = restaurant.image || "";

        const cout = calculerCoutRepas(repas);

        const platsDisponibles = Array.isArray(restaurant.prix_plats)
            ? restaurant.prix_plats
            : [];

        const optionsPlats = platsDisponibles.map((plat, index) => `
            <option
                value="${index}"
                ${index === repas.plat ? "selected" : ""}
            >
                ${echapper(plat.nom)} — ${euro(plat.prix)}
            </option>
        `).join("");

        const platSelectionne = platsDisponibles[repas.plat];

        return `
            <div class="restaurant-box">

                <div style="
                    display:flex;
                    gap:16px;
                    align-items:flex-start;
                    flex-wrap:wrap;
                    margin-bottom:18px;
                ">

                    ${image ? `
                        <img
                            src="${echapper(image)}"
                            alt="${echapper(restaurant.nom)}"
                            style="
                                width:125px;
                                height:110px;
                                object-fit:cover;
                                border-radius:3px;
                            "
                        >
                    ` : ""}

                    <div style="flex:1;min-width:170px;">

                        <h3>${echapper(restaurant.nom)}</h3>

                        <p>
                            ${echapper(restaurant.cuisine)}
                        </p>

                        <p>
                            ${echapper(restaurant.adresse)}
                            · ${echapper(restaurant.ville)}
                        </p>

                        <p>
                            <strong>À goûter :</strong>
                            ${echapper(restaurant.plats)}
                        </p>

                        <p>
                            <strong>${prixTexte}</strong>
                        </p>

                        <a
                            href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                                restaurant.nom + ", "
                                + restaurant.adresse + ", "
                                + restaurant.ville
                            )}"
                            target="_blank"
                            rel="noopener"
                            style="
                                display:inline-block;
                                margin-top:5px;
                                color:#a65338;
                                text-decoration:underline;
                                font-size:12px;
                            "
                        >
                            Voir l'itinéraire
                        </a>

                    </div>
                </div>

                ${platsDisponibles.length > 0 ? `

                    <div class="repas-options">

                        <div>

                            <label for="plat-${indexJour}-${moment}">
                                Choisir un plat
                            </label>

                            <select
                                id="plat-${indexJour}-${moment}"
                                data-action="choisir-plat"
                                data-jour="${indexJour}"
                                data-moment="${moment}"
                            >
                                ${optionsPlats}
                            </select>

                        </div>

                        <p class="restaurant-prix-selectionne">
                            Prix du plat :

                            <strong>
                                ${platSelectionne
                                    ? euro(platSelectionne.prix)
                                    : "Non renseigné"}
                                par personne
                            </strong>
                        </p>

                    </div>

                ` : ""}

                <div class="repas-options">

                    ${platsDisponibles.length === 0 ? `

                        <div>

                            <label for="prix-resto-${indexJour}-${moment}">
                                Prix estimé par personne (€)
                            </label>

                            <input
                                class="restaurant-cost"
                                id="prix-resto-${indexJour}-${moment}"
                                type="number"
                                min="0"
                                step="0.50"
                                value="${repas.prixPersonne || ""}"
                                placeholder="${prixConnu
                                    ? Number(restaurant.prix).toFixed(2)
                                    : "Ex. : 15"}"
                                data-action="prix-restaurant"
                                data-jour="${indexJour}"
                                data-moment="${moment}"
                            >

                        </div>

                    ` : ""}

                </div>

                <div class="repas-prix">
                    <span>
                        Total pour ${repas.portions} personne(s)
                    </span>

                    <strong>${euro(cout)}</strong>
                </div>

            </div>
        `;
    }

    /* -------------------------------------
       AFFICHAGE D'UN REPAS
    ------------------------------------- */

    function afficherRepas(indexJour, moment, titre) {

        const repas = planning[indexJour].repas[moment];

        const prix = calculerCoutRepas(repas);

        let contenu = "";

        if (repas.actif && repas.type === "maison") {

            const recetteChoisie = recettes[repas.recette];

            contenu = `
                <div class="repas-options">

                    <div>

                        <label for="recette-${indexJour}-${moment}">
                            Choisir une recette
                        </label>

                        <select
                            id="recette-${indexJour}-${moment}"
                            data-action="choisir-recette"
                            data-jour="${indexJour}"
                            data-moment="${moment}"
                        >
                            ${afficherOptionsRecettes(
                                repas,
                                indexJour,
                                moment
                            )}
                        </select>

                    </div>

                    <div>

                        <label for="portions-${indexJour}-${moment}">
                            Nombre de portions
                        </label>

                        <div class="portions-wrap">

                            <input
                                type="number"
                                id="portions-${indexJour}-${moment}"
                                min="1"
                                max="100"
                                value="${repas.portions}"
                                data-action="changer-portions"
                                data-jour="${indexJour}"
                                data-moment="${moment}"
                            >

                            <span>personne(s)</span>

                        </div>

                    </div>

                </div>

                <div class="repas-prix">
                    <span>Coût estimé du repas</span>
                    <strong>${euro(prix)}</strong>
                </div>

                ${afficherIngredients(
                    recetteChoisie,
                    repas.portions
                )}
            `;
        }

        if (repas.actif && repas.type === "restaurant") {

            contenu = `

                <div class="repas-options">

                    <div>

                        <label for="restaurant-${indexJour}-${moment}">
                            Choisir un restaurant
                        </label>

                        <select
                            id="restaurant-${indexJour}-${moment}"
                            data-action="choisir-restaurant"
                            data-jour="${indexJour}"
                            data-moment="${moment}"
                        >
                            ${afficherOptionsRestaurants(repas)}
                        </select>

                    </div>

                    <div>

                        <label for="portions-${indexJour}-${moment}">
                            Nombre de personnes
                        </label>

                        <div class="portions-wrap">

                            <input
                                type="number"
                                id="portions-${indexJour}-${moment}"
                                min="1"
                                max="100"
                                value="${repas.portions}"
                                data-action="changer-portions"
                                data-jour="${indexJour}"
                                data-moment="${moment}"
                            >

                            <span>personne(s)</span>

                        </div>

                    </div>

                </div>

                ${afficherFicheRestaurant(
                    repas,
                    indexJour,
                    moment
                )}

            `;
        }

        return `
            <article class="repas-carte ${repas.actif ? "repas-ajoute" : ""}"
                     data-repas="${moment}">

                <div class="repas-topline">

                    <strong>${titre}</strong>

                    <label>

                        <input
                            type="checkbox"
                            data-action="activer-repas"
                            data-jour="${indexJour}"
                            data-moment="${moment}"
                            ${repas.actif ? "checked" : ""}
                        >

                        Prévoir ce repas

                    </label>

                </div>

                ${repas.actif ? `

                    <div class="repas-options">

                        <div>

                            <label for="type-${indexJour}-${moment}">
                                Comment souhaitez-vous manger ?
                            </label>

                            <select
                                id="type-${indexJour}-${moment}"
                                data-action="type-repas"
                                data-jour="${indexJour}"
                                data-moment="${moment}"
                            >

                                <option value="maison"
                                    ${repas.type === "maison" ? "selected" : ""}>
                                    Fait maison
                                </option>

                                <option value="restaurant"
                                    ${repas.type === "restaurant" ? "selected" : ""}>
                                    Au restaurant
                                </option>

                            </select>

                        </div>

                    </div>

                    ${contenu}

                ` : `

                    <p class="jour-message">
                        Ce repas n'est pas encore prévu.
                    </p>

                `}

            </article>
        `;
    }

    /* -------------------------------------
       AFFICHAGE DES 7 JOURNEES
    ------------------------------------- */

    function afficherPlanning() {

        listeJours.innerHTML = jours.map((nom, index) => {

            const total = calculerCoutJour(planning[index]);

            return `

                <article class="jour-budget"
                         data-jour-card="${index}">

                    <div class="jour-header">

                        <div class="jour-date">

                            <strong>${nom}</strong>

                            <span>
                                Déjeuner et dîner
                            </span>

                        </div>

                        <span class="jour-mode">
                            Organisation libre
                        </span>

                        <div class="jour-total">
                            ${euro(total)}
                        </div>

                    </div>

                    <div class="jour-contenu">

                        <div class="repas-grid">

                            ${afficherRepas(
                                index,
                                "midi",
                                "Déjeuner"
                            )}

                            ${afficherRepas(
                                index,
                                "soir",
                                "Dîner"
                            )}

                        </div>

                    </div>

                </article>

            `;

        }).join("");
    }

    /* -------------------------------------
       TABLEAU DE BORD
    ------------------------------------- */

    function actualiserBudget(animer = true) {

        const budget = nombreValide(budgetInput.value);
        const total = calculerTotalSemaine();
        const restant = budget - total;

        const pourcentage = budget > 0
            ? (total / budget) * 100
            : total > 0 ? 100 : 0;

        const progression = Math.min(pourcentage, 100);

        affichageBudget.textContent = euro(budget);
        totalSemaine.textContent = euro(total);
        budgetRestant.textContent = euro(restant);

        // NOUVEAU : gestion de l'impression selon le budget

        const budgetDepasse = total > budget;

        if (boutonImprimer) {
            boutonImprimer.disabled = budgetDepasse;
        }

        if (messageBudgetImpression) {
            messageBudgetImpression.hidden = !budgetDepasse;
        }

        pourcentageBudget.textContent =
            `${Math.round(pourcentage)}%`;

        cercleBudget.style.setProperty(
            "--progression",
            `${progression}%`
        );

        cercleBudget.setAttribute(
            "aria-valuenow",
            Math.round(progression)
        );

        // MODIFIÉ : détection du dépassement même avec un budget à zéro

        if (total > budget) {

            cercleBudget.style.setProperty(
                "--gauge-color",
                "#d96d5e"
            );

            statutBudget.textContent =
                "Attention, vous avez dépassé votre budget.";

        } else if (budget > 0 && pourcentage >= 80) {

            cercleBudget.style.setProperty(
                "--gauge-color",
                "#e0b35f"
            );

            statutBudget.textContent =
                "Vous approchez de votre limite. Gardez un œil sur vos dépenses.";

        } else {

            cercleBudget.style.setProperty(
                "--gauge-color",
                "#d9a978"
            );

            statutBudget.textContent =
                "Votre budget est sous contrôle. Continuez ainsi !";
        }

        if (budget === 0 && total === 0) {

            statutBudget.textContent =
                "Définissez votre budget pour commencer.";
        }

        if (animer && total !== derniereDepense) {

            cercleBudget.classList.remove("gauge-pulse");

            void cercleBudget.offsetWidth;

            cercleBudget.classList.add("gauge-pulse");
        }

        derniereDepense = total;

        document.querySelectorAll(".jour-budget").forEach(
            (carte, index) => {

                const totalJour = carte.querySelector(".jour-total");

                if (totalJour) {
                    totalJour.textContent = euro(
                        calculerCoutJour(planning[index])
                    );
                }
            }
        );
    }

    /* -------------------------------------
       EVENEMENTS DU PLANNING
    ------------------------------------- */

    listeJours.addEventListener("change", evenement => {

        const cible = evenement.target;
        const action = cible.dataset.action;

        const index = Number(cible.dataset.jour);

        if (!Number.isInteger(index) || !planning[index]) {
            return;
        }

        const jour = planning[index];

        const moment = cible.dataset.moment;

        const repas = moment
            ? jour.repas[moment]
            : null;

        if (action === "activer-repas") {

            repas.actif = cible.checked;

            if (repas.actif) {
                repas.portions = obtenirNombrePersonnes();
            }

            afficherPlanning();
            actualiserBudget();

            return;
        }

        if (action === "type-repas") {

            repas.type = cible.value;

            if (repas.type === "restaurant") {
                repas.portions = obtenirNombrePersonnes();
            }

            afficherPlanning();
            actualiserBudget();

            return;
        }

        if (action === "choisir-recette") {

            repas.recette = Number(cible.value);

            afficherPlanning();
            actualiserBudget();

            return;
        }

        if (action === "choisir-restaurant") {

            repas.restaurant = Number(cible.value);

            repas.plat = 0;

            const restaurant = restaurants[repas.restaurant];

            if (
                restaurant
                && restaurant.prix !== null
                && restaurant.prix !== ""
                && Number.isFinite(Number(restaurant.prix))
            ) {
                repas.prixPersonne = Number(restaurant.prix);
            } else {
                repas.prixPersonne = 0;
            }

            afficherPlanning();
            actualiserBudget();

            return;
        }

        if (action === "choisir-plat") {

            repas.plat = Number(cible.value);

            afficherPlanning();
            actualiserBudget();

            return;
        }

        if (action === "changer-portions") {

            repas.portions = Math.max(
                1,
                Math.min(100, Math.floor(nombreValide(cible.value, 1)))
            );

            repas.portionsPersonnalisees = true;

            afficherPlanning();
            actualiserBudget();

            return;
        }

        if (action === "prix-restaurant") {

            repas.prixPersonne = nombreValide(cible.value);

            afficherPlanning();
            actualiserBudget();
        }
    });

    /* -------------------------------------
       MODIFICATIONS EN DIRECT
    ------------------------------------- */

    listeJours.addEventListener("input", evenement => {

        const cible = evenement.target;

        const action = cible.dataset.action;

        const index = Number(cible.dataset.jour);

        if (!Number.isInteger(index) || !planning[index]) {
            return;
        }

        const moment = cible.dataset.moment;

        const repas = moment
            ? planning[index].repas[moment]
            : null;

        if (action === "changer-portions") {

            repas.portions = Math.max(
                1,
                Math.min(100, Math.floor(nombreValide(cible.value, 1)))
            );

            repas.portionsPersonnalisees = true;

            actualiserBudget();
        }

        if (action === "prix-restaurant") {

            repas.prixPersonne = nombreValide(cible.value);

            actualiserBudget();
        }
    });

    /* -------------------------------------
       PARAMETRES GENERAUX
    ------------------------------------- */

    budgetInput.addEventListener("input", () => {
        actualiserBudget();
    });

    personnesInput.addEventListener("input", () => {

        const personnes = obtenirNombrePersonnes();

        planning.forEach(jour => {

            Object.values(jour.repas).forEach(repas => {

                if (!repas.portionsPersonnalisees) {
                    repas.portions = personnes;
                }

            });

        });

        afficherPlanning();
        actualiserBudget();
    });

    /* -------------------------------------
       CHARGEMENT DES DONNEES
    ------------------------------------- */

    async function chargerRecettes() {

        try {

            const reponse = await fetch("../JSON/recettes.json");

            if (!reponse.ok) {
                throw new Error("Impossible de charger recettes.json.");
            }

            const donnees = await reponse.json();

            if (!Array.isArray(donnees) || donnees.length === 0) {
                throw new Error("Aucune recette disponible.");
            }

            recettes = donnees;

            return true;

        } catch (erreur) {

            console.error("Erreur recettes :", erreur);

            return false;
        }
    }

    async function chargerRestaurants() {

        try {

            const reponse = await fetch("../json/restaurants.json");

            if (!reponse.ok) {
                throw new Error("Impossible de charger restaurants.json.");
            }

            const donnees = await reponse.json();

            if (!Array.isArray(donnees)) {
                throw new Error("Format du fichier restaurants.json incorrect.");
            }

            restaurants = donnees;

            return true;

        } catch (erreur) {

            console.error("Erreur restaurants :", erreur);

            return false;
        }
    }

    async function initialiserCalculateur() {

        listeJours.innerHTML = `
            <p class="loading-message">
                Préparation de votre planning...
            </p>
        `;

        const [recettesChargees, restaurantsCharges] = await Promise.all([
            chargerRecettes(),
            chargerRestaurants()
        ]);

        if (!recettesChargees) {

            listeJours.innerHTML = `
                <div class="error-message">
                    Impossible de charger les recettes.
                    Vérifiez le fichier JSON/recettes.json
                    et ouvrez la page avec Live Server.
                </div>
            `;

            return;
        }

        if (!restaurantsCharges) {

            console.warn(
                "Les restaurants n'ont pas pu être chargés."
            );

            restaurants = [];
        }

        const personnes = obtenirNombrePersonnes();

        planning.forEach(jour => {

            Object.values(jour.repas).forEach(repas => {
                repas.portions = personnes;
            });

        });

        afficherPlanning();
        actualiserBudget(false);

        console.log("Mboa Kitchen : calculateur prêt !");
        console.log(`${recettes.length} recettes chargées.`);
        console.log(`${restaurants.length} restaurants chargés.`);
    }

    initialiserCalculateur();

});
