// « Je ne sais pas quoi manger » : tire un plat au hasard
const plats = ["Ndolè", "Poulet DG", "Mafé", "Thiéboudienne", "Yassa au poulet",
               "Jollof rice", "Garba", "Kedjenou", "Eru", "Poulet moambe"];
const boutonHasard = document.querySelector("#bouton-hasard");
const resultat = document.querySelector("#resultat-hasard");
let dernier = "";

boutonHasard.addEventListener("click", function () {
    let choix;
    // on recommence tant qu'on retombe sur le même plat que la dernière fois
    do {
        const indice = Math.floor(Math.random() * plats.length);
        choix = plats[indice];
    } while (choix === dernier);

    dernier = choix;
    resultat.textContent = "Ce soir : " + choix;
});
