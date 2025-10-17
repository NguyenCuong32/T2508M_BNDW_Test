const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(".container, .navbar-container, .menu-list-item, body");

ball.addEventListener("click", () => {
    items.forEach((item) => item.classList.toggle("active"));
    ball.classList.toggle("active");
});

document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("click", () => {
        alert(`You selected the ${btn.parentElement.querySelector("h2").textContent} plan!`);
    });
});
