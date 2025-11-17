// events.js
document.addEventListener("DOMContentLoaded", () => {
  const bookButtons = document.querySelectorAll(".book-btn");
  const searchInput = document.getElementById("searchInput");
  const eventsGrid = document.getElementById("events-grid");
  const searchBtn = document.getElementById("searchBtn");

  // BOOK NOW BUTTON ALERT
  bookButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      alert("🎟 Redirecting to booking page...");
    });
  });

  // SIMPLE SEARCH FILTER
  function searchEvents() {
    const query = searchInput.value.trim().toLowerCase();
    const cards = eventsGrid.querySelectorAll(".movie-card");

    cards.forEach(card => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  }

  if (searchBtn) searchBtn.addEventListener("click", searchEvents);
  if (searchInput) searchInput.addEventListener("keyup", searchEvents);
});
