// ==========================
// MOVIES PAGE SCRIPT
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // CAROUSEL FUNCTIONALITY
  // ==========================
  const slide = document.querySelector('.carousel-slide');
  const prevBtn = document.querySelector('.prev');
  const nextBtn = document.querySelector('.next');

  if (slide && prevBtn && nextBtn) {
    const slides = document.querySelectorAll('.carousel-slide img');
    let counter = 0;
    const totalSlides = slides.length;

    function showSlide(index) {
      if (index >= totalSlides) counter = 0;
      else if (index < 0) counter = totalSlides - 1;
      else counter = index;
      slide.style.transform = `translateX(-${counter * 100}%)`;
    }

    let autoSlide = setInterval(() => showSlide(counter + 1), 3000);

    nextBtn.addEventListener('click', () => {
      clearInterval(autoSlide);
      showSlide(counter + 1);
      autoSlide = setInterval(() => showSlide(counter + 1), 3000);
    });

    prevBtn.addEventListener('click', () => {
      clearInterval(autoSlide);
      showSlide(counter - 1);
      autoSlide = setInterval(() => showSlide(counter + 1), 3000);
    });
  }

  // ==========================
  // FILTER + SEARCH FUNCTIONALITY
  // ==========================
  const genreFilter = document.createElement("input");
  const languageFilter = document.createElement("input");
  const locationFilter = document.createElement("input");
  const movieCards = document.querySelectorAll('.movie-card');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  function filterMovies() {
    const genre = genreFilter.value.toLowerCase();
    const language = languageFilter.value.toLowerCase();
    const location = locationFilter.value.toLowerCase();
    const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";

    movieCards.forEach(card => {
      const matchesGenre = !genre || card.dataset.genre === genre;
      const matchesLanguage = !language || card.dataset.language === language;
      const matchesLocation = !location || card.dataset.location === location;
      const matchesSearch =
        !searchQuery || card.querySelector('h3').textContent.toLowerCase().includes(searchQuery);

      card.style.display =
        matchesGenre && matchesLanguage && matchesLocation && matchesSearch
          ? 'block'
          : 'none';
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', filterMovies);
  if (searchInput) searchInput.addEventListener('keyup', filterMovies);

  // ==========================
  // RESET FILTERS
  // ==========================
  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      genreFilter.value = "";
      languageFilter.value = "";
      locationFilter.value = "";
      searchInput.value = "";
      document.querySelectorAll(".dropdown-selected").forEach(sel => {
        sel.textContent = sel.dataset.default || sel.textContent;
      });
      filterMovies();
    });
  }

  // ==========================
  // CUSTOM DROPDOWN LOGIC
  // ==========================
  const customDropdowns = document.querySelectorAll(".custom-dropdown");

  customDropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector(".dropdown-selected");
    const items = dropdown.querySelectorAll("li");

    selected.dataset.default = selected.textContent;

    selected.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("active");

      customDropdowns.forEach(other => {
        if (other !== dropdown) other.classList.remove("active");
      });
    });

    items.forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const value = item.getAttribute("data-value");
        const filterType = dropdown.getAttribute("data-filter");
        selected.textContent = item.textContent;
        dropdown.classList.remove("active");

        if (filterType === "location") locationFilter.value = value;
        if (filterType === "genre") genreFilter.value = value;
        if (filterType === "language") languageFilter.value = value;

        filterMovies();
      });
    });
  });

  window.addEventListener("click", () => {
    customDropdowns.forEach(dropdown => dropdown.classList.remove("active"));
  });

  // ==========================
  // BOOK NOW ALERT
  // ==========================
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert("🎟 Redirecting to booking page...");
    });
  });

});
