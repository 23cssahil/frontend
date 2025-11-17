// plays.js
document.addEventListener("DOMContentLoaded", () => {
  const bookButtons = document.querySelectorAll(".book-btn");
  const searchInput = document.getElementById("searchInput");
  const playsGrid = document.getElementById("plays-grid");
  const searchBtn = document.getElementById("searchBtn");

  // BOOK NOW ALERT
  bookButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("🎟 Redirecting to booking page...");
    });
  });

  // SEARCH FILTER FUNCTIONALITY
  function searchPlays() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = playsGrid.querySelectorAll(".movie-card");

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  }

  if (searchBtn) searchBtn.addEventListener("click", searchPlays);
  if (searchInput) searchInput.addEventListener("keyup", searchPlays);
});
