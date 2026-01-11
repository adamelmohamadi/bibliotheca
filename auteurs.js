let auteurs = [];


const auteurForm = document.getElementById('auteurForm');
const auteursList = document.getElementById('auteursList');


function displayAuteurs() {
    auteursList.innerHTML = ''; 

    auteurs.forEach((auteur, index) => {
        const li = document.createElement('li');
        li.textContent = `${auteur.nom} (${auteur.nationalite}) `;

        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Supprimer';
        deleteBtn.style.marginLeft = '10px';
        deleteBtn.onclick = () => {
            removeAuteur(index);
        };

        li.appendChild(deleteBtn);
        auteursList.appendChild(li);
    });

    
    updateKPIsAuteurs();
}


function addAuteur(nom, nationalite) {
    if (nom.trim() === '' || nationalite.trim() === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    auteurs.push({ nom, nationalite });
    displayAuteurs(); 
}


function removeAuteur(index) {
    auteurs.splice(index, 1); 
    displayAuteurs(); 
}


function updateKPIsAuteurs() {
    const kpiAuteurs = document.getElementById('kpiAuteurs');
    if (kpiAuteurs) {
        kpiAuteurs.textContent = auteurs.length;
    }
}


auteurForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const nom = document.getElementById('nomAuteur').value;
    const nationalite = document.getElementById('nationalite').value;

    addAuteur(nom, nationalite);

    
    auteurForm.reset();
});


document.addEventListener('DOMContentLoaded', () => {
    displayAuteurs(); 
});


