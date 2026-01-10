function showSection(sectionId) {
  
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    const activeSection = document.getElementById(sectionId);
    activeSection.classList.add('active');
}


let livresChart = null;


function updateKPIs() {
    const kpiLivresEl = document.getElementById('kpiLivres');
    const kpiAuteursEl = document.getElementById('kpiAuteurs');
    const totalLivres = (typeof livres !== 'undefined') ? livres.length : 0;
    const totalAuteurs = (typeof auteurs !== 'undefined') ? auteurs.length : 0;

    if (kpiLivresEl) kpiLivresEl.textContent = totalLivres;
    if (kpiAuteursEl) kpiAuteursEl.textContent = totalAuteurs;
}


function initLivresChart() {
    const ctx = document.getElementById('livresChart').getContext('2d');

    const labels = ['Fiction', 'Science', 'Histoire', 'Biographie'];

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

    
    livresChart = new Chart(ctx, config);
}


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


document.addEventListener('DOMContentLoaded', () => {
    
    showSection('dashboard');
    
    
    updateKPIs();
    

    initLivresChart();
    
    refreshDashboard();
});
