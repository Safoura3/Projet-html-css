// Thème clair / sombre, retenu d'une page à l'autre avec localStorage
const boutonTheme = document.querySelector(".bouton-theme");
const logo = document.querySelector(".logo-image"); // le logo du header

function appliquerTheme(theme) {
    if (theme === "sombre") {
        document.body.classList.add("sombre");
        boutonTheme.textContent = "Thème clair ☀";
        logo.src = logo.getAttribute("src").replace("clair", "sombre");
    } else {
        document.body.classList.remove("sombre");
        boutonTheme.textContent = "Thème sombre ☾";
        logo.src = logo.getAttribute("src").replace("sombre", "clair");
    }
}

// Au chargement : on remet le thème choisi la dernière fois
try {
    appliquerTheme(localStorage.getItem("theme"));
} catch (erreur) {
    console.warn(erreur);
}

boutonTheme.addEventListener("click", function () {
    let nouveau;
    if (document.body.classList.contains("sombre")) {
        nouveau = "clair";
    } else {
        nouveau = "sombre";
    }
    appliquerTheme(nouveau);

    try {
        localStorage.setItem("theme", nouveau);
    } catch (erreur) {
        console.warn(erreur);
    }
});
