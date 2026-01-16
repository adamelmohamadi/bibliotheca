let livres = []; 


function loadLivres() {
    const saved = localStorage.getItem('bibliotheca_livres');
    if (saved) {
        livres = JSON.parse(saved);
    }
}


function saveLivres() {
    localStorage.setItem('bibliotheca_livres', JSON.stringify(livres));
}

const livreForm = document.getElementById('livreForm');
const searchInput = document.getElementById('searchLivre');
const sortSelect = document.getElementById('sortLivre');


let livresContainer = document.createElement('ul');
livresContainer.id = "livresList";
document.getElementById('livres').appendChild(livresContainer);


function createBookModal() {
    const modal = document.createElement('div');
    modal.id = 'bookModal';
    modal.classList.add('book-modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <div class="modal-body">
                <img id="modalCover" class="modal-cover" src="" alt="Couverture">
                <div class="modal-info">
                    <h2 id="modalTitre"></h2>
                    <p><strong>Auteur:</strong> <span id="modalAuteur"></span></p>
                    <p><strong>Année:</strong> <span id="modalAnnee"></span></p>
                    <p><strong>Genre:</strong> <span id="modalGenre"></span></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function showBookDetails(livre) {
    const modal = document.getElementById('bookModal');
    document.getElementById('modalTitre').textContent = livre.titre;
    document.getElementById('modalAuteur').textContent = livre.auteur;
    document.getElementById('modalAnnee').textContent = livre.annee;
    document.getElementById('modalGenre').textContent = livre.genre;
    
    const imgElement = document.getElementById('modalCover');
    if (livre.coverUrl) {
        imgElement.src = livre.coverUrl;
        imgElement.style.display = 'block';
    } else {
        imgElement.style.display = 'none';
    }
    
    modal.style.display = 'block';
}


function displayLivres(filteredLivres = livres) {
    console.log('Affichage des livres:', filteredLivres);
    livresContainer.innerHTML = ''; 

    filteredLivres.forEach((livre, index) => {
        const li = document.createElement('li');
        li.classList.add('livre-item');
        
        
        if (livre.coverUrl) {
            console.log('Image trouvée pour:', livre.titre, livre.coverUrl);
            const img = document.createElement('img');
            img.src = livre.coverUrl;
            img.alt = `Couverture de ${livre.titre}`;
            img.classList.add('livre-cover-thumbnail');
            li.appendChild(img);
        } else {
            console.log('Pas d\'image pour:', livre.titre);
            
            const placeholder = document.createElement('div');
            placeholder.classList.add('livre-no-cover');
            placeholder.innerHTML = '<i class="fa-solid fa-book"></i>';
            li.appendChild(placeholder);
        }
        
        
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('livre-info');
        infoDiv.innerHTML = `
            <strong>${livre.titre}</strong>
            <span>👤 ${livre.auteur}</span>
            <span>📅 ${livre.annee}</span>
            <span>📚 ${livre.genre}</span>
        `;
        li.appendChild(infoDiv);
        
        // Ajouter l'événement click pour voir les détails
        li.addEventListener('click', (e) => {
            if (e.target !== deleteBtn) {
                showBookDetails(livre);
            }
        });

    
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            removeLivre(index);
        };

        li.appendChild(deleteBtn);
        livresContainer.appendChild(li);
    });

    updateKPIsLivres();
}


function addLivre(titre, auteur, annee, genre, coverUrl = null) {
    console.log('addLivre appelée avec:', {titre, auteur, annee, genre, coverUrl});
    
    if (titre.trim() === '' || auteur.trim() === '' || !annee || genre.trim() === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    
    const nouveauLivre = { 
        titre, 
        auteur, 
        annee: Number(annee), 
        genre,
        coverUrl: coverUrl || null 
    };
    
    console.log('Livre ajouté:', nouveauLivre);
    livres.push(nouveauLivre);
    saveLivres();
    displayLivres();
}

function removeLivre(index) {
    livres.splice(index, 1);
    saveLivres();
    displayLivres();
}


function updateKPIsLivres() {
    const kpiLivres = document.getElementById('kpiLivres');
    if (kpiLivres) {
        kpiLivres.textContent = livres.length;
    }
    
    if (typeof refreshDashboard === 'function') {
        refreshDashboard();
    }
}


searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    const filtered = livres.filter(livre => 
        livre.titre.toLowerCase().includes(query) || 
        livre.auteur.toLowerCase().includes(query)
    );
    displayLivres(filtered);
});


sortSelect.addEventListener('change', () => {
    const value = sortSelect.value;
    let sorted = [...livres]; 

    if (value === 'titre') {
        sorted.sort((a, b) => a.titre.localeCompare(b.titre));
    } else if (value === 'annee') {
        sorted.sort((a, b) => a.annee - b.annee);
    }

    displayLivres(sorted);
});


livreForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const titre = document.getElementById('titre').value;
    const auteur = document.getElementById('auteur').value;
    const annee = document.getElementById('annee').value;
    const genre = document.getElementById('genre').value;

    
    addLivre(titre, auteur, annee, genre);
    livreForm.reset();
});


document.addEventListener('DOMContentLoaded', () => {
    loadLivres();
    createBookModal();
    displayLivres();
});
