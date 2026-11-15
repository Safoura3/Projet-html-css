/* =========================================
   MBOA KITCHEN — CALCULATEUR DE BUDGET
========================================= */

// 1. Récupérer les éléments HTML dont on aura besoin

const budgetInput = document.getElementById("budget-total");
const personnesInput = document.getElementById("nombre-personnes");
const listeJours = document.getElementById("liste-jours");

// 2. Vérifier que les éléments existent bien

if (budgetInput && personnesInput && listeJours) {
    console.log("Le calculateur Mboa Kitchen est prêt !");
} else {
    console.error("Un élément du calculateur est introuvable.");
}