// ==========================
// MOVIES PAGE SCRIPT (fixed dropdown logic)
// ==========================
document.addEventListener("DOMContentLoaded", () => {

  // ==========================
  // CAROUSEL FUNCTIONALITY (unchanged)
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
  // FILTER + SEARCH FUNCTIONALITY (fixed)
  // ==========================
  const movieCards = document.querySelectorAll('.movie-card');
  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');

  // use variables for selected filter values (no hidden detached inputs)
  let genreValue = "";
  let languageValue = "";
  let locationValue = "";

  function filterMovies() {
    const searchQuery = searchInput ? searchInput.value.trim().toLowerCase() : "";

    movieCards.forEach(card => {
      const cardGenre = (card.dataset.genre || "").toLowerCase();
      const cardLang = (card.dataset.language || "").toLowerCase();
      const cardLoc = (card.dataset.location || "").toLowerCase();
      const title = (card.querySelector('h3')?.textContent || "").toLowerCase();

      const matchesGenre = !genreValue || cardGenre === genreValue;
      const matchesLanguage = !languageValue || cardLang === languageValue;
      const matchesLocation = !locationValue || cardLoc === locationValue;
      const matchesSearch = !searchQuery || title.includes(searchQuery);

      card.style.display = (matchesGenre && matchesLanguage && matchesLocation && matchesSearch) ? 'block' : 'none';
    });
  }

  if (searchBtn) searchBtn.addEventListener('click', filterMovies);
  if (searchInput) searchInput.addEventListener('keyup', (e) => { if (e.key === 'Enter') filterMovies(); else filterMovies(); });

  // ==========================
  // RESET FILTERS
  // ==========================
  const resetBtn = document.getElementById('resetFilters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // reset variables
      genreValue = "";
      languageValue = "";
      locationValue = "";
      // reset dropdown text to the default label stored on dataset.default
      document.querySelectorAll(".dropdown-selected").forEach(sel => {
        if (sel.dataset && sel.dataset.default) sel.textContent = sel.dataset.default;
        else {
          // fallback: if default not set, restore sensible text
          const parent = sel.closest('.custom-dropdown');
          const f = parent ? parent.getAttribute('data-filter') : null;
          if (f === 'genre') sel.textContent = 'Select Genre';
          else if (f === 'language') sel.textContent = 'Select Language';
          else if (f === 'location') sel.textContent = 'Select Location';
        }
      });
      // clear search
      if (searchInput) searchInput.value = "";
      // show all
      movieCards.forEach(card => card.style.display = 'block');
    });
  }

  // ==========================
  // CUSTOM DROPDOWN LOGIC (fixed)
  // ==========================
  const customDropdowns = document.querySelectorAll(".custom-dropdown");

  customDropdowns.forEach(dropdown => {
    const selected = dropdown.querySelector(".dropdown-selected");
    const items = dropdown.querySelectorAll("li");

    // store the original text to be used by Reset
    selected.dataset.default = selected.textContent.trim();

    // toggle dropdown open/close
    selected.addEventListener("click", (e) => {
      e.stopPropagation();
      const isActive = dropdown.classList.contains("active");
      // close others
      customDropdowns.forEach(d => d.classList.remove("active"));
      // toggle this
      if (!isActive) dropdown.classList.add("active");
      else dropdown.classList.remove("active");
    });

    // choose an item
    items.forEach(item => {
      item.addEventListener("click", (e) => {
        e.stopPropagation();
        const value = item.getAttribute("data-value") || "";
        const filterType = dropdown.getAttribute("data-filter");
        // update visible label
        selected.textContent = item.textContent.trim();
        // close
        dropdown.classList.remove("active");

        // set corresponding filter variable
        if (filterType === "location") locationValue = (value || "").toLowerCase();
        if (filterType === "genre") genreValue = (value || "").toLowerCase();
        if (filterType === "language") languageValue = (value || "").toLowerCase();

        // apply filters
        filterMovies();
      });
    });
  });

  // close dropdowns when clicking outside
  window.addEventListener("click", () => {
    customDropdowns.forEach(dropdown => dropdown.classList.remove("active"));
  });

  // ==========================
  // BOOK NOW ALERT
  // ==========================
  document.querySelectorAll('.book-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      alert("🎟 Redirecting to booking page... (demo)");
    });
  });

  // run initial filter to ensure UI is consistent
  filterMovies();
});
