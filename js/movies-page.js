/* =========================================================
   movies-page.js — Trang Movies (lọc/sắp xếp/tìm kiếm)
   - Fetch ../data/movies.json
   - Filter theo: từ khóa, thể loại, độ tuổi
   - Sort theo: điểm, thời lượng, A→Z
   - Render card ngang (poster trái – nội dung phải)
   - Trailer modal + ghi "đã xem gần đây" khi vào trang phim
========================================================= */

(() => {
  const els = {
    q:      document.getElementById("q"),
    genre:  document.getElementById("genre"),
    age:    document.getElementById("age"),
    sort:   document.getElementById("sort"),
    reset:  document.getElementById("reset"),
    list:   document.getElementById("filteredList"),
    empty:  document.getElementById("emptyMsg"),
    status: document.getElementById("statusText"),
    trailerModal: document.getElementById("trailerModal"),
    trailerFrame: document.getElementById("trailerFrame"),
  };

  const modal = els.trailerModal ? new bootstrap.Modal(els.trailerModal) : null;

  let MOVIES = [];
  let CURRENT = [];

  // --- Fetch dữ liệu ---
  fetch
