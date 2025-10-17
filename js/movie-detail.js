/* =========================================================
   js/movie-detail.js — Trang chi tiết phim (dùng chung)
   Nhiệm vụ:
   - Đọc ../data/movies.json
   - Tìm phim theo window.KF_DETAIL_SLUG
   - Đổ dữ liệu vào trang + mở modal trailer YouTube
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const slug = window.KF_DETAIL_SLUG || "";

  // Phần tử DOM
  const el = {
    titleHero: document.getElementById("movieTitle"),
    metaHero: document.getElementById("movieMeta"),
    chips: document.getElementById("genreChips"),

    poster: document.getElementById("moviePoster"),
    titleCard: document.getElementById("movieTitleCard"),
    metaCard: document.getElementById("movieMetaCard"),
    age: document.getElementById("movieAge"),
    star: document.getElementById("movieStar"),
    desc: document.getElementById("movieDesc"),

    btnTrailer: document.getElementById("btnTrailer"),
    trailerModalEl: document.getElementById("trailerModal"),
    trailerFrame: document.getElementById("trailerFrame"),

    inlineWrap: document.getElementById("inlinePlayerWrap"),
    inlineFrame: document.getElementById("inlinePlayer"),
  };

  const trailerModal = new bootstrap.Modal(el.trailerModalEl);

  // Tải dữ liệu JSON và render
  fetch("../data/movies.json")
    .then((r) => {
      if (!r.ok) throw new Error("Không tải được movies.json");
      return r.json();
    })
    .then((data) => {
      const movie = (data.movies || []).find((m) => m.slug === slug);
      if (!movie) {
        renderNotFound();
        return;
      }
      renderMovie(movie);
      bindTrailer(movie.trailerId);
    })
    .catch((err) => {
      console.error(err);
      renderError();
    });

  // Render khi không tìm thấy
  function renderNotFound() {
    if (el.titleHero) el.titleHero.textContent = "Không tìm thấy phim";
    if (el.metaHero) el.metaHero.textContent = "Vui lòng quay lại trang chủ.";
    if (el.desc)
      el.desc.textContent = "Dữ liệu không tồn tại hoặc slug chưa khớp.";
  }

  // Render khi lỗi tải
  function renderError() {
    if (el.titleHero) el.titleHero.textContent = "Lỗi tải dữ liệu";
    if (el.metaHero) el.metaHero.textContent = "Không thể đọc movies.json";
  }

  // Đổ dữ liệu phim ra trang
  function renderMovie(m) {
    // Header hero
    if (el.titleHero) el.titleHero.textContent = m.title;
    if (el.metaHero)
      el.metaHero.textContent = `${m.month}/${m.year} • ${m.runtimeMinutes} phút • ${m.country}`;

    // Chips thể loại
    if (el.chips) {
      el.chips.innerHTML = (m.genres || [])
        .map(
          (g) =>
            `<span class="kf-chip"><i class="bi bi-tag"></i> ${escapeHtml(
              g
            )}</span>`
        )
        .join("");
    }

    // Card nội dung
    if (el.poster) {
      el.poster.src = m.poster;
      el.poster.alt = m.title;
      el.poster.loading = "lazy";
    }
    if (el.titleCard) el.titleCard.textContent = m.title;
    if (el.metaCard)
      el.metaCard.textContent = `${m.month}/${m.year} • ${m.runtimeMinutes} phút • ${m.country}`;
    if (el.age) el.age.textContent = `Độ tuổi: ${m.ageRating}`;
    if (el.star) el.star.textContent = `⭐ ${Number(m.star || 0).toFixed(1)}/5`;

    // Mô tả (tạo mô tả ngắn nếu chưa có)
    if (el.desc) {
      const short = `Phim ${m.genres?.join(", ") || "điện ảnh"} sản xuất tại ${
        m.country
      }, thời lượng ${m.runtimeMinutes} phút. Phát hành ${m.month}/${m.year}.`;
      el.desc.textContent = short;
    }
  }

  // Sự kiện trailer (mở modal + autoplay, đóng thì dừng)
  function bindTrailer(trailerId) {
    if (!el.btnTrailer || !trailerId) return;

    el.btnTrailer.addEventListener("click", () => {
      el.trailerFrame.src = `https://www.youtube.com/embed/${trailerId}?autoplay=1`;
      trailerModal.show();
    });

    el.trailerModalEl.addEventListener("hidden.bs.modal", () => {
      el.trailerFrame.src = "";
    });
  }

  // Escape HTML cơ bản
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
});
