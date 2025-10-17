// favourite.js

document.addEventListener("DOMContentLoaded", () => {
  const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
  const favGrid = document.getElementById("favouriteGrid");
  const emptyMessage = document.getElementById("emptyMessage");

  if (!favGrid || !emptyMessage) return;

  if (favourites.length === 0) {
    emptyMessage.classList.remove("d-none");
    favGrid.classList.add("d-none");
    return;
  }

  // Show favourites
  emptyMessage.classList.add("d-none");
  favGrid.classList.remove("d-none");

  favourites.forEach(movie => {
    const col = document.createElement("div");
    col.className = "col-sm-6 col-md-4 col-lg-3";

    col.innerHTML = `
      <div class="card shadow-sm border-0 h-100">
        <img src="${movie.image}" class="card-img-top" alt="${movie.title}" style="height: 360px; object-fit: cover;">
        <div class="card-body text-center">
          <h6 class="card-title fw-bold">${movie.title}</h6>
          <p class="text-muted small">${movie.genre || "Unknown Genre"}</p>
          <button class="btn btn-outline-danger btn-sm remove-fav" data-title="${movie.title}">
            <i class="bi bi-heartbreak"></i> Remove
          </button>
        </div>
      </div>
    `;
    favGrid.appendChild(col);
  });

  // Remove favorite button
  favGrid.addEventListener("click", e => {
    if (!e.target.closest(".remove-fav")) return;
    const btn = e.target.closest(".remove-fav");
    const title = btn.getAttribute("data-title");

    const updated = favourites.filter(m => m.title !== title);
    localStorage.setItem("favourites", JSON.stringify(updated));

    location.reload(); // refresh UI
  });
});
