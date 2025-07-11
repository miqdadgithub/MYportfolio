// Theme toggle functionality
const themeToggleBtn = document.querySelector("[data-theme-btn]");
const body = document.body;

// Check & apply last time selected theme from localStorage
if (localStorage.getItem("theme") === "light_theme") {
  body.classList.remove("dark_theme");
  body.classList.add("light_theme");
  themeToggleBtn.classList.add("active");
} else {
  body.classList.remove("light_theme");
  body.classList.add("dark_theme");
  themeToggleBtn.classList.remove("active");
}

themeToggleBtn.addEventListener("click", function() {
  if (body.classList.contains("dark_theme")) {
    body.classList.remove("dark_theme");
    body.classList.add("light_theme");
    localStorage.setItem("theme", "light_theme");
    themeToggleBtn.classList.add("active");
  } else {
    body.classList.remove("light_theme");
    body.classList.add("dark_theme");
    localStorage.setItem("theme", "dark_theme");
    themeToggleBtn.classList.remove("active");
  }
});

// Unified modal logic for all card details
document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContentArea = document.getElementById('modal-content-area');
  const closeModalBtn = document.querySelector('.modal-close');
  
  // Open modal on button click
  document.querySelectorAll('.modal-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const contentId = btn.getAttribute('data-modal-content');
      const content = document.getElementById('modal-content-' + contentId);
      if (content && modalOverlay && modalContentArea) {
        modalContentArea.innerHTML = content.innerHTML;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal on close button or overlay click
  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', function() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    });
    
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (modalOverlay.classList.contains('active') && e.key === 'Escape') {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Sticky header functionality
  const header = document.querySelector('.header');
  window.addEventListener('scroll', function() {
    if (window.scrollY >= 50) {
      header.classList.add('active');
    } else {
      header.classList.remove('active');
    }
  });
});
