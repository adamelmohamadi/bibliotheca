// --- Déclaration des variables ---
let auteurs = []; // Tableau pour stocker les auteurs

// --- Sélection des éléments du DOM ---
const auteurForm = document.getElementById('auteurForm');
const auteursList = document.getElementById('auteursList');

// --- Fonction pour afficher les auteurs ---
function displayAuteurs() {
    auteursList.innerHTML = ''; // Vider la liste avant de l'afficher

    auteurs.forEach((auteur, index) => {
        const li = document.createElement('li');
        li.textContent = `${auteur.nom} (${auteur.nationalite}) `;

        // Ajouter un bouton supprimer
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.onclick = () => {
            removeAuteur(index);
        };

        li.appendChild(deleteBtn);
        auteursList.appendChild(li);
    });

    // Mettre à jour le KPI dans le dashboard
    updateKPIsAuteurs();
}

// --- Fonction pour ajouter un auteur ---
function addAuteur(nom, nationalite) {
    if (nom.trim() === '' || nationalite.trim() === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    auteurs.push({ nom, nationalite });
    displayAuteurs(); // Mettre à jour la liste
}

// --- Fonction pour supprimer un auteur ---
function removeAuteur(index) {
    auteurs.splice(index, 1); // Supprimer l'auteur du tableau
    displayAuteurs(); // Mettre à jour la liste
}

// --- Fonction pour mettre à jour le KPI des auteurs ---
function updateKPIsAuteurs() {
    const kpiAuteurs = document.getElementById('kpiAuteurs');
    if (kpiAuteurs) {
        kpiAuteurs.textContent = auteurs.length;
    }
}

// --- Gestionnaire d'événement pour le formulaire ---
auteurForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    const nom = document.getElementById('nomAuteur').value;
    const nationalite = document.getElementById('nationalite').value;

    addAuteur(nom, nationalite);

    // Réinitialiser le formulaire
    auteurForm.reset();
});

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', () => {
    displayAuteurs(); // Afficher la liste au chargement
});
