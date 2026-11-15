
/* =====================================================
   MBOA KITCHEN — FORMULAIRE DE CONTACT
   Validation et préparation du message
===================================================== */

const formulaireContact = document.getElementById("formulaire-contact");

if (formulaireContact) {

    const nomContact = document.getElementById("contact-nom");
    const emailContact = document.getElementById("contact-email");
    const sujetContact = document.getElementById("contact-sujet");
    const messageContact = document.getElementById("contact-message");
    const retourContact = document.getElementById("contact-retour");

    formulaireContact.addEventListener("submit", function (event) {

        event.preventDefault();

        // Réinitialiser le message précédent
        retourContact.textContent = "";
        retourContact.className = "contact-retour";

        // Vérifier que tous les champs sont remplis
        if (
            !nomContact.value.trim() ||
            !emailContact.value.trim() ||
            !sujetContact.value ||
            !messageContact.value.trim()
        ) {
            retourContact.textContent =
                "Veuillez remplir tous les champs avant de continuer.";

            retourContact.classList.add("erreur");
            return;
        }

        // Vérifier le format de l'adresse e-mail
        const formatEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formatEmail.test(emailContact.value.trim())) {

            retourContact.textContent =
                "Veuillez saisir une adresse e-mail valide.";

            retourContact.classList.add("erreur");
            emailContact.focus();
            return;
        }

        // Vérifier la longueur du message
        if (messageContact.value.trim().length < 10) {

            retourContact.textContent =
                "Votre message doit contenir au moins 10 caractères.";

            retourContact.classList.add("erreur");
            messageContact.focus();
            return;
        }

        // Afficher la confirmation
        retourContact.textContent =
    "Merci " + nomContact.value.trim() +
    " ! Votre intérêt fait vivre l'aventure Mboa Kitchen. À très bientôt !";

        retourContact.classList.add("succes");

        // Réinitialiser les champs
        formulaireContact.reset();

    });

}
