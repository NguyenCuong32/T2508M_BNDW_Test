document.addEventListener("DOMContentLoaded", function () {
  const favButtons = document.querySelectorAll(".favorites");

  favButtons.forEach(btn => {
    btn.addEventListener("click", function () {
      const card = btn.closest(".movie-card");
      const title = card.querySelector("h4").textContent;
      const img = card.querySelector("img").getAttribute("src");

      let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
      const existing = favorites.find(movie => movie.title === title);

      if (!existing) {
        favorites.push({ title, img });
        btn.textContent = "Đã yêu thích";
        btn.classList.add("active");
      } else {
        favorites = favorites.filter(movie => movie.title !== title);
        btn.textContent = "Yêu thích";
        btn.classList.remove("active");
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
    });
  });
});
