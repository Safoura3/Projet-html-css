// Menu burger : sur téléphone, le bouton ☰ ouvre et ferme le menu
const boutonMenu = document.querySelector(".bouton-menu");
const menu = document.querySelector(".menu");

boutonMenu.addEventListener("click", function () {
    // toggle ajoute la classe si elle manque, l'enlève sinon
    const ouvert = menu.classList.toggle("ouvert");
    boutonMenu.setAttribute("aria-expanded", ouvert);
});
