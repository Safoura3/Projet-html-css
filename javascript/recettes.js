const grille  =document.querySelector("#grille-recettes");
const aucune = document.querySelector("#aucune-recette");
const caseVege = document.querySelector("#filtre-vege");
const ficheImage= document.querySelector("#fiche-image");
const fichePays = document.querySelector("#fiche-pays");
const ficheNom = document.querySelector("#fiche-nom");
const ficheDescription = document.querySelector("#fiche-description");
const ficheInfos = document.querySelector("#fiche-infos");
const ficheIngredients = document.querySelector("#fiche-ingredients");
const ficheEtapes = document.querySelector("#fiche-etapes");
const nbPortions = document.querySelector("#nb-portions");
const boutonMoins = document.querySelector("#portions-moins");
const boutonPlus = document.querySelector("#portions-plus");

const boutonsFiltre = document.querySelectorAll(".filtre");

let recettes = [];
let paysChoisi = "Tous";
let vegeSeul = false;
let recetteChoisie = null;
let portions = 4 ;


async function chargerRecettes  () {
try{
    const reponse=await fetch("../json/recettes.json");
    if (!reponse.ok){
        throw new Error("Fichier introuvable");}
        recettes= await reponse.json();
        afficherListe();
        afficherFiche(recettes[0]);
    }catch(erreur){
    console.error(erreur);
    grille.textContent = "Impossible de charger les recettes.";
}
}
chargerRecettes();

function afficherListe () {

    const liste  = recettes.filter(function(r){
        return (paysChoisi === "Tous" || r.pays === paysChoisi) && (!vegeSeul || r.vege);
    });
    
    grille.innerHTML = "";
    
    liste.forEach(function (r) { 
        const carte = document.createElement("button");
        carte.type = "button";
        carte.className = "carte-recette";
        
        const img = document.createElement("img");
            img.src= "../img/plats/"+r.image;
            img.alt="";
        const titre = document.createElement("h3");
        titre.textContent= r.nom;
        const infos = document.createElement("p");
        infos.textContent = r.pays + "." + r.temps;
        
        carte.append(img,titre,infos);
        grille.appendChild(carte);

        carte.addEventListener("click",function(){
            afficherFiche(r,true);
        });
    });

    aucune.hidden= liste.lenght !== 0;
}
boutonsFiltre.forEach(function(bouton){
    bouton.addEventListener("click",function(){
        paysChoisi = bouton.dataset.pays;
       boutonsFiltre.forEach(function(b){
        b.classList.remove("actif");
        b.setAttribute("aria-pressed","false");
        });
        bouton.classList.add("actif");
        bouton.setAttribute("aria-pressed","true");

        afficherListe();
});      
});
caseVege.addEventListener("change", function () {
  vegeSeul = caseVege.checked;
  afficherListe();
});
function afficherFiche(r,defiler){
    recetteChoisie = r;
    portions = 4;
    nbPortions.textContent = portions;

    ficheImage.src = "../img/plats/"+ r.image;
    ficheImage.alt = "Plat de "+ r.nom;

    fichePays.textContent=r.pays;
    ficheNom.textContent=r.nom;
    ficheDescription.textContent=r.description;
    const piment = "●".repeat(r.piment)+"○".repeat(5 - r.piment);
   ficheInfos.textContent = "⏱ "+ r.temps + " · " + piment + " piment";
   ficheEtapes.innerHTML = "";
   r.etapes.forEach(function(texte){
    const li = document.createElement("li");
    li.textContent = texte;
    ficheEtapes.appendChild(li);
   });
   afficherIngredients();
   if(defiler){
    document.querySelector("#fiche").scrollIntoView({behavior:"smooth"});
   }
}
function afficherIngredients(){
    ficheIngredients.innerHTML = "";

    recetteChoisie.ingredients.forEach(function(ing){
        const qte = Math.round(ing.quantite*portions/4*10)/10;
        const tr = document.createElement("tr");

        const tdNom = document.createElement("td");
        tdNom.textContent = ing.nom;

        const tdQte = document.creataElement("td");
        tdQte.textContent = (qte+" "+ing.unite).trim();
        tr.append(tdNom,tdQte);
        ficheIngredients.appendChild(tr);
    });
}
boutonPlus.addEventListener("click", function(){
    if (portions <12){
        portions++;
        nbPortions.textContent = portions;
        afficherIngredients();
    }
})
boutonMoins.addEventListener("click", function(){
    if (portions >1){
        portions--;
        nbPortions.textContent = portions;
        afficherIngredients();}
    });