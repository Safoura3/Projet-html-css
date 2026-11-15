
// Page Restaurants : crée les cartes à partir du fichier JSON
const grille = document.querySelector("#grille-restaurants");
const compte = document.querySelector("#compte-restos");
const aucun = document.querySelector("#aucun-resto");
const boutonsFiltre = document.querySelectorAll(".filtre-cuisine");

let restaurants = [];
let cuisineChoisie = "Toutes";

async function chargerRestaurants() {
    try {
        const reponse = await fetch("../json/restaurants.json");
        if (!reponse.ok) {
            throw new Error("Fichier introuvable");
        }
        restaurants = await reponse.json();
        afficherRestaurants();
    } catch (erreur) {
        console.error(erreur);
        grille.textContent = "Impossible de charger les restaurants.";
    }
}

function afficherRestaurants() {
    // on garde les restaurants de la cuisine choisie
    const liste = restaurants.filter(function (r) {
        return cuisineChoisie === "Toutes" || r.groupe === cuisineChoisie;
    });

    grille.innerHTML = "";

    liste.forEach(function (r) {
        const carte = document.createElement("article");
        carte.className = "carte-restaurant";

        const image = document.createElement("img");
        image.className = "carte-restaurant-image";
        image.src = r.image;
        image.alt = "";

        const texte = document.createElement("div");
        texte.className = "carte-restaurant-texte";

        const cuisine = document.createElement("p");
        cuisine.className = "carte-cuisine";
        cuisine.textContent = "Cuisine " + r.cuisine;

        const nom = document.createElement("h3");
        nom.textContent = r.nom;

        const adresse = document.createElement("p");
        adresse.className = "carte-adresse";
        adresse.textContent = r.adresse + " · " + r.ville;

        const plats = document.createElement("p");
        plats.className = "carte-plats";
        const fort = document.createElement("strong");
        fort.textContent = "À goûter :";
        plats.append(fort, " " + r.plats);

        // Prix moyen par personne
        const prix = document.createElement("p");
        prix.className = "carte-prix";

        if (r.prix !== null && r.prix !== undefined) {
            prix.textContent = "Prix moyen : " + r.prix + " € par personne";
        } else {
            prix.textContent = "Prix moyen : à venir";
        }

        // NOUVEAU : affichage des prix détaillés des plats
        const detailsPrix = document.createElement("div");
        detailsPrix.className = "restaurant-prix-plats";

        if (Array.isArray(r.prix_plats) && r.prix_plats.length > 0) {
            const titrePrix = document.createElement("h4");
            titrePrix.textContent = "Nos spécialités et leurs prix";

            const listePrix = document.createElement("ul");

            r.prix_plats.forEach(function (plat) {
                const ligne = document.createElement("li");
                ligne.className = "ligne-prix-plat";

                const nomPlat = document.createElement("span");
                nomPlat.textContent = plat.nom;

                const montant = document.createElement("strong");
                montant.textContent = Number(plat.prix).toFixed(2).replace(".", ",") + " €";

                ligne.append(nomPlat, montant);
                listePrix.appendChild(ligne);
            });

            detailsPrix.append(titrePrix, listePrix);
        }

        const liens = document.createElement("div");
        liens.className = "carte-liens";

        if (r.site !== "") {
            const site = document.createElement("a");
            site.href = r.site;
            site.target = "_blank";
            site.rel = "noopener";
            site.textContent = "Voir le site";
            liens.append(site);
        }

        const itineraire = document.createElement("a");
        itineraire.href = "https://www.google.com/maps/search/?api=1&query="
            + encodeURIComponent(r.nom + ", " + r.adresse + ", " + r.ville);
        itineraire.target = "_blank";
        itineraire.rel = "noopener";
        itineraire.textContent = "Itinéraire";
        liens.append(itineraire);

        // On conserve les éléments d'origine et on ajoute les prix détaillés
        texte.append(cuisine, nom, adresse, plats, prix, detailsPrix, liens);
        carte.append(image, texte);
        grille.appendChild(carte);
    });

    if (liste.length > 1) {
        compte.textContent = liste.length + " restaurants";
    } else {
        compte.textContent = liste.length + " restaurant";
    }
    aucun.hidden = liste.length !== 0;
}

// les boutons de filtre par cuisine
boutonsFiltre.forEach(function (bouton) {
    bouton.addEventListener("click", function () {
        cuisineChoisie = bouton.dataset.cuisine;

        boutonsFiltre.forEach(function (b) {
            b.classList.remove("actif");
            b.setAttribute("aria-pressed", "false");
        });
        bouton.classList.add("actif");
        bouton.setAttribute("aria-pressed", "true");

        afficherRestaurants();
    });
});

chargerRestaurants();
