// Gestion des Sections
function showSection(sectionId) {
    // Masquer toutes les sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Afficher la section sélectionnée
    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}

// Exemple de données pour les KPIs
let totalLivres = 1200;
let totalAuteurs = 300;

// Fonction pour mettre à jour les KPIs
function updateKPIs() {
    document.getElementById('kpiLivres').textContent = totalLivres;
    document.getElementById('kpiAuteurs').textContent = totalAuteurs;
}

// Initialiser le graphique avec Chart.js
function initLivresChart() {
    const ctx = document.getElementById('livresChart').getContext('2d');

    // Exemple de données pour le graphique
const data = {
    labels: ['Fiction', 'Science', 'Histoire', 'Biographie'],
    datasets: [{
        label: 'Livres par Genre',
        data: [500, 200, 300, 200],
        backgroundColor: ['#FF5733', '#33FF57', '#3357FF', '#FFC300'],
        borderColor: '#000',
        borderWidth: 1
    }]
};

    const config = {
        type: 'bar',
        data: data,
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    };

    // Créer le graphique
    const livresChart = new Chart(ctx, config);
}

// Appel initial des fonctions
document.addEventListener('DOMContentLoaded', () => {
    // Afficher la section Dashboard par défaut
    showSection('dashboard');
    
    // Mettre à jour les KPIs
    updateKPIs();
    
    // Initialiser le graphique
    initLivresChart();
});
