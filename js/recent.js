/* =========================================================
   recent.js — KhoaFilm (Favorites = Recently Watched)
   - Đọc localStorage.KF_RECENTS
   - Sắp xếp mới → cũ và render card ngang
   - Nút "Vào trang phim" + "Trailer"
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  const listEl = document.getElementById("recentList");
  const emptyEl = document.getElementById("recentEmpty");

  const recents = loadRecents();

  if (!recents.length) {
    if (emptyEl) emptyEl.classList.remove("d-none");
    return;
  }

  // Sắp xếp theo thời điểm xem (mới → cũ)
  recents.sort((a, b) => (b.watchedAt || 0) - (a.watchedAt || 0));

  // Render card
  listEl.innerHTML = recents
    .map(
      (r) => `
    <div class="movie-card">
      <div class="poster-wrap">
        <img class="poster" src="${r.poster}" alt="${escapeHtml(
        r.title
      )}" loading="lazy">
      </div>
      <div class="card-body">
        <div>
          <h5 class="card-title mb-1">${escapeHtml(r.title)}</h5>
          <p class="meta mb-1">${r.month}/${r.year} • ${
        r.runtimeMinutes
      } phút • ${escapeHtml(r.country)}</p>
          <p class="meta mb-1">Thể loại: ${escapeHtml(
            (r.genres || []).join(", ")
          )}<br>Độ tuổi: ${escapeHtml(r.ageRating || "")}</p>
          <p class="star mb-2">⭐ ${(Number(r.star) || 0).toFixed(1)}/5</p>
          <p class="meta mb-0">Xem gần đây: ${formatTime(r.watchedAt)}</p>
        </div>

        <div class="d-flex mt-3 gap-2">
          <a class="btn btn-danger btn-sm" href="${
            r.page
          }">▶️ Vào trang phim</a>
          <button class="btn btn-outline-light btn-sm" onclick="KF_openRecentTrailer('${
            r.trailerId || ""
          }')">🎬 Trailer</button>
        </div>
      </div>
    </div>
  `
    )
    .join("");
});

/* ===== Helpers ===== */
function loadRecents() {
  try {
    const raw = localStorage.getItem("KF_RECENTS");
    const arr = raw ? JSON.parse(raw) : [];
    return Array.isArray(arr) ? arr : [];
  } catch {
    return [];
  }
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatTime(ts) {
  if (!ts) return "không rõ";
  const d = new Date(ts);
  const pad = (n) => String(n).padStart(2, "0");
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

// Mở trailer (Favorites không có modal → mở tab YouTube)
window.KF_openRecentTrailer = (id) => {
  if (!id) return;
  window.open(`https://www.youtube.com/watch?v=${id}`, "_blank");
};
