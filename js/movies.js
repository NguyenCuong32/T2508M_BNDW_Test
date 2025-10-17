/* movies.js — Horizontal Flex (fixed) */
document.addEventListener("DOMContentLoaded", () => {
  const listContainer = document.getElementById("movieList");
  const trailerModal = new bootstrap.Modal(
    document.getElementById("trailerModal")
  );
  const trailerFrame = document.getElementById("trailerFrame");

  fetch("../data/movies.json")
    .then((res) => {
      if (!res.ok) throw new Error("Không thể tải dữ liệu phim.");
      return res.json();
    })
    .then((data) => renderMovies(data.movies))
    .catch((err) => {
      console.error("Lỗi:", err);
      listContainer.innerHTML = `<p class="text-danger">Không thể tải danh sách phim. Kiểm tra Live Server & đường dẫn.</p>`;
    });

  function renderMovies(movies) {
    listContainer.innerHTML = movies
      .map(
        (m) => `
      <div class="movie-card shadow-sm">
        <div class="poster-wrap">
          <img src="${m.poster}" alt="${m.title}" loading="lazy" class="poster">
        </div>
        <div class="card-body">
          <h5 class="card-title fw-bold mb-1">${m.title}</h5>
          <p class="meta mb-1">${m.month}/${m.year} • ${
          m.runtimeMinutes
        } phút • ${m.country}</p>
          <p class="meta mb-1">Thể loại: ${m.genres.join(", ")}<br>Độ tuổi: ${
          m.ageRating
        }</p>
          <p class="star mb-3">⭐ ${m.star.toFixed(1)}/5</p>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-light btn-sm" data-trailer="${
              m.trailerId
            }" onclick="openTrailer(this)">🎬 Trailer</button>
            <a class="btn btn-danger btn-sm" href="${
              m.watchPage
            }">▶️ Xem phim</a>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  window.openTrailer = (btn) => {
    const id = btn.getAttribute("data-trailer");
    if (!id) return;
    trailerFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    trailerModal.show();
  };

  document
    .getElementById("trailerModal")
    .addEventListener("hidden.bs.modal", () => {
      trailerFrame.src = "";
    });
});
