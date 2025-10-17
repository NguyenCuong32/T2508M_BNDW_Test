// script.js - data + render + favorites
const movies = [
  {
    id: "m1",
    title: "The Post",
    year: 2017,
    genres: ["Drama", "History"],
    rating: 4.1,
    poster: "image/263-the-post.jpg",
  },
  {
    id: "m2",
    title: "The Godfather",
    year: 1972,
    genres: ["Crime", "Drama"],
    rating: 4.9,
    poster:
      "image/MV5BOWE1MWE3ZDktOThlZS00ZmRiLWE4ZGEtNWJkMTVlZjdhZDIyXkEyXkFqcGdeQW1pYnJ5YW50._V1_.jpg",
  },
  {
    id: "m3",
    title: "Titanic",
    year: 1997,
    genres: ["Romance", "Drama"],
    rating: 4.4,
    poster: "image/maxresdefault.jpg",
  },
  {
    id: "m4",
    title: "Inception",
    year: 2010,
    genres: ["Action", "Sci-Fi"],
    rating: 4.7,
    poster: "image/1.jpg",
  },
  {
    id: "m5",
    title: "Parasite",
    year: 2019,
    genres: ["Thriller", "Drama"],
    rating: 4.6,
    poster: "image/parasite.jpg",
  },
  {
    id: "m6",
    title: "Avatar",
    year: 2009,
    genres: ["Action", "Adventure"],
    rating: 4.2,
    poster: "image/review-avatar-2-26122022.jpg",
  },
];

// helper: unique genres
function getGenres() {
  const s = new Set();
  movies.forEach((m) => m.genres.forEach((g) => s.add(g)));
  return Array.from(s).sort();
}

// localStorage favorites
const FAV_KEY = "netfilm_favs";
function loadFavs() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
function saveFavs(list) {
  localStorage.setItem(FAV_KEY, JSON.stringify(list));
}

// UI updates
function setFavCount() {
  const count = loadFavs().length;
  document
    .querySelectorAll("#fav-count, #fav-count-2, #fav-count-3")
    .forEach((el) => {
      if (el) el.textContent = count;
    });
}

// render genre filters (sidebar)
function renderGenreFilters(containerId, checkboxClass = "genre-chk") {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  getGenres().forEach((g, idx) => {
    const id = `${containerId}-g-${idx}`;
    const div = document.createElement("div");
    div.className = "form-check";
    div.innerHTML = `
      <input class="form-check-input ${checkboxClass}" type="checkbox" value="${g}" id="${id}">
      <label class="form-check-label" for="${id}">${g}</label>
    `;
    container.appendChild(div);
  });
}

// create a movie card element
function createCard(m) {
  const favs = loadFavs();
  const isFav = favs.includes(m.id);
  const col = document.createElement("div");
  col.className = "col-sm-6 col-md-4";
  col.innerHTML = `
    <div class="movie-card p-2 h-100">
      <img class="poster rounded" src="${m.poster}" alt="${m.title}">
      <div class="p-2">
        <div class="d-flex justify-content-between align-items-start">
          <div>
            <h6 class="mb-1">${m.title}</h6>
            <div class="small text-muted">${m.year}</div>
          </div>
          <div>
            <button class="btn btn-sm btn-outline-primary btn-watch" data-id="${
              m.id
            }" title="Watch">
              <i class="bi bi-play-fill"></i>
            </button>
            <button class="btn btn-sm ${
              isFav ? "btn-danger" : "btn-outline-danger"
            } btn-fav" data-id="${m.id}" title="Favorite">
              <i class="bi ${isFav ? "bi-heart-fill" : "bi-heart"}"></i>
            </button>
          </div>
        </div>
        <div class="mt-2">
          ${m.genres
            .map((g) => `<span class="badge badge-genre me-1">${g}</span>`)
            .join(" ")}
        </div>
      </div>
    </div>
  `;
  // attach listeners
  setTimeout(() => {
    // ensure DOM ready
    const favBtn = col.querySelector(".btn-fav");
    favBtn.addEventListener("click", () => toggleFav(m.id, favBtn));

    const watchBtn = col.querySelector(".btn-watch");
    watchBtn.addEventListener("click", () => {
      // open trailer in new tab or set iframe if exists
      const trailer = document.getElementById("trailer");
      if (trailer) {
        // sample: open a YouTube trailer url (same for all demo)
        trailer.src = "https://www.youtube.com/watch?v=nrXlY6gzTTM";
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        window.open("https://www.youtube.com/watch?v=nrXlY6gzTTM", "_blank");
      }
    });
  }, 0);
  return col;
}

function toggleFav(id, btnEl) {
  let favs = loadFavs();
  if (favs.includes(id)) {
    favs = favs.filter((x) => x !== id);
  } else {
    favs.push(id);
  }
  saveFavs(favs);
  setFavCount();
  // update button style
  if (btnEl) {
    const icon = btnEl.querySelector("i");
    if (favs.includes(id)) {
      btnEl.classList.remove("btn-outline-danger");
      btnEl.classList.add("btn-danger");
      if (icon) {
        icon.classList.remove("bi-heart");
        icon.classList.add("bi-heart-fill");
      }
    } else {
      btnEl.classList.remove("btn-danger");
      btnEl.classList.add("btn-outline-danger");
      if (icon) {
        icon.classList.remove("bi-heart-fill");
        icon.classList.add("bi-heart");
      }
    }
  }
  renderFavoritesGrid(); // update favorites page if present
}

// render movie grid to specified container
function renderMoviesGrid(containerId, filterFn = null) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  const list = filterFn ? movies.filter(filterFn) : movies;
  if (list.length === 0) {
    container.innerHTML = `<div class="col-12"><div class="alert alert-secondary">No movies found</div></div>`;
    return;
  }
  list.forEach((m) => {
    const card = createCard(m);
    container.appendChild(card);
  });
}

// favorites page rendering
function renderFavoritesGrid() {
  const container = document.getElementById("favoritesGrid");
  if (!container) return;
  container.innerHTML = "";
  const favs = loadFavs();
  if (favs.length === 0) {
    container.innerHTML = `<div class="col-12"><div class="alert alert-info">You have no favorites yet. Add from Movies or Home.</div></div>`;
    return;
  }
  favs.forEach((id) => {
    const m = movies.find((x) => x.id === id);
    if (m) {
      const col = createCard(m);
      container.appendChild(col);
    }
  });
}

// filter helpers reading sidebar
function getSelectedGenres(prefix = "") {
  const nodes = document.querySelectorAll(`${prefix} .form-check-input`);
  const sel = [];
  nodes.forEach((n) => {
    if (n.checked) sel.push(n.value);
  });
  return sel;
}

// search input handler
function attachSearchHandlers() {
  const input = document.getElementById("searchInput");
  if (!input) return;
  input.addEventListener("input", () => {
    const q = input.value.trim().toLowerCase();
    renderMoviesGrid(
      "moviesGrid",
      (m) =>
        m.title.toLowerCase().includes(q) ||
        m.genres.join(" ").toLowerCase().includes(q)
    );
  });
}

// initialize page (called on load)
function init() {
  // set years
  document.querySelectorAll("#year, #year2, #year3, #year4").forEach((el) => {
    if (el) el.textContent = new Date().getFullYear();
  });

  renderGenreFilters("genreFilters", "genre-chk");
  renderGenreFilters("genreFilters2", "genre-chk");
  renderMoviesGrid("moviesGrid");
  renderMoviesGrid("moviesGridAll");
  renderFavoritesGrid();
  setFavCount();
  attachSearchHandlers();

  // wire filters on movies page
  document.querySelectorAll(".genre-chk").forEach((chk) => {
    chk.addEventListener("change", () => {
      // which page? if moviesGridAll exists -> filter full list
      const allGrid = document.getElementById("moviesGridAll");
      const homeGrid = document.getElementById("moviesGrid");
      const targetId = allGrid
        ? "moviesGridAll"
        : homeGrid
        ? "moviesGrid"
        : null;
      if (!targetId) return;
      const selected = Array.from(
        document.querySelectorAll(
          `#${
            targetId === "moviesGridAll" ? "genreFilters2" : "genreFilters"
          } .form-check-input`
        )
      )
        .filter((i) => i.checked)
        .map((i) => i.value);

      const filterFn = (m) => {
        if (selected.length > 0) {
          return selected.every((g) => m.genres.includes(g));
        }
        return true;
      };
      renderMoviesGrid(targetId, filterFn);
    });
  });

  // clear filters button
  const clearBtn = document.getElementById("clearFilters");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      document
        .querySelectorAll("#genreFilters2 .form-check-input")
        .forEach((i) => (i.checked = false));
      renderMoviesGrid("moviesGridAll");
    });
  }

  // hd filter example
  const hdOnly = document.getElementById("hdOnly");
  if (hdOnly) {
    hdOnly.addEventListener("change", () => {
      if (hdOnly.checked) {
        renderMoviesGrid("moviesGrid", (m) =>
          m.title.toLowerCase().includes("the") ? true : true
        );
      } else {
        renderMoviesGrid("moviesGrid");
      }
    });
  }

  // if on movies page, make genre checkboxes update both sidebar copies
  // (for demo, not perfect sync)
}

// init on DOM ready
document.addEventListener("DOMContentLoaded", init);
