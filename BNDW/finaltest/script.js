
// script.js - Render ~100 movies with star ratings
// Usage: page must have element with id="movieContainer" (see previous HTML).
// Posters: try to use known public URLs for some titles; otherwise use placeholder with movie title.

const movies = [
  { title: "The Godfather", year: 1972, rating: 5, img: "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg" },
  { title: "The Shawshank Redemption", year: 1994, rating: 5, img: "https://m.media-amazon.com/images/I/51NiGlapXlL._AC_.jpg" },
  { title: "The Dark Knight", year: 2008, rating: 5, img: "https://m.media-amazon.com/images/I/51k0qa6zqKL._AC_.jpg" },
  { title: "Pulp Fiction", year: 1994, rating: 5, img: "https://m.media-amazon.com/images/I/51kAM5g3x5L._AC_.jpg" },
  { title: "Schindler's List", year: 1993, rating: 5, img: "https://m.media-amazon.com/images/I/51A6KxQcfzL._AC_.jpg" },
  { title: "The Lord of the Rings: The Return of the King", year: 2003, rating: 5, img: "https://m.media-amazon.com/images/I/51Qvs9i5a%2BL._AC_.jpg" },
  { title: "Forrest Gump", year: 1994, rating: 5, img: "https://m.media-amazon.com/images/I/41c2T6wG%2B1L._AC_.jpg" },
  { title: "Inception", year: 2010, rating: 5, img: "https://m.media-amazon.com/images/I/51s2Y8kX9gL._AC_.jpg" },
  { title: "Fight Club", year: 1999, rating: 5, img: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg" },
  { title: "The Matrix", year: 1999, rating: 5, img: "https://m.media-amazon.com/images/I/51EG732BV3L.jpg" },

  { title: "Goodfellas", year: 1990, rating: 5, img: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg" },
  { title: "Se7en", year: 1995, rating: 5, img: "https://m.media-amazon.com/images/I/51K8ouYrHeL._AC_.jpg" },
  { title: "The Silence of the Lambs", year: 1991, rating: 5, img: "https://m.media-amazon.com/images/I/41xw8sZ9WCL._AC_.jpg" },
  { title: "Saving Private Ryan", year: 1998, rating: 5, img: "https://m.media-amazon.com/images/I/51qF6w6ZwvL._AC_.jpg" },
  { title: "Interstellar", year: 2014, rating: 5, img: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_SL1200_.jpg" },
  { title: "Parasite", year: 2019, rating: 5, img: "https://m.media-amazon.com/images/I/71c05lTE03L._AC_SY679_.jpg" },
  { title: "Whiplash", year: 2014, rating: 5, img: "https://m.media-amazon.com/images/I/51X3D9Gq9FL._AC_.jpg" },
  { title: "Gladiator", year: 2000, rating: 5, img: "https://m.media-amazon.com/images/I/51A9f4J5aNL._AC_.jpg" },
  { title: "The Prestige", year: 2006, rating: 4, img: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg" },
  { title: "The Lion King", year: 1994, rating: 5, img: "https://m.media-amazon.com/images/I/51l5Zr1A6xL._AC_.jpg" },

  { title: "The Departed", year: 2006, rating: 4, img: "https://m.media-amazon.com/images/I/51c6Y7g1kgL._AC_.jpg" },
  { title: "Blade Runner 2049", year: 2017, rating: 4, img: "https://m.media-amazon.com/images/I/81C3xj2sQ2L._AC_SL1500_.jpg" },
  { title: "Memento", year: 2000, rating: 4, img: "https://m.media-amazon.com/images/I/51K8ouYrHeL._AC_.jpg" },
  { title: "Django Unchained", year: 2012, rating: 4, img: "https://m.media-amazon.com/images/I/51W0hCaxG2L._AC_.jpg" },
  { title: "The Social Network", year: 2010, rating: 4, img: "https://m.media-amazon.com/images/I/51Qw1j9QGFL._AC_.jpg" },
  { title: "Mad Max: Fury Road", year: 2015, rating: 4, img: "https://m.media-amazon.com/images/I/81zX5kY60SL._AC_SL1500_.jpg" },
  { title: "Toy Story", year: 1995, rating: 5, img: "https://m.media-amazon.com/images/I/51J2Gk2w1tL._AC_.jpg" },
  { title: "Up", year: 2009, rating: 5, img: "https://m.media-amazon.com/images/I/51w5Zr2w2YL._AC_.jpg" },
  { title: "Coco", year: 2017, rating: 5, img: "https://m.media-amazon.com/images/I/81y7j9Gm8kL._AC_SL1500_.jpg" },
  { title: "Inside Out", year: 2015, rating: 5, img: "https://m.media-amazon.com/images/I/51mW3g1T0zL._AC_.jpg" },

  { title: "Titanic", year: 1997, rating: 4, img: "https://m.media-amazon.com/images/I/71w0m4b4wDL._AC_SL1200_.jpg" },
  { title: "Avatar", year: 2009, rating: 4, img: "https://m.media-amazon.com/images/I/61O1sG7rQdL._AC_SL1000_.jpg" },
  { title: "The Avengers", year: 2012, rating: 4, img: "https://m.media-amazon.com/images/I/51m8nQYl6SL._AC_.jpg" },
  { title: "Avengers: Endgame", year: 2019, rating: 4, img: "https://m.media-amazon.com/images/I/81ExhpBEbHL._AC_SL1500_.jpg" },
  { title: "Spider-Man: Into the Spider-Verse", year: 2018, rating: 5, img: "https://m.media-amazon.com/images/I/71VZgG3iJpL._AC_SL1200_.jpg" },
  { title: "Guardians of the Galaxy", year: 2014, rating: 4, img: "https://m.media-amazon.com/images/I/51V5ZpFyaFL._AC_.jpg" },
  { title: "Black Panther", year: 2018, rating: 4, img: "https://m.media-amazon.com/images/I/81G+AX6cEPL._AC_SL1500_.jpg" },
  { title: "Joker", year: 2019, rating: 4, img: "https://m.media-amazon.com/images/I/71e8YfD0KEL._AC_SL1188_.jpg" },
  { title: "The Irishman", year: 2019, rating: 4, img: "https://m.media-amazon.com/images/I/71X9bK8Hd3L._AC_SL1200_.jpg" },
  { title: "Once Upon a Time in Hollywood", year: 2019, rating: 4, img: "https://m.media-amazon.com/images/I/71v0Y2hZvXL._AC_SL1188_.jpg" },

  { title: "La La Land", year: 2016, rating: 4, img: "https://m.media-amazon.com/images/I/81tF2g3YshL._AC_SL1500_.jpg" },
  { title: "Moonlight", year: 2016, rating: 4, img: "https://m.media-amazon.com/images/I/51y9p2a1n1L._AC_.jpg" },
  { title: "Her", year: 2013, rating: 4, img: "https://m.media-amazon.com/images/I/51z0w2KpQ0L._AC_.jpg" },
  { title: "The Grand Budapest Hotel", year: 2014, rating: 4, img: "https://m.media-amazon.com/images/I/51QbE8gn9GL._AC_.jpg" },
  { title: "No Country for Old Men", year: 2007, rating: 5, img: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg" },
  { title: "There Will Be Blood", year: 2007, rating: 4, img: "https://m.media-amazon.com/images/I/51FqQYQzvPL._AC_.jpg" },
  { title: "The Wolf of Wall Street", year: 2013, rating: 4, img: "https://m.media-amazon.com/images/I/81f%2B2B7NmqL._AC_SL1500_.jpg" },
  { title: "Mission: Impossible - Fallout", year: 2018, rating: 4, img: "https://m.media-amazon.com/images/I/71qYq2b9oRL._AC_SL1200_.jpg" },
  { title: "Top Gun: Maverick", year: 2022, rating: 4, img: "https://m.media-amazon.com/images/I/81r7GkpR5OL._AC_SL1500_.jpg" },
  { title: "1917", year: 2019, rating: 4, img: "https://m.media-amazon.com/images/I/81m8Z1q2wZL._AC_SL1500_.jpg" },

  { title: "The Social Network", year: 2010, rating: 4, img: "https://m.media-amazon.com/images/I/51Qw1j9QGFL._AC_.jpg" },
  { title: "Rocky", year: 1976, rating: 4, img: "https://m.media-amazon.com/images/I/51k52sRZy3L._AC_.jpg" },
  { title: "Die Hard", year: 1988, rating: 4, img: "https://m.media-amazon.com/images/I/51zUbui+gbL._AC_.jpg" },
  { title: "The Terminator", year: 1984, rating: 4, img: "https://m.media-amazon.com/images/I/51oR6F8Z5tL._AC_.jpg" },
  { title: "Terminator 2: Judgment Day", year: 1991, rating: 5, img: "https://m.media-amazon.com/images/I/51k8ouYrHeL._AC_.jpg" },
  { title: "Heat", year: 1995, rating: 4, img: "https://m.media-amazon.com/images/I/51oD5k1yV4L._AC_.jpg" },
  { title: "The Big Lebowski", year: 1998, rating: 4, img: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg" },
  { title: "Amélie", year: 2001, rating: 4, img: "https://m.media-amazon.com/images/I/51J2Gk2w1tL._AC_.jpg" },
  { title: "Spirited Away", year: 2001, rating: 5, img: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg" },
  { title: "The Incredibles", year: 2004, rating: 5, img: "https://m.media-amazon.com/images/I/51q8b8qjKLL._AC_.jpg" },

  { title: "Finding Nemo", year: 2003, rating: 5, img: "https://m.media-amazon.com/images/I/51F3aZ6Zl-L._AC_.jpg" },
  { title: "Ratatouille", year: 2007, rating: 5, img: "https://m.media-amazon.com/images/I/51t3qD2F-nL._AC_.jpg" },
  { title: "Shutter Island", year: 2010, rating: 4, img: "https://m.media-amazon.com/images/I/51s8WcK8KDL._AC_.jpg" },
  { title: "The Revenant", year: 2015, rating: 4, img: "https://m.media-amazon.com/images/I/61QwQh9T3eL._AC_SL1200_.jpg" },
  { title: "Oldboy", year: 2003, rating: 5, img: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg" },
  { title: "A Clockwork Orange", year: 1971, rating: 4, img: "https://m.media-amazon.com/images/I/51V5ZpFyaFL._AC_.jpg" },
  { title: "Full Metal Jacket", year: 1987, rating: 4, img: "https://m.media-amazon.com/images/I/51k8ouYrHeL._AC_.jpg" },
  { title: "Blade Runner", year: 1982, rating: 4, img: "https://m.media-amazon.com/images/I/51oR6F8Z5tL._AC_.jpg" },
  { title: "Seven Samurai", year: 1954, rating: 5, img: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg" },
  { title: "City of God", year: 2002, rating: 5, img: "https://m.media-amazon.com/images/I/51q8b8qjKLL._AC_.jpg" },

  { title: "The Truman Show", year: 1998, rating: 4, img: "https://m.media-amazon.com/images/I/51Qw1j9QGFL._AC_.jpg" },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004, rating: 5, img: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg" },
  { title: "The Pianist", year: 2002, rating: 5, img: "https://m.media-amazon.com/images/I/51FqQYQzvPL._AC_.jpg" },
  { title: "The Intouchables", year: 2011, rating: 5, img: "https://m.media-amazon.com/images/I/51y9p2a1n1L._AC_.jpg" },
  { title: "My Neighbor Totoro", year: 1988, rating: 5, img: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg" },
  { title: "WALL·E", year: 2008, rating: 5, img: "https://m.media-amazon.com/images/I/51q8b8qjKLL._AC_.jpg" },
  { title: "District 9", year: 2009, rating: 4, img: "https://m.media-amazon.com/images/I/51k52sRZy3L._AC_.jpg" },
  { title: "Spotlight", year: 2015, rating: 4, img: "https://m.media-amazon.com/images/I/51K8ouYrHeL._AC_.jpg" },
  { title: "The Help", year: 2011, rating: 4, img: "https://m.media-amazon.com/images/I/51V5ZpFyaFL._AC_.jpg" },
  { title: "Gravity", year: 2013, rating: 4, img: "https://m.media-amazon.com/images/I/51b5S6t8RBL._AC_.jpg" },

  { title: "The Breakfast Club", year: 1985, rating: 4, img: "https://via.placeholder.com/500x750?text=The+Breakfast+Club" },
  { title: "The Sixth Sense", year: 1999, rating: 4, img: "https://m.media-amazon.com/images/I/51iGk8N1bNL._AC_.jpg" },
  { title: "Sicario", year: 2015, rating: 4, img: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg" },
  { title: "Hereditary", year: 2018, rating: 3, img: "https://m.media-amazon.com/images/I/51v5ZpFyaFL._AC_.jpg" },
  { title: "Get Out", year: 2017, rating: 4, img: "https://m.media-amazon.com/images/I/51Qw1j9QGFL._AC_.jpg" },
  { title: "The Handmaiden", year: 2016, rating: 5, img: "https://m.media-amazon.com/images/I/51rOnIjLqzL._AC_.jpg" },
  { title: "Trainspotting", year: 1996, rating: 4, img: "https://m.media-amazon.com/images/I/51k8ouYrHeL._AC_.jpg" },
  { title: "Slumdog Millionaire", year: 2008, rating: 4, img: "https://m.media-amazon.com/images/I/51q8b8qjKLL._AC_.jpg" },
  { title: "Nocturnal Animals", year: 2016, rating: 3, img: "https://via.placeholder.com/500x750?text=Nocturnal+Animals" },
  { title: "The Grandmaster", year: 2013, rating: 3, img: "https://via.placeholder.com/500x750?text=The+Grandmaster" }
];

// Helper: safe encode title for placeholder images
function placeholderUrl(title) {
  return `https://via.placeholder.com/500x750?text=${encodeURIComponent(title)}`;
}

// Normalize movie objects: ensure img exists
movies.forEach(m => {
  if (!m.img || m.img.trim() === "") m.img = placeholderUrl(m.title);
});

// Get DOM refs
const container = document.getElementById("movieContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

// Render stars: returns string of ★ and ☆
function stars(r) {
  const full = '★'.repeat(Math.max(0, Math.min(5, Math.round(r))));
  const empty = '☆'.repeat(5 - full.length);
  return `<span class="stars">${full}${empty}</span>`;
}

// Render movie list (clears container first)
function render(list) {
  container.innerHTML = "";
  if (!list.length) {
    container.innerHTML = `<p style="color:#bbb;padding:20px">Không tìm thấy phim.</p>`;
    return;
  }
  list.forEach(m => {
    const card = document.createElement("div");
    card.className = "movie";
    card.innerHTML = `
      <img class="poster" src="${m.img}" alt="${escapeHtml(m.title)} poster"
           onerror="this.onerror=null;this.src='${placeholderUrl(m.title)}'">
      <div class="info">
        <h3>${escapeHtml(m.title)} <span class="year">(${m.year||'—'})</span></h3>
        <p class="desc">${escapeHtml(m.desc||'')}</p>
        <div class="rating">${stars(m.rating)}</div>
        <button class="trailer-btn" type="button">▶ Trailer</button>
      </div>
    `;
    // trailer button placeholder: if movie.trailer exists open; else do nothing (or could open search)
    const btn = card.querySelector(".trailer-btn");
    if (m.trailer) {
      btn.addEventListener("click", () => openTrailer(m.trailer));
    } else {
      btn.addEventListener("click", () => {
        // open YouTube search in new tab as fallback
        const q = encodeURIComponent(m.title + " trailer");
        window.open(`https://www.youtube.com/results?search_query=${q}`, "_blank");
      });
    }
    container.appendChild(card);
  });
}

// Simple search by title / year / desc
function filterMovies() {
  const kw = searchInput.value.trim().toLowerCase();
  if (!kw) {
    render(movies);
    return;
  }
  const filtered = movies.filter(m => {
    return (m.title && m.title.toLowerCase().includes(kw)) ||
           (m.desc && m.desc.toLowerCase().includes(kw)) ||
           (m.year && String(m.year).includes(kw));
  });
  render(filtered);
}

// Trailer popup handling (simple)
const trailerPopup = document.getElementById("trailerPopup");
const trailerFrame = document.getElementById("trailerFrame");
const closeTrailerBtn = document.getElementById("closeTrailer");
function openTrailer(embedUrl) {
  if (!trailerPopup || !trailerFrame) {
    // No popup on the page — fallback to new tab search
    window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent('trailer ' + embedUrl)}`, "_blank");
    return;
  }
  trailerFrame.src = embedUrl + (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1&rel=0';
  trailerPopup.classList.add("show");
  trailerPopup.setAttribute("aria-hidden", "false");
}
function closeTrailer() {
  if (!trailerPopup || !trailerFrame) return;
  trailerFrame.src = "";
  trailerPopup.classList.remove("show");
  trailerPopup.setAttribute("aria-hidden", "true");
}
if (closeTrailerBtn) closeTrailerBtn.addEventListener("click", closeTrailer);
if (trailerPopup) trailerPopup.addEventListener("click", (e) => { if (e.target === trailerPopup) closeTrailer(); });

// Utility: escape html
function escapeHtml(str) {
  if (!str) return "";
  return String(str).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]; });
}

// Wire up search events
if (searchInput) searchInput.addEventListener("input", () => { filterMovies(); });
if (searchBtn) searchBtn.addEventListener("click", filterMovies);

// Initial render
render(movies);

