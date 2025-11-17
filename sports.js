// sports.js
document.addEventListener("DOMContentLoaded", () => {
  const bookButtons = document.querySelectorAll(".book-btn");
  const searchInput = document.getElementById("searchInput");
  const sportsGrid = document.getElementById("sports-grid");
  const searchBtn = document.getElementById("searchBtn");

  // BOOK NOW BUTTON ALERT
  bookButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("🎟 Redirecting to booking page...");
    });
  });

  // SIMPLE SEARCH FUNCTIONALITY
  function searchSports() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = sportsGrid.querySelectorAll(".movie-card");

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  }

  if (searchBtn) searchBtn.addEventListener("click", searchSports);
  if (searchInput) searchInput.addEventListener("keyup", searchSports);
});
