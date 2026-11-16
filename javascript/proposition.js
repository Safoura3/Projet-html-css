const formulaire = document.querySelector("#form-recette");
const message = document.querySelector("#message-form");

formulaire.addEventListener("submit", function (evenement) {
  evenement.preventDefault();

  const erreurs = [];

  const nom = document.querySelector("#nom");
  const email = document.querySelector("#email");
  const plat = document.querySelector("#plat");
  const pays = document.querySelector("#pays");
  const texte = document.querySelector("#texte");

  [nom, email, plat, pays, texte].forEach(function (champ) {
    champ.classList.remove("invalide");
  });

  if (nom.value.trim().length < 2) {
    erreurs.push("Indiquez votre nom.");
    nom.classList.add("invalide");
  }

  if (!email.checkValidity()) {
    erreurs.push("L'adresse e-mail n'est pas valide.");
    email.classList.add("invalide");
  }

  if (plat.value.trim() === "") {
    erreurs.push("Indiquez le nom du plat.");
    plat.classList.add("invalide");
  }

  if (pays.value === "") {
    erreurs.push("Choisissez un pays.");
    pays.classList.add("invalide");
  }

  if (texte.value.trim().length < 30) {
    erreurs.push("Décrivez la recette en au moins 30 caractères.");
    texte.classList.add("invalide");
  }

  if (erreurs.length > 0) {
    message.textContent = erreurs.join(" ");
    message.className = "erreur";
  } else {
    message.textContent = "Merci " + nom.value.trim() + " ! Votre recette a bien été envoyée.";
    message.className = "succes";
    formulaire.reset();
  }
});