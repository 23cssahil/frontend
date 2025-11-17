// ==========================
// HAMBURGER MENU TOGGLE
// ==========================
const menuToggle = document.getElementById('mobile-menu');
const navLinks = document.getElementById('nav-links');
menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// ==========================
// SMOOTH SCROLL
// ==========================
document.querySelector('.explore-btn').addEventListener('click', () => {
  window.scrollTo({
    top: document.querySelector('.movies').offsetTop,
    behavior: 'smooth'
  });
});

// ==========================
// BOOK NOW ALERT
// ==========================
document.querySelectorAll('.book-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert("Redirecting to booking page...");
  });
});

// ==========================
// LOGIN & SIGNUP MODALS
// ==========================
const loginBtn = document.getElementById('loginBtn');
const signupBtn = document.getElementById('signupBtn');
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const closeLogin = document.getElementById('closeLogin');
const closeSignup = document.getElementById('closeSignup');

// Open login
loginBtn.addEventListener('click', () => {
  loginModal.style.display = 'flex';
});

// Open signup
signupBtn.addEventListener('click', () => {
  signupModal.style.display = 'flex';
});

// Close modals
closeLogin.addEventListener('click', () => loginModal.style.display = 'none');
closeSignup.addEventListener('click', () => signupModal.style.display = 'none');

// Close if user clicks outside
window.addEventListener('click', (e) => {
  if (e.target === loginModal) loginModal.style.display = 'none';
  if (e.target === signupModal) signupModal.style.display = 'none';
});

// Fake form submission
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Logged in successfully!");
  loginModal.style.display = 'none';
});

document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  alert("Account created successfully!");
  signupModal.style.display = 'none';
});

// ==========================
// SEARCH FUNCTIONALITY
// ==========================
const searchBtn = document.getElementById('searchBtn');
const searchInput = document.getElementById('searchInput');

searchBtn.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  const movies = document.querySelectorAll('.movie-card');

  if (!query) {
    // If input is empty, show all
    movies.forEach(movie => {
      movie.style.display = 'block';
    });
    return;
  }

  let found = false;
  movies.forEach(movie => {
    const title = movie.querySelector('h3').textContent.toLowerCase();
    if (title.includes(query)) {
      movie.style.display = 'block';
      found = true;
    } else {
      movie.style.display = 'none';
    }
  });

  if (!found) alert("No matches found!");
});


// ==========================
// SELLER PAGE FUNCTIONALITY
// ==========================

// Check if seller page exists
const sellerForm = document.getElementById("sellerForm");
const showsContainer = document.getElementById("showsContainer");

if (sellerForm) {
  // --------- Load Saved Shows from localStorage ----------
  function loadShows() {
    showsContainer.innerHTML = "";

    const shows = JSON.parse(localStorage.getItem("shows")) || [];

    shows.forEach((show, index) => {
      const card = document.createElement("div");
      card.classList.add("show-card");

      card.innerHTML = `
        <img src="${show.poster}" alt="">
        <div class="show-info">
          <h3>${show.title}</h3>
          <p>Category: ${show.category}</p>
          <p>Venue: ${show.location}</p>
          <p>Date: ${show.date} | Time: ${show.time}</p>
          <p>Seats: ${show.seats} | Price: ₹${show.price}</p>
        </div>

        <div class="show-actions">
          <button class="edit-btn" data-index="${index}">Edit</button>
          <button class="delete-btn" data-index="${index}">Delete</button>
        </div>
      `;

      showsContainer.appendChild(card);
    });
  }

  loadShows();

  // --------- Add New Show ----------
  sellerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const inputs = sellerForm.querySelectorAll("input, select, textarea");

    const newShow = {
      category: inputs[0].value,
      title: inputs[1].value,
      poster: inputs[2].value,
      location: inputs[3].value,
      date: inputs[4].value,
      time: inputs[5].value,
      seats: inputs[6].value,
      price: inputs[7].value,
      description: inputs[8].value
    };

    const shows = JSON.parse(localStorage.getItem("shows")) || [];
    shows.push(newShow);

    localStorage.setItem("shows", JSON.stringify(shows));

    alert("Show added successfully!");
    sellerForm.reset();
    loadShows();
  });

  
  // --------- DELETE Show ----------
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-btn")) {
      const index = e.target.dataset.index;
      const shows = JSON.parse(localStorage.getItem("shows")) || [];

      shows.splice(index, 1);
      localStorage.setItem("shows", JSON.stringify(shows));

      loadShows();
    }
  });
}
