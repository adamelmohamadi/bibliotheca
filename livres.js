// --- Déclaration des variables ---
let livres = []; // Tableau pour stocker les livres

// --- Sélection des éléments du DOM ---
const livreForm = document.getElementById('livreForm');
const searchInput = document.getElementById('searchLivre');
const sortSelect = document.getElementById('sortLivre');

// Création d'un conteneur pour afficher les livres
let livresContainer = document.createElement('ul');
livresContainer.id = "livresList";
document.getElementById('livres').appendChild(livresContainer);

// --- Fonction pour afficher les livres ---
function displayLivres(filteredLivres = livres) {
    livresContainer.innerHTML = ''; // vider la liste

    filteredLivres.forEach((livre, index) => {
        const li = document.createElement('li');
        li.textContent = `${livre.titre} - ${livre.auteur} (${livre.annee}) [${livre.genre}] `;

        // Bouton supprimer
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.onclick = () => {
            removeLivre(index);
        };

        li.appendChild(deleteBtn);
        livresContainer.appendChild(li);
    });

    // Mettre à jour le KPI
    updateKPIsLivres();
}

// --- Fonction pour ajouter un livre ---
function addLivre(titre, auteur, annee, genre) {
    if (titre.trim() === '' || auteur.trim() === '' || !annee || genre.trim() === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    livres.push({ titre, auteur, annee: Number(annee), genre });
    displayLivres();
}

// --- Fonction pour supprimer un livre ---
function removeLivre(index) {
    livres.splice(index, 1); // supprimer le livre
    displayLivres();
}

// --- Fonction pour mettre à jour le KPI ---
function updateKPIsLivres() {
    const kpiLivres = document.getElementById('kpiLivres');
    if (kpiLivres) {
        kpiLivres.textContent = livres.length;
    }
    // Si le dashboard expose refreshDashboard, l'appeler pour mettre à jour le graphique
    if (typeof refreshDashboard === 'function') {
        refreshDashboard();
    }
}

// --- Recherche des livres ---
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = livres.filter(livre => 
        livre.titre.toLowerCase().includes(query) || 
        livre.auteur.toLowerCase().includes(query)
    );
    displayLivres(filtered);
});

// --- Tri des livres ---
sortSelect.addEventListener('change', () => {
    const value = sortSelect.value;
    let sorted = [...livres]; // copie du tableau

    if (value === 'titre') {
        sorted.sort((a, b) => a.titre.localeCompare(b.titre));
    } else if (value === 'annee') {
        sorted.sort((a, b) => a.annee - b.annee);
    }

    displayLivres(sorted);
});

// --- Gestionnaire du formulaire ---
livreForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
    const annee = document.getElementById('annee').value;
    const genre = document.getElementById('genre').value;

    addLivre(titre, auteur, annee, genre);
    livreForm.reset();
});

// --- Initialisation ---
document.addEventListener('DOMContentLoaded', () => {
    displayLivres(); // afficher la liste initiale (vide)
});
