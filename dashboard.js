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

// KPI et graphique dynamiques basés sur les données globales `livres` et `auteurs`
let livresChart = null;

// Fonction pour mettre à jour les KPIs en lisant les tableaux globaux
function updateKPIs() {
    const kpiLivresEl = document.getElementById('kpiLivres');
    const kpiAuteursEl = document.getElementById('kpiAuteurs');
    const totalLivres = (typeof livres !== 'undefined') ? livres.length : 0;
    const totalAuteurs = (typeof auteurs !== 'undefined') ? auteurs.length : 0;

    if (kpiLivresEl) kpiLivresEl.textContent = totalLivres;
    if (kpiAuteursEl) kpiAuteursEl.textContent = totalAuteurs;
}

// Initialiser le graphique avec Chart.js
function initLivresChart() {
    const ctx = document.getElementById('livresChart').getContext('2d');

    const labels = ['Fiction', 'Science', 'Histoire', 'Biographie'];
    // Calculer les données initiales depuis `livres` si disponible
    const initialCounts = labels.map(label => {
        if (typeof livres === 'undefined') return 0;
        return livres.filter(l => l.genre === label).length;
    });

    const data = {
        labels: labels,
        datasets: [{
            label: 'Livres par Genre',
            data: initialCounts,
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

    // Créer le graphique et le conserver globalement
    livresChart = new Chart(ctx, config);
}

// Fonction publique pour rafraîchir KPIs + graphique depuis d'autres fichiers
function refreshDashboard() {
    updateKPIs();

    if (!livresChart) return;

    const labels = livresChart.data.labels;
    const counts = labels.map(label => {
        if (typeof livres === 'undefined') return 0;
        return livres.filter(l => l.genre === label).length;
    });

    livresChart.data.datasets[0].data = counts;
    livresChart.update();
}

// Appel initial des fonctions
document.addEventListener('DOMContentLoaded', () => {
    // Afficher la section Dashboard par défaut
    showSection('dashboard');
    
    // Mettre à jour les KPIs
    updateKPIs();
    
    // Initialiser le graphique
    initLivresChart();
    // Rafraîchir avec les données actuelles
    refreshDashboard();
});
