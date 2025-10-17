const movies = [
    {
        id: 1,
        title: "Fast & Furious 10",
        year: 2023,
        genre: "Action",
        region: "Hollywood",
        rating: 4.2,
        duration: "141 min",
        director: "Louis Leterrier",
        cast: "Vin Diesel, Jason Momoa, Michelle Rodriguez",
        poster: "https://m.media-amazon.com/images/I/713eM1PWndL._UF1000,1000_QL80_.jpg",
        description: "Dom Toretto and his family are targeted by the vengeful son of drug kingpin Hernan Reyes.",
        trending: true,
        popular: true
    },
    {
        id: 2,
        title: "John Wick 4",
        year: 2023,
        genre: "Action",
        region: "Hollywood",
        rating: 4.5,
        duration: "169 min",
        director: "Chad Stahelski",
        cast: "Keanu Reeves, Donnie Yen, Bill Skarsgård",
        poster: "https://vcdn1-giaitri.vnecdn.net/2023/03/27/John-Wick-4-7670-1679899900.png?w=460&h=0&q=100&dpr=2&fit=crop&s=2zxMb85JeSbcV7GbYFaGUw",
        description: "John Wick uncovers a path to defeating The High Table, but before he can earn his freedom, Wick must face off against a new enemy.",
        trending: true,
        popular: true
    },
    {
        id: 3,
        title: "Mission: Impossible 7",
        year: 2023,
        genre: "Action",
        region: "Hollywood",
        rating: 4.3,
        duration: "163 min",
        director: "Christopher McQuarrie",
        cast: "Tom Cruise, Hayley Atwell, Ving Rhames",
        poster: "https://assets-prd.ignimgs.com/2023/05/17/mission-impossible-dead-reckoning-part-one-ver2-button-1684350230547.jpg",
        description: "Ethan Hunt and his IMF team must track down a dangerous weapon before it falls into the wrong hands.",
        trending: true,
        popular: false
    },
    {
        id: 4,
        title: "The Conjuring 4",
        year: 2024,
        genre: "Horror",
        region: "Hollywood",
        rating: 4.0,
        duration: "112 min",
        director: "Michael Chaves",
        cast: "Patrick Wilson, Vera Farmiga, Sterling Jerins",
        poster: "https://m.media-amazon.com/images/M/MV5BMWQyMzU1YWItYzczYy00MGZiLTg1ZTUtY2QwMWViNGQxNmJhXkEyXkFqcGc@._V1_.jpg",
        description: "The Warrens investigate a haunting in a New York apartment building that threatens to unleash an ancient evil.",
        trending: true,
        popular: false
    },
    {
        id: 5,
        title: "Evil Dead Rise",
        year: 2023,
        genre: "Horror",
        region: "Hollywood",
        rating: 3.8,
        duration: "96 min",
        director: "Lee Cronin",
        cast: "Lily Sullivan, Alyssa Sutherland, Morgan Davies",
        poster: "https://m.media-amazon.com/images/M/MV5BMjM1ZmViMmYtOGYzZC00YzhmLWE0MTMtMzNjYzcyNjEwYWRkXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "Two sisters fight for survival against flesh-possessing demons in a Los Angeles apartment building.",
        trending: false,
        popular: true
    },
    {
        id: 6,
        title: "M3GAN",
        year: 2022,
        genre: "Horror",
        region: "Hollywood",
        rating: 3.9,
        duration: "102 min",
        director: "Gerard Johnstone",
        cast: "Allison Williams, Violet McGraw, Ronny Chieng",
        poster: "https://images.justwatch.com/poster/302253576/s718/m3gan.jpg",
        description: "A robotics engineer creates an AI doll that becomes too protective of her orphaned niece.",
        trending: false,
        popular: true
    },
    {
        id: 7,
        title: "Parasite",
        year: 2019,
        genre: "Thriller",
        region: "Asia",
        rating: 4.8,
        duration: "132 min",
        director: "Bong Joon-ho",
        cast: "Song Kang-ho, Lee Sun-kyun, Cho Yeo-jeong",
        poster: "https://play-lh.googleusercontent.com/cSbZZEeHvNVaLuGbj7tca5GSuTrGjNl_bTxJUrf0e4V54pntacCCALBPlNrXdGVg0UUfyLqQKoT-RzGGEnE",
        description: "A poor family schemes to become employed by a wealthy family and infiltrate their household.",
        trending: true,
        popular: true
    },
    {
        id: 8,
        title: "Everything Everywhere All at Once",
        year: 2022,
        genre: "Sci-Fi",
        region: "Asia",
        rating: 4.6,
        duration: "139 min",
        director: "Daniel Kwan, Daniel Scheinert",
        cast: "Michelle Yeoh, Stephanie Hsu, Ke Huy Quan",
        poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHc3pGrBcaC3xdVac5hPWpecrkmWjsGkPgc52UcPufkZVZDPicxNKe9XBI24Prstk58AXioLrQrBreIiRuFkGT1WVeOcf7a1y685gzgm1T",
        description: "A Chinese-American laundromat owner is swept up in an insane adventure where she alone can save the multiverse.",
        trending: true,
        popular: true
    },
    {
        id: 9,
        title: "Train to Busan",
        year: 2016,
        genre: "Horror",
        region: "Asia",
        rating: 4.4,
        duration: "118 min",
        director: "Yeon Sang-ho",
        cast: "Gong Yoo, Ma Dong-seok, Jung Yu-mi",
        poster: "https://media.themoviedb.org/t/p/w500/vNVFt6dtcqnI7hqa6LFBUibuFiw.jpg",
        description: "While a zombie virus breaks out in South Korea, passengers struggle to survive on the train from Seoul to Busan.",
        trending: false,
        popular: true
    },
    {
        id: 10,
        title: "Your Name",
        year: 2016,
        genre: "Romance",
        region: "Asia",
        rating: 4.7,
        duration: "106 min",
        director: "Makoto Shinkai",
        cast: "Ryunosuke Kamiki, Mone Kamishiraishi, Masami Nagasawa",
        poster: "https://m.media-amazon.com/images/M/MV5BMTIyNzFjNzItZmQ1MC00NzhjLThmMzYtZjRhN2Y3MmM2OGQyXkEyXkFqcGc@._V1_.jpg",
        description: "Two teenagers share a profound, magical connection upon discovering they are swapping bodies.",
        trending: false,
        popular: true
    },
    {
        id: 11,
        title: "The Grand Budapest Hotel",
        year: 2014,
        genre: "Comedy",
        region: "Europe",
        rating: 4.3,
        duration: "99 min",
        director: "Wes Anderson",
        cast: "Ralph Fiennes, F. Murray Abraham, Mathieu Amalric",
        poster: "https://s3-ap-southeast-2.amazonaws.com/assets.allenandunwin.com/images/original/9780571397266.jpg",
        description: "The adventures of Gustave H, a legendary concierge at a famous European hotel, and his protégé Zero Moustafa.",
        trending: true,
        popular: false
    },
    {
        id: 12,
        title: "Amélie",
        year: 2001,
        genre: "Romance",
        region: "Europe",
        rating: 4.5,
        duration: "122 min",
        director: "Jean-Pierre Jeunet",
        cast: "Audrey Tautou, Mathieu Kassovitz, Rufus",
        poster: "https://m.media-amazon.com/images/M/MV5BMjIwNzUzOTY1MV5BMl5BanBnXkFtZTgwODU2NzYxNzE@._V1_.jpg",
        description: "Amélie is an innocent and naive girl in Paris with her own sense of justice. She decides to help those around her.",
        trending: false,
        popular: true
    },
    {
        id: 13,
        title: "The Lives of Others",
        year: 2006,
        genre: "Drama",
        region: "Europe",
        rating: 4.6,
        duration: "137 min",
        director: "Florian Henckel von Donnersmarck",
        cast: "Ulrich Mühe, Martina Gedeck, Sebastian Koch",
        poster: "https://m.media-amazon.com/images/I/613dY5sEQrL._UF894,1000_QL80_.jpg",
        description: "In 1984 East Berlin, an agent of the secret police, conducting surveillance on a writer and his lover.",
        trending: false,
        popular: true
    },
    {
        id: 14,
        title: "Avatar: The Way of Water",
        year: 2022,
        genre: "Sci-Fi",
        region: "Hollywood",
        rating: 4.1,
        duration: "192 min",
        director: "James Cameron",
        cast: "Sam Worthington, Zoe Saldaña, Sigourney Weaver",
        poster: "https://m.media-amazon.com/images/M/MV5BMWNlMWQyMTQtZjc5MC00NTljLTgxZTctZDZiZTBmODY5MTkyXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "Jake Sully and Ney'tiri have formed a family and are doing everything to stay together.",
        trending: true,
        popular: true
    },
    {
        id: 15,
        title: "Top Gun: Maverick",
        year: 2022,
        genre: "Action",
        region: "Hollywood",
        rating: 4.4,
        duration: "131 min",
        director: "Joseph Kosinski",
        cast: "Tom Cruise, Miles Teller, Jennifer Connelly",
        poster: "https://m.media-amazon.com/images/M/MV5BMDBkZDNjMWEtOTdmMi00NmExLTg5MmMtNTFlYTJlNWY5YTdmXkEyXkFqcGc@._V1_.jpg",
        description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past.",
        trending: true,
        popular: true
    },
    {
        id: 16,
        title: "Black Panther: Wakanda Forever",
        year: 2022,
        genre: "Action",
        region: "Hollywood",
        rating: 4.0,
        duration: "161 min",
        director: "Ryan Coogler",
        cast: "Letitia Wright, Lupita Nyong'o, Danai Gurira",
        poster: "https://lumiere-a.akamaihd.net/v1/images/p_blackpanther_19754_4ac13f07.jpeg",
        description: "The nation of Wakanda is pitted against intervening world powers as they mourn the loss of King T'Challa.",
        trending: false,
        popular: true
    },
    {
        id: 17,
        title: "The Batman",
        year: 2022,
        genre: "Action",
        region: "Hollywood",
        rating: 4.2,
        duration: "176 min",
        director: "Matt Reeves",
        cast: "Robert Pattinson, Zoë Kravitz, Jeffrey Wright",
        poster: "https://m.media-amazon.com/images/S/pv-target-images/3de84cca07fc963b66a01a5465c2638066119711e89c707ce952555783dd4b4f.jpg",
        description: "When a sadistic serial killer begins murdering key political figures in Gotham, Batman is forced to investigate.",
        trending: true,
        popular: false
    },
    {
        id: 18,
        title: "Spider-Man: No Way Home",
        year: 2021,
        genre: "Action",
        region: "Hollywood",
        rating: 4.5,
        duration: "148 min",
        director: "Jon Watts",
        cast: "Tom Holland, Zendaya, Benedict Cumberbatch",
        poster: "https://m.media-amazon.com/images/M/MV5BMmFiZGZjMmEtMTA0Ni00MzA2LTljMTYtZGI2MGJmZWYzZTQ2XkEyXkFqcGc@._V1_.jpg",
        description: "With Spider-Man's identity now revealed, Peter asks Doctor Strange for help, which leads to trouble.",
        trending: true,
        popular: true
    },
    {
        id: 19,
        title: "Dune",
        year: 2021,
        genre: "Sci-Fi",
        region: "Hollywood",
        rating: 4.3,
        duration: "155 min",
        director: "Denis Villeneuve",
        cast: "Timothée Chalamet, Rebecca Ferguson, Oscar Isaac",
        poster: "https://m.media-amazon.com/images/M/MV5BNTc0YmQxMjEtODI5MC00NjFiLTlkMWUtOGQ5NjFmYWUyZGJhXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        description: "Feature adaptation of Frank Herbert's science fiction novel about the son of a noble family entrusted with the protection of the most valuable asset in the galaxy.",
        trending: false,
        popular: true
    },
    {
        id: 20,
        title: "Encanto",
        year: 2021,
        genre: "Animation",
        region: "Hollywood",
        rating: 4.4,
        duration: "102 min",
        director: "Jared Bush, Byron Howard",
        cast: "Stephanie Beatriz, María Cecilia Botero, John Leguizamo",
        poster: "https://upload.wikimedia.org/wikipedia/vi/8/83/Encanto_poster.jpg",
        description: "A young Colombian girl has to face the frustration of being the only member of her family without magical powers.",
        trending: true,
        popular: true
    }
];

let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

const modal = document.getElementById('movie-modal');
const closeBtn = document.querySelector('.close');
const searchBtn = document.querySelector('.search-btn');
const searchContainer = document.querySelector('.search-container');
const searchInput = document.querySelector('.search-input');

document.addEventListener('DOMContentLoaded', function() {
    loadMovies();
    setupEventListeners();
    updateFavoritesDisplay();
});

function loadMovies() {
    const trendingMovies = movies.filter(movie => movie.trending);
    renderMovieSection('trending-movies', trendingMovies);

    const popularMovies = movies.filter(movie => movie.popular);
    renderMovieSection('popular-movies', popularMovies);

    const actionMovies = movies.filter(movie => movie.genre === 'Action');
    renderMovieSection('action-movies', actionMovies);

    const horrorMovies = movies.filter(movie => movie.genre === 'Horror');
    renderMovieSection('horror-movies', horrorMovies);

    const asianMovies = movies.filter(movie => movie.region === 'Asia');
    renderMovieSection('asian-movies', asianMovies);

    const europeanMovies = movies.filter(movie => movie.region === 'Europe');
    renderMovieSection('european-movies', europeanMovies);
}

function renderMovieSection(containerId, movies) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = movies.map(movie => `
        <div class="movie-card" onclick="openMovieModal(${movie.id})">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster" onerror="this.src='https://via.placeholder.com/300x450/333/fff?text=No+Image'">
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <div class="movie-meta">
                    <span class="movie-year">${movie.year}</span>
                    <div class="movie-rating">
                        <i class="fas fa-star"></i>
                        <span>${movie.rating}</span>
                    </div>
                </div>
                <p class="movie-description">${movie.description}</p>
            </div>
            <div class="movie-overlay">
                <button class="play-btn" onclick="event.stopPropagation(); playMovie(${movie.id})">
                    <i class="fas fa-play"></i> Play
                </button>
            </div>
        </div>
    `).join('');
}

function openMovieModal(movieId) {
    const movie = movies.find(m => m.id === movieId);
    if (!movie) return;

    document.getElementById('modal-poster').src = movie.poster;
    document.getElementById('modal-title').textContent = movie.title;
    document.getElementById('modal-year').textContent = movie.year;
    document.getElementById('modal-duration').textContent = movie.duration;
    document.getElementById('modal-rating').innerHTML = `<i class="fas fa-star"></i> ${movie.rating}`;
    document.getElementById('modal-description').textContent = movie.description;
    document.getElementById('modal-director').textContent = movie.director;
    document.getElementById('modal-cast').textContent = movie.cast;
    document.getElementById('modal-genre').textContent = movie.genre;

    const favoriteBtn = document.getElementById('favorite-btn');
    const isFavorite = favorites.includes(movieId);
    favoriteBtn.textContent = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
    favoriteBtn.className = isFavorite ? 'btn-secondary active' : 'btn-secondary';
    favoriteBtn.dataset.movieId = movieId;

    modal.style.display = 'block';
}

function closeModal() {
    modal.style.display = 'none';
}

function playMovie(movieId) {
    const movie = movies.find(m => m.id === movieId);
    alert(`Playing: ${movie.title}`);
}

function toggleFavorite(movieId) {
    const index = favorites.indexOf(movieId);
    if (index > -1) {
        favorites.splice(index, 1);
    } else {
        favorites.push(movieId);
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
    updateFavoritesDisplay();
}

function updateFavoritesDisplay() {
    const favoriteButtons = document.querySelectorAll('#favorite-btn');
    favoriteButtons.forEach(btn => {
    });
}

function setupEventListeners() {
    closeBtn.addEventListener('click', closeModal);
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    searchBtn.addEventListener('click', function() {
        searchContainer.classList.toggle('active');
        if (searchContainer.classList.contains('active')) {
            searchInput.focus();
        }
    });

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        if (query.length > 2) {
            searchMovies(query);
        }
    });

    document.getElementById('favorite-btn').addEventListener('click', function() {
        const movieId = parseInt(this.dataset.movieId);
        toggleFavorite(movieId);
        const isFavorite = favorites.includes(movieId);
        this.textContent = isFavorite ? 'Remove from Favorites' : 'Add to Favorites';
        this.className = isFavorite ? 'btn-secondary active' : 'btn-secondary';
    });

    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

function searchMovies(query) {
    const results = movies.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.description.toLowerCase().includes(query) ||
        movie.genre.toLowerCase().includes(query) ||
        movie.cast.toLowerCase().includes(query)
    );

    let searchResults = document.getElementById('search-results');
    if (!searchResults) {
        searchResults = document.createElement('div');
        searchResults.id = 'search-results';
        searchResults.className = 'search-results';
        searchContainer.appendChild(searchResults);
    }

    if (results.length > 0) {
        searchResults.innerHTML = `
            <div class="movie-grid">
                ${results.map(movie => `
                    <div class="movie-card" onclick="openMovieModal(${movie.id}); searchContainer.classList.remove('active');">
                        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                        <div class="movie-info">
                            <h3 class="movie-title">${movie.title}</h3>
                            <div class="movie-meta">
                                <span class="movie-year">${movie.year}</span>
                                <div class="movie-rating">
                                    <i class="fas fa-star"></i>
                                    <span>${movie.rating}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        searchResults.innerHTML = '<p class="empty-state">No movies found matching your search.</p>';
    }
}

function loadMoviesPage() {
    const moviesContainer = document.getElementById('movies-container');
    if (!moviesContainer) return;

    const filterContainer = document.createElement('div');
    filterContainer.className = 'filter-container';
    filterContainer.innerHTML = `
        <button class="filter-btn active" data-filter="all">All</button>
        <button class="filter-btn" data-filter="Action">Action</button>
        <button class="filter-btn" data-filter="Horror">Horror</button>
        <button class="filter-btn" data-filter="Sci-Fi">Sci-Fi</button>
        <button class="filter-btn" data-filter="Romance">Romance</button>
        <button class="filter-btn" data-filter="Comedy">Comedy</button>
        <button class="filter-btn" data-filter="Drama">Drama</button>
        <button class="filter-btn" data-filter="Animation">Animation</button>
    `;

    moviesContainer.appendChild(filterContainer);

    renderAllMovies();

    filterContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('filter-btn')) {
            filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            const filter = e.target.dataset.filter;
            const filteredMovies = filter === 'all' ? movies : movies.filter(movie => movie.genre === filter);
            renderFilteredMovies(filteredMovies);
        }
    });
}

function renderAllMovies() {
    const moviesGrid = document.createElement('div');
    moviesGrid.className = 'movie-grid';
    moviesGrid.id = 'all-movies';
    document.getElementById('movies-container').appendChild(moviesGrid);
    renderMovieSection('all-movies', movies);
}

function renderFilteredMovies(movies) {
    const container = document.getElementById('all-movies');
    if (container) {
        renderMovieSection('all-movies', movies);
    }
}

function loadFavoritesPage() {
    const favoritesContainer = document.getElementById('favorites-container');
    if (!favoritesContainer) return;

    const favoriteMovies = movies.filter(movie => favorites.includes(movie.id));

    if (favoriteMovies.length > 0) {
        favoritesContainer.innerHTML = `
            <div class="movie-grid">
                ${favoriteMovies.map(movie => `
                    <div class="movie-card" onclick="openMovieModal(${movie.id})">
                        <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                        <div class="movie-info">
                            <h3 class="movie-title">${movie.title}</h3>
                            <div class="movie-meta">
                                <span class="movie-year">${movie.year}</span>
                                <div class="movie-rating">
                                    <i class="fas fa-star"></i>
                                    <span>${movie.rating}</span>
                                </div>
                            </div>
                            <p class="movie-description">${movie.description}</p>
                        </div>
                        <div class="movie-overlay">
                            <button class="play-btn" onclick="event.stopPropagation(); playMovie(${movie.id})">
                                <i class="fas fa-play"></i> Play
                            </button>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    } else {
        favoritesContainer.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-heart-broken"></i>
                <h3>No Favorites Yet</h3>
                <p>Start adding movies to your favorites to see them here!</p>
            </div>
        `;
    }
}

window.openMovieModal = openMovieModal;
window.closeModal = closeModal;
window.playMovie = playMovie;
window.toggleFavorite = toggleFavorite;
window.loadMoviesPage = loadMoviesPage;
window.loadFavoritesPage = loadFavoritesPage;