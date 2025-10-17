// Favorite movies functionality
document.addEventListener('DOMContentLoaded', function() {
    // Private variables
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Initialize
    function init() {
        setupEventListeners();
        if (isFavoritesPage()) {
            displayFavorites();
        } else {
            initializeFavoriteButtons();
        }
    }
    
    // Check if current page is favorites page
    function isFavoritesPage() {
        return window.location.pathname.endsWith('favourites.html');
    }
    
    // Add movie to favorites
    function addToFavorites(movie) {
        if (!isMovieInFavorites(movie.id)) {
            favorites.push(movie);
            saveFavorites();
            return true;
        }
        return false;
    }
    
    // Initialize favorite buttons on page load
    function initializeFavoriteButtons() {
        // Use event delegation for dynamic content
        document.addEventListener('click', function(e) {
            const button = e.target.closest('.favorite-btn');
            if (!button) return;
            
            e.preventDefault();
            e.stopPropagation();
            
            const movieId = button.getAttribute('data-movie-id');
            const movieCard = button.closest('.movie-card');
            if (!movieId || !movieCard) return;
            
            const movieData = getMovieData(movieCard, movieId);
            const isFavorite = isMovieInFavorites(movieId);
            
            if (isFavorite) {
                removeFromFavorites(movieId);
                updateButtonState(button, false);
                showNotification(`"${movieData.title}" removed from favorites`);
            } else {
                addToFavorites(movieData);
                updateButtonState(button, true);
                showNotification(`"${movieData.title}" added to favorites`);
            }
            
            // Update all buttons for this movie
            document.querySelectorAll(`.favorite-btn[data-movie-id="${movieId}"]`).forEach(btn => {
                updateButtonState(btn, !isFavorite);
            });
            
            window.dispatchEvent(new CustomEvent('favoritesUpdated'));
        });
        
        // Initialize button states
        document.querySelectorAll('.favorite-btn').forEach(button => {
            const movieId = button.getAttribute('data-movie-id');
            updateButtonState(button, isMovieInFavorites(movieId));
        });
    }

    // Get movie data from card
    function getMovieData(movieCard, movieId) {
        const title = movieCard.querySelector('.movie-title')?.textContent?.trim() || 'Unknown Movie';
        const poster = movieCard.querySelector('.movie-poster')?.style.backgroundImage
            .replace('url("', '').replace('"', '').replace('")', '').trim() || '';
            
        return {
            id: movieId,
            title: title,
            poster: poster,
            href: `movies.html#${movieId}`,
            categories: []
        };
    }

    // Check if movie is in favorites
    function isMovieInFavorites(movieId) {
        return favorites.some(movie => movie.id === movieId);
    }

    // Remove movie from favorites
    function removeFromFavorites(movieId) {
        const initialLength = favorites.length;
        favorites = favorites.filter(movie => movie.id !== movieId);
        if (favorites.length !== initialLength) {
            saveFavorites();
            return true;
        }
        return false;
    }

    // Save favorites to localStorage
    function saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(favorites));
        window.dispatchEvent(new StorageEvent('storage', {
            key: 'favorites',
            newValue: JSON.stringify(favorites)
        }));
    }

    // Update favorite button appearance
    function updateButtonState(button, isFavorite) {
        if (!button) return;
        const icon = button.querySelector('i');
        if (icon) {
            if (isFavorite) {
                icon.className = 'fas fa-heart';
                button.classList.add('active');
            } else {
                icon.className = 'far fa-heart';
                button.classList.remove('active');
            }
            button.setAttribute('aria-label', isFavorite ? 'Remove from favorites' : 'Add to favorites');
        }
    }

    // Show notification
    function showNotification(message) {
        // Remove existing notification if any
        const existingNotification = document.getElementById('favorite-notification');
        if (existingNotification) {
            existingNotification.remove();
        }

        // Create notification element
        const notification = document.createElement('div');
        notification.id = 'favorite-notification';
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Hide notification after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Display favorites on favorites page
    function displayFavorites() {
        const favoritesGrid = document.getElementById('favorites-grid');
        const emptyState = document.getElementById('empty-favorites');
        
        if (!favoritesGrid) return;
        
        if (!favorites || favorites.length === 0) {
            if (emptyState) emptyState.style.display = 'block';
            favoritesGrid.innerHTML = '';
            return;
        }
        
        if (emptyState) emptyState.style.display = 'none';
        
        // Generate HTML for each favorite movie
        favoritesGrid.innerHTML = favorites.map(movie => `
            <div class="movie-card" data-movie-id="${movie.id}">
                <a href="${movie.href}" class="movie-link">
                    <div class="movie-poster" style="background-image: url('${movie.poster}')">
                        <button class="favorite-btn" data-movie-id="${movie.id}" aria-label="Remove from favorites">
                            <i class="fas fa-heart"></i>
                        </button>
                    </div>
                    <div class="movie-info">
                        <h3 class="movie-title">${movie.title}</h3>
                        <div class="movie-meta">
                            <span class="movie-category">${movie.categories ? movie.categories.join(', ') : ''}</span>
                        </div>
                    </div>
                </a>
            </div>
        `).join('');
    }
    
    // Set up event listeners
    function setupEventListeners() {
        // Listen for storage events (from other tabs)
        window.addEventListener('storage', function(e) {
            if (e.key === 'favorites') {
                favorites = JSON.parse(e.newValue || '[]');
                if (isFavoritesPage()) {
                    displayFavorites();
                } else {
                    initializeFavoriteButtons();
                }
            }
        });
    }

    // Initialize
    init();
    
    // Make functions available globally
    window.favoritesModule = {
        addToFavorites,
        removeFromFavorites,
        isMovieInFavorites,
        displayFavorites,
        getFavorites: () => [...favorites]
    };
});
