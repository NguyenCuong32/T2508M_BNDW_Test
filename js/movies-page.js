/* =========================================================
   movies-page.js — Trang Movies (lọc/sắp xếp)
   - Đọc ../data/movies.json
   - Lọc: tìm kiếm, thể loại, độ tuổi
   - Sắp xếp: điểm, thời lượng, A→Z
   - Render thẻ ngang (poster trái – nội dung phải)
   - Trailer mở modal; "Xem phim" ghi đã xem gần đây
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  // DOM chính
  const els = {
    list: document.getElementById("filteredList"),
    empty: document.getElementById("emptyMsg"),
    status: document.getElementById("statusText"),
    q: document.getElementById("q"),
    genre: document.getElementById("genre"),
    age: document.getElementById("age"),
    sort: document.getElementById("sort"),
    reset: document.getElementById("reset"),
    trailerModalEl: document.getElementById("trailerModal"),
    trailerFrame: document.getElementById("trailerFrame"),
  };
  const trailerModal = new bootstrap.Modal(els.trailerModalEl);

  let DATA = []; // dữ liệu gốc
  let VIEW = []; // dữ liệu sau lọc/sắp xếp

  // --- Tải dữ liệu ---
  fetch("../data/movies.json")
    .then((r) => {
      if (!r.ok) throw new Error("Không đọc được movies.json");
      return r.json();
    })
    .then(({ movies }) => {
      DATA = Array.isArray(movies) ? movies : [];
      els.status.textContent = `Đang xem: ${DATA.length} phim`;
      applyAndRender();
      bindEvents();
    })
    .catch(() => {
      els.status.textContent = "Lỗi tải dữ liệu.";
    });

  // --- Gán sự kiện UI ---
  function bindEvents() {
    const rerun = debounce(applyAndRender, 150);
    els.q.addEventListener("input", rerun);
    els.genre.addEventListener("change", rerun);
    els.age.addEventListener("change", rerun);
    els.sort.addEventListener("change", rerun);
    els.reset.addEventListener("click", () => {
      els.q.value = "";
      els.genre.value = "";
      els.age.value = "";
      els.sort.value = "";
      applyAndRender();
    });

    // dừng video khi đóng modal
    els.trailerModalEl.addEventListener("hidden.bs.modal", () => {
      els.trailerFrame.src = "";
    });
  }

  // --- Áp dụng lọc + sắp xếp và render ---
  function applyAndRender() {
    const q = (els.q.value || "").trim().toLowerCase();
    const g = (els.genre.value || "").trim().toLowerCase();
    const age = (els.age.value || "").trim();
    const sort = els.sort.value || "";

    // lọc
    VIEW = DATA.filter((m) => {
      const textHit =
        !q ||
        (m.title && m.title.toLowerCase().includes(q)) ||
        (m.country && m.country.toLowerCase().includes(q)) ||
        (m.genres && m.genres.join(" ").toLowerCase().includes(q));
      const genreHit =
        !g || (m.genres || []).some((x) => (x || "").toLowerCase() === g);
      const ageHit = !age || m.ageRating === age;
      return textHit && genreHit && ageHit;
    });

    // sắp xếp
    if (sort === "starDesc") {
      VIEW.sort((a, b) => (b.star || 0) - (a.star || 0));
    } else if (sort === "lenDesc") {
      VIEW.sort((a, b) => (b.runtimeMinutes || 0) - (a.runtimeMinutes || 0));
    } else if (sort === "az") {
      VIEW.sort((a, b) => String(a.title).localeCompare(String(b.title)));
    }

    // render
    renderList(VIEW);

    // trạng thái
    els.status.textContent = `Đang xem: ${VIEW.length} / ${DATA.length} phim${
      g ? ` • Thể loại: ${els.genre.value}` : ""
    }${age ? ` • Độ tuổi: ${age}` : ""}${
      q ? ` • Từ khóa: "${els.q.value}"` : ""
    }`;
    if (!VIEW.length) els.empty.classList.remove("d-none");
    else els.empty.classList.add("d-none");
  }

  // --- Render card ngang ---
  function renderList(arr) {
    els.list.innerHTML = arr
      .map(
        (m) => `
      <div class="movie-card">
        <div class="poster-wrap">
          <img src="${m.poster}" alt="${escapeHtml(
          m.title
        )}" class="poster" loading="lazy">
        </div>
        <div class="card-body">
          <div>
            <h5 class="card-title fw-bold mb-1">${escapeHtml(m.title)}</h5>
            <p class="meta mb-1">${m.month}/${m.year} • ${
          m.runtimeMinutes
        } phút • ${escapeHtml(m.country)}</p>
            <p class="meta mb-1">Thể loại: ${escapeHtml(
              (m.genres || []).join(", ")
            )}<br>Độ tuổi: ${escapeHtml(m.ageRating || "")}</p>
            <p class="star mb-3">⭐ ${Number(m.star || 0).toFixed(1)}/5</p>
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-outline-light btn-sm" data-trailer="${
              m.trailerId
            }" onclick="MP_openTrailer(this)">🎬 Trailer</button>
            <button class="btn btn-danger btn-sm" onclick='MP_watch(${encode(
              m
            )})'>▶️ Xem phim</button>
          </div>
        </div>
      </div>
    `
      )
      .join("");
  }

  // --- Hành động: mở trailer ---
  window.MP_openTrailer = (btn) => {
    const id = btn.getAttribute("data-trailer");
    if (!id) return;
    els.trailerFrame.src = `https://www.youtube.com/embed/${id}?autoplay=1`;
    trailerModal.show();
  };

  // --- Hành động: xem phim (ghi đã xem gần đây + chuyển trang) ---
  window.MP_watch = (payloadJSON) => {
    try {
      const m = JSON.parse(decodeURIComponent(payloadJSON));
      addRecent(m);
      window.location = m.watchPage;
    } catch (e) {
      console.warn(e);
    }
  };

  // --- Ghi "đã xem gần đây" ---
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

  // --- Utils ---
  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function encode(obj) {
    return `'${encodeURIComponent(JSON.stringify(obj))}'`;
  }
  function debounce(fn, wait) {
    let t;
    return (...a) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...a), wait);
    };
  }
});
