/* =========================================================
   home.js — Banner Carousel (KhoaFilm)
   - Load ../data/movies.json
   - Lấy 3 phim nổi bật dựng slide banner
   - Trailer mở modal, Xem phim lưu "đã xem gần đây"
   - Auto-slide, pause khi hover / xem trailer / cuộn qua banner
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const slidesWrap = document.getElementById("heroSlides");
  const dotsWrap = document.getElementById("heroIndicators");
  const banner = document.getElementById("heroCarousel");

  const trailerModal = new bootstrap.Modal(
    document.getElementById("trailerModal")
  );
  const trailerFrame = document.getElementById("trailerFrame");

  // Load dữ liệu
  fetch("../data/movies.json")
    .then((r) => {
      if (!r.ok) throw new Error("load movies.json fail");
      return r.json();
    })
    .then(({ movies }) => buildBanner(pickTop(movies)))
    .catch(() => {
      /* giữ fallback spinner */
    });

  // Chọn 3 phim nổi bật (điểm cao → thấp; nếu thiếu thì lấy 3 đầu)
  function pickTop(arr) {
    if (!Array.isArray(arr)) return [];
    const sorted = [...arr].sort((a, b) => (b.star || 0) - (a.star || 0));
    return sorted.length >= 3 ? sorted.slice(0, 3) : arr.slice(0, 3);
  }

  // Render slide + chấm chỉ số + bind nút
  function buildBanner(list) {
    if (!list.length) return;
    slidesWrap.innerHTML = list
      .map(
        (m, i) => `
      <div class="carousel-item ${
        i === 0 ? "active" : ""
      }" style="height:65vh;">
        <div class="h-100 position-relative">
          <!-- nền poster phủ -->
          <div class="h-100 w-100 position-absolute top-0 start-0"
               style="background:url('${
                 m.poster
               }') center/cover no-repeat; filter:brightness(.55);"></div>

          <!-- nội dung -->
          <div class="container h-100 position-relative d-flex align-items-center">
            <div class="text-white" style="max-width:720px;">
              <h2 class="fw-bold mb-2">${escapeHtml(m.title)}</h2>
              <p class="text-white-50 mb-3">
                ${m.month}/${m.year} • ${m.runtimeMinutes} phút • ${escapeHtml(
          m.country
        )}<br>
                Thể loại: ${m.genres.join(", ")} • Độ tuổi: ${
          m.ageRating
        } • ⭐ ${m.star.toFixed(1)}/5
              </p>
              <div class="d-flex gap-2">
                <button class="btn btn-outline-light btn-sm"
                        data-trailer="${m.trailerId}" data-title="${escapeHtml(
          m.title
        )}"
                        onclick="KF_openTrailer(this)">🎬 Trailer</button>
                <button class="btn btn-danger btn-sm"
                        onclick="KF_watchMovie(${encode(
                          m
                        )})">▶️ Xem phim</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
      )
      .join("");

    dotsWrap.innerHTML = list
      .map(
        (_, i) =>
          `<button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="${i}" ${
            i === 0 ? "class='active' aria-current='true'" : ""
          } aria-label="Slide ${i + 1}"></button>`
      )
      .join("");

    setupCarouselControls();
  }

  // ====== Controls & behaviors ======
  function setupCarouselControls() {
    const carousel = new bootstrap.Carousel(banner, {
      interval: 5000,
      ride: false,
      pause: false,
      touch: true,
    });

    // Pause khi hover vào banner
    banner.addEventListener("mouseenter", () => carousel.pause());
    banner.addEventListener("mouseleave", () => carousel.cycle());

    // Pause khi cuộn qua banner để tránh "giật lên"
    const pauseOnScroll = () => {
      const rect = banner.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top < -rect.height * 0.5) {
        carousel.pause();
      }
    };
    document.addEventListener("scroll", throttle(pauseOnScroll, 150), {
      passive: true,
    });

    // Khi trailer mở → pause, đóng → không tự resume (theo yêu cầu)
    document
      .getElementById("trailerModal")
      .addEventListener("show.bs.modal", () => carousel.pause());
    document
      .getElementById("trailerModal")
      .addEventListener("hidden.bs.modal", () => {
        trailerFrame.src = "";
      });
  }

  // ====== Actions ======
  window.KF_openTrailer = (btn) => {
    const id = btn.getAttribute("data-trailer");
    if (!id) return;
    trailerFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    trailerModal.show();
  };

  // Lưu "đã xem gần đây" rồi chuyển trang
  window.KF_watchMovie = (payloadJSON) => {
    try {
      const m = JSON.parse(decodeURIComponent(payloadJSON));
      addRecent(m);
      window.location = m.watchPage;
    } catch (e) {
      console.warn(e);
    }
  };

  // ====== Helpers ======
  function addRecent(m) {
    try {
      const raw = localStorage.getItem("KF_RECENTS");
      let arr = raw ? JSON.parse(raw) : [];
      arr = arr.filter((i) => i.slug !== m.slug);
      arr.unshift({
        slug: m.slug,
        title: m.title,
        month: m.month,
        year: m.year,
        runtimeMinutes: m.runtimeMinutes,
        country: m.country,
        genres: m.genres,
        ageRating: m.ageRating,
        star: m.star,
        trailerId: m.trailerId,
        poster: m.poster,
        page: m.watchPage,
        watchedAt: Date.now(),
      });
      if (arr.length > 20) arr = arr.slice(0, 20);
      localStorage.setItem("KF_RECENTS", JSON.stringify(arr));
    } catch (e) {
      /* ignore */
    }
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  // Truyền object vào onclick an toàn
  function encode(obj) {
    return `'${encodeURIComponent(JSON.stringify(obj))}'`;
  }

  // Throttle
  function throttle(fn, wait) {
    let t = 0;
    return (...a) => {
      const now = Date.now();
      if (now - t > wait) {
        t = now;
        fn(...a);
      }
    };
  }
});
