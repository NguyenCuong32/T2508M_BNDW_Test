// Toggle light/dark mode
const ball = document.querySelector(".toggle-ball");
const items = document.querySelectorAll(".container, .navbar-container, .member-card, body");

ball.addEventListener("click", () => {
    items.forEach((item) => item.classList.toggle("active"));
    ball.classList.toggle("active");
});

// Timeline scroll animation
const timelineItems = document.querySelectorAll(".timeline-content");

function showOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;
    timelineItems.forEach((item) => {
        const boxTop = item.getBoundingClientRect().top;
        if (boxTop < triggerBottom) {
            item.classList.add("show");
        }
    });
}

window.addEventListener("scroll", showOnScroll);
showOnScroll();

// Hover glow for member cards
document.querySelectorAll(".member-card").forEach((card) => {
    card.addEventListener("mouseenter", () => {
        card.style.boxShadow = "0 0 20px rgba(77,191,0,0.4)";
    });
    card.addEventListener("mouseleave", () => {
        card.style.boxShadow = "none";
    });
});
