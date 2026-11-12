
// ========================================
// 1. CONFIGURATION DES JOURS DE LA SEMAINE
// ========================================

const joursSemaine = [
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
    "Dimanche"
];

// ========================================
// 2. TYPES DE REPAS
// ========================================

const typesRepas = [
    "Déjeuner",
    "Dîner"
];

// ========================================
// 3. RECUPERER LA ZONE DU PLANNING
// ========================================

const listeJours = document.getElementById("liste-jours");

// ========================================
// 4. GENERER LES JOURNEES
// ========================================

function afficherJours() {

    joursSemaine.forEach((jour) => {

        const carteJour = document.createElement("div");

        carteJour.classList.add("budget-jour");

        let contenuRepas = "";

        typesRepas.forEach((repas) => {

            contenuRepas += `
                <div class="budget-repas">

                    <h4>${repas}</h4>

                    <p>
                        Aucun plat sélectionné pour le moment.
                    </p>

                    <button
                        type="button"
                        class="bouton-ajouter-repas"
                        data-jour="${jour}"
                        data-repas="${repas}"
                    >
                        + Ajouter un plat
                    </button>

                    <div class="zone-selection-repas" hidden>

                        <p>
                            Comment souhaitez-vous prendre ce repas ?
                        </p>

                        <div class="choix-mode-repas">

                            <button
                                type="button"
                                class="bouton-mode"
                                data-mode="maison"
                            >
                                Fait maison
                            </button>

                            <button
                                type="button"
                                class="bouton-mode"
                                data-mode="restaurant"
                            >
                                Au restaurant
                            </button>

                        </div>

                        <div class="zone-contenu-mode"></div>

                    </div>

                </div>
            `;

        });

        carteJour.innerHTML = `
            <h3>${jour}</h3>

            <div class="budget-repas-jour">
                ${contenuRepas}
            </div>
        `;

        listeJours.appendChild(carteJour);

    });

}

// ========================================
// 5. LANCER LA GENERATION DU PLANNING
// ========================================

afficherJours();

// ========================================
// 6. OUVRIR ET FERMER LA ZONE DE SELECTION
// ========================================

listeJours.addEventListener("click", (event) => {

    const bouton = event.target.closest(".bouton-ajouter-repas");

    if (!bouton) {
        return;
    }

    const zoneSelection = bouton.nextElementSibling;

    zoneSelection.hidden = !zoneSelection.hidden;

    if (zoneSelection.hidden) {
        bouton.textContent = "+ Ajouter un plat";
    } else {
        bouton.textContent = "Fermer";
    }

});

// ========================================
// 7. GERER LE CHOIX DU MODE DE REPAS
// ========================================

listeJours.addEventListener("click", (event) => {

    const boutonMode = event.target.closest(".bouton-mode");

    if (!boutonMode) {
        return;
    }

    const zoneRepas = boutonMode.closest(".zone-selection-repas");

    const zoneContenu = zoneRepas.querySelector(".zone-contenu-mode");

    const mode = boutonMode.dataset.mode;

    if (mode === "maison") {

        zoneContenu.innerHTML = `
            <p>Choisissez une recette faite maison.</p>
            <p>La liste des recettes apparaîtra ici.</p>
        `;

    } else if (mode === "restaurant") {

        zoneContenu.innerHTML = `
            <p>Choisissez un restaurant.</p>
            <p>La liste des restaurants apparaîtra ici.</p>
        `;

    }

});
