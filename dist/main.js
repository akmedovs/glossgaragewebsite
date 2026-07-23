const interactiveItems = document.querySelectorAll(".button, .nav a");

interactiveItems.forEach((item) => {
  item.addEventListener("click", () => {
    item.classList.add("is-pressed");
    window.setTimeout(() => {
      item.classList.remove("is-pressed");
    }, 160);
  });
});

const reviewForm = document.querySelector("#review-form");

if (reviewForm) {
  reviewForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.querySelector("#review-name")?.value.trim();
    const rating = document.querySelector("#review-rating")?.value.trim();
    const message = document.querySelector("#review-message")?.value.trim();

    if (!name || !rating || !message) {
      return;
    }

    const stars = "⭐".repeat(Number(rating));
    const text = `${stars}\n\n${name}\n\n${message}`;
    const url = `https://wa.me/994705090059?text=${encodeURIComponent(`Yeni musteri rey i:\n\n${text}`)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  });
}
