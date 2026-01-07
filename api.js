// --- Sélectionner les éléments du DOM ---
const apiSearchInput = document.getElementById('apiSearch');
const apiResultsContainer = document.getElementById('apiResults');

// --- Fonction de recherche dans l'API OpenLibrary ---
async function searchAPI() {
    const query = apiSearchInput.value.trim();

    if (query === '') {
        alert('Veuillez entrer un titre ou un auteur.');
        return;
    }

    // URL de l'API OpenLibrary
    const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=5`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.numFound === 0) {
            apiResultsContainer.innerHTML = '<p>Aucun résultat trouvé.</p>';
            return;
        }

        displayAPIResults(data.docs);
    } catch (error) {
        apiResultsContainer.innerHTML = '<p>Erreur lors de la recherche, veuillez réessayer plus tard.</p>';
    }
}

// --- Affichage des résultats de l'API ---
function displayAPIResults(books) {
    apiResultsContainer.innerHTML = ''; // Vider les résultats précédents

    books.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-item');

        // Créer un titre et auteur
        const title = book.title ? book.title : 'Titre inconnu';
        const authors = book.author_name ? book.author_name.join(', ') : 'Auteur inconnu';
        const year = book.first_publish_year ? book.first_publish_year : 'Année inconnue';

        bookDiv.innerHTML = `
            <h3>${title}</h3>
            <p><strong>Auteur(s):</strong> ${authors}</p>
            <p><strong>Année:</strong> ${year}</p>
            <button class="add-book-btn" onclick="addBookFromAPI('${title}', '${authors}', '${year}')">Ajouter au backoffice</button>
        `;

        apiResultsContainer.appendChild(bookDiv);
    });
}

// --- Fonction pour ajouter un livre de l'API au backoffice ---
function addBookFromAPI(title, authors, year) {
    // Appel de la fonction dans livres.js pour ajouter le livre
    const genre = 'Non spécifié'; // Tu peux choisir un genre par défaut ou ajouter une fonctionnalité pour le spécifier
    addLivre(title, authors, year, genre); // Appelle la fonction addLivre du fichier livres.js
}
