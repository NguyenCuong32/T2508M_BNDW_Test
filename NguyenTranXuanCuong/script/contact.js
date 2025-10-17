
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(
    ".container, .navbar-container, .contact-form, .contact-info, body"
);

ball.addEventListener("click", () => {
    items.forEach((item) => item.classList.toggle("active"));
    ball.classList.toggle("active");
});


const form = document.querySelector(".contact-form");
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.querySelector("#name").value;
    alert(`Thank you, ${name}! Your message has been sent.`);
    form.reset();
});
