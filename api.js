const apiSearchInput = document.getElementById('apiSearch');
const apiResultsContainer = document.getElementById('apiResults');


async function searchAPI() {
    const query = apiSearchInput.value.trim();

    if (query === '') {
        alert('Veuillez entrer un titre ou un auteur.');
        return;
    }

    
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
        console.error('Erreur API:', error);
    }
}


function displayAPIResults(books) {
    apiResultsContainer.innerHTML = '';

    books.forEach((book) => {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book-item');

        
        const title = book.title || 'Titre inconnu';
        const authors = book.author_name ? book.author_name.join(', ') : 'Auteur inconnu';
        const year = book.first_publish_year || 'Année inconnue';
        
        
        let coverImage = '';
        if (book.cover_i) {
            coverImage = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        } else {
            coverImage = 'https://via.placeholder.com/180x270?text=Pas+de+couverture';
        }


        const img = document.createElement('img');
        img.src = coverImage;
        img.alt = `Couverture de ${title}`;
        img.className = 'book-cover';
        bookDiv.appendChild(img);

    
        const h3 = document.createElement('h3');
        h3.textContent = title;
        bookDiv.appendChild(h3);

        
        const pAuthor = document.createElement('p');
        pAuthor.innerHTML = `<strong>Auteur(s):</strong> ${authors}`;
        bookDiv.appendChild(pAuthor);

        
        const pYear = document.createElement('p');
        pYear.innerHTML = `<strong>Année:</strong> ${year}`;
        bookDiv.appendChild(pYear);

        
        const addButton = document.createElement('button');
        addButton.className = 'add-book-btn';
        addButton.textContent = 'Ajouter au backoffice';
        
        
        addButton.addEventListener('click', () => {
            addBookFromAPI(title, authors, year, coverImage);
        });
        
        bookDiv.appendChild(addButton);
        apiResultsContainer.appendChild(bookDiv);
    });
}


function addBookFromAPI(title, authors, year, coverUrl) {
    console.log(' Ajout du livre:', title);
    console.log(' URL de la couverture:', coverUrl);
    
    const genre = 'Non spécifié';
    
    
    addLivre(title, authors, year, genre, coverUrl);
    
    
    alert(` Le livre "${title}" a été ajouté avec succès !`);
    
    
    showSection('livres');
}
