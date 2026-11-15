// MBOA KITCHEN — ANIMATIONS DE LA PAGE À PROPOS

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".apropos-histoire, .apropos-valeurs, .apropos-equipe, .apropos-conclusion, .valeur, .membre-equipe"
    );

    document.body.classList.add("js-actif");

    const observateur = new IntersectionObserver((entrees) => {

        entrees.forEach((entree) => {

            if (entree.isIntersecting) {
                entree.target.classList.add("visible");
                observateur.unobserve(entree.target);
            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach((element) => {
        observateur.observe(element);
    });

});// MBOA KITCHEN — ANIMATIONS DE LA PAGE À PROPOS

document.addEventListener("DOMContentLoaded", () => {

    const elements = document.querySelectorAll(
        ".apropos-histoire, .apropos-valeurs, .apropos-equipe, .apropos-conclusion, .valeur, .membre-equipe"
    );

    document.body.classList.add("js-actif");

    const observateur = new IntersectionObserver((entrees) => {

        entrees.forEach((entree) => {

            if (entree.isIntersecting) {
                entree.target.classList.add("visible");
                observateur.unobserve(entree.target);
            }

        });

    }, {
        threshold: 0.15
    });

    elements.forEach((element) => {
        observateur.observe(element);
    });

});