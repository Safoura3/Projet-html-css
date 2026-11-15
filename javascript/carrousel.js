// Carrousel de l'accueil : un plat au centre, deux de chaque côté
try {
    const plats = document.querySelectorAll(".plat");
    const total = plats.length;
    let actif = 2; // le ndolè au centre au départ

    function afficher() {
        plats.forEach(function (plat, i) {
            // écart entre ce plat et celui du centre (entre -3 et 3)
            let ecart = (i - actif + total) % total;
            if (ecart > total / 2) {
                ecart = ecart - total;
            }

            plat.classList.remove("actif", "gauche", "droite", "loin-gauche", "loin-droite");

            if (ecart === 0) {
                plat.classList.add("actif");
            } else if (ecart === -1) {
                plat.classList.add("gauche");
            } else if (ecart === 1) {
                plat.classList.add("droite");
            } else if (ecart === -2) {
                plat.classList.add("loin-gauche");
            } else if (ecart === 2) {
                plat.classList.add("loin-droite");
            }
        });
    }

    function suivant() {
        actif = (actif + 1) % total;
        afficher();
    }

    function precedent() {
        actif = (actif - 1 + total) % total;
        afficher();
    }

    document.querySelector(".carrousel-suiv").addEventListener("click", suivant);
    document.querySelector(".carrousel-prec").addEventListener("click", precedent);

    // défilement automatique toutes les 3,5 secondes, en pause sous la souris
    let minuterie = setInterval(suivant, 3500);
    const carrousel = document.querySelector(".carrousel");

    carrousel.addEventListener("mouseenter", function () {
        clearInterval(minuterie);
    });
    carrousel.addEventListener("mouseleave", function () {
        minuterie = setInterval(suivant, 3500);
    });

    afficher();
} catch (erreur) {
    console.error(erreur);
}
