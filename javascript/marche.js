const champ = document.querySelector("#recherche");
const lignes = document.querySelectorAll(".table-lexique tbody tr");
const aucun = document.querySelector("#aucun-ingredient");

function sansAccents(chaine) {
  return chaine
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

champ.addEventListener("input", function () {
  const texte = sansAccents(champ.value.trim());
  let visibles = 0;

  lignes.forEach(function (ligne) {
    const trouve = sansAccents(ligne.textContent).includes(texte);
    ligne.hidden = !trouve;
    if (trouve) {
      visibles++;
    }
  });

  aucun.hidden = visibles > 0;
});