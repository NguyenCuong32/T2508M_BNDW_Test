const movies = [
  { title: "Inception", poster: "images/inception.jpg", genre: "Action" },
  { title: "Interstellar", poster: "images/interstellar.jpg", genre: "Adventure" },
  { title: "The Dark Knight", poster: "images/dark_knight.jpg", genre: "Action" },
  { title: "Batman Begins", poster: "images/batman_begins.jpg", genre: "Action" },
  { title: "Oppenheimer", poster: "images/oppenheimer.jpg", genre: "Documentary" },
  { title: "Avatar", poster: "images/avatar.jpg", genre: "Adventure" },
  { title: "Titanic", poster: "images/titanic.jpg", genre: "Romance" },
  { title: "Tenet", poster: "images/tenet.jpg", genre: "Sci-Fi" }
];

document.addEventListener("DOMContentLoaded", () => {
  const movieGrid = document.getElementById("movieGrid");
  if (!movieGrid) return;

  // Load saved favourites from localStorage
  let favourites = JSON.parse(localStorage.getItem("favourites")) || [];

  // Create toast container
  const toastContainer = document.createElement("div");
  toastContainer.className = "toast-container position-fixed bottom-0 end-0 p-3";
  document.body.appendChild(toastContainer);

  // Function to show a toast message
  function showToast(message, type = "success") {
    const toast = document.createElement("div");
    toast.className = `toast align-items-center text-bg-${type} border-0 show`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
    toast.innerHTML = `
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;
    toastContainer.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => toast.remove(), 3000);
  }

  // Render movie grid
  movies.forEach(movie => {
    const isFavourite = favourites.some(f => f.title === movie.title);

    const col = document.createElement("div");
    col.className = "col-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card shadow-sm border-0 h-100">
        <img src="${movie.poster}" class="card-img-top" alt="${movie.title}" style="height: 300px; object-fit: cover;">
        <div class="card-body text-center">
          <h6 class="card-title">${movie.title}</h6>
          <p class="text-muted small mb-2">${movie.genre}</p>
          <button class="btn ${isFavourite ? 'btn-danger' : 'btn-outline-danger'} btn-sm fav-btn" data-title="${movie.title}">
            <i class="bi ${isFavourite ? 'bi-heart-fill' : 'bi-heart'}"></i> 
            ${isFavourite ? 'Added' : 'Add to Favorites'}
          </button>
        </div>
      </div>
    `;
    movieGrid.appendChild(col);
  });

  // Handle favorite button clicks
  movieGrid.addEventListener("click", e => {
    if (!e.target.closest(".fav-btn")) return;
    const btn = e.target.closest(".fav-btn");
    const title = btn.getAttribute("data-title");

    const movie = movies.find(m => m.title === title);
    const index = favourites.findIndex(f => f.title === title);

    if (index === -1) {
      // Add to favorites
      favourites.push({ title: movie.title, image: movie.poster, genre: movie.genre });
      localStorage.setItem("favourites", JSON.stringify(favourites));
      btn.classList.remove("btn-outline-danger");
      btn.classList.add("btn-danger");
      btn.innerHTML = `<i class="bi bi-heart-fill"></i> Added`;
      showToast(`✅ "${movie.title}" added to Favorites!`, "success");
    } else {
      // Remove from favorites
      favourites.splice(index, 1);
      localStorage.setItem("favourites", JSON.stringify(favourites));
      btn.classList.remove("btn-danger");
      btn.classList.add("btn-outline-danger");
      btn.innerHTML = `<i class="bi bi-heart"></i> Add to Favorites`;
      showToast(`❌ "${movie.title}" removed from Favorites!`, "danger");
    }
  });
});
