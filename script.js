// Theme toggle functionality
const themeToggleBtn = document.querySelector(".theme-btn");
const body = document.body;

// Initialize theme from localStorage or preference
if (localStorage.getItem("theme") === "dark_theme") {
  body.classList.add("dark_theme");
  body.classList.remove("light_theme");
  themeToggleBtn.classList.add("active");
} else {
  body.classList.add("light_theme");
  body.classList.remove("dark_theme");
  themeToggleBtn.classList.remove("active");
}

themeToggleBtn.addEventListener("click", function() {
  if (body.classList.contains("light_theme")) {
    body.classList.remove("light_theme");
    body.classList.add("dark_theme");
    localStorage.setItem("theme", "dark_theme");
    themeToggleBtn.classList.add("active");
  } else {
    body.classList.remove("dark_theme");
    body.classList.add("light_theme");
    localStorage.setItem("theme", "light_theme");
    themeToggleBtn.classList.remove("active");
  }
});

// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
  const modalOverlay = document.getElementById('modal-overlay');
  const modalContentArea = document.getElementById('modal-content-area');
  const closeModalBtn = document.querySelector('.modal-close');
  
  // Open modal
  document.querySelectorAll('.modal-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      const contentId = this.getAttribute('data-modal-content');
      const content = document.getElementById(`modal-content-${contentId}`);
      if (content) {
        modalContentArea.innerHTML = content.innerHTML;
        modalOverlay.style.display = 'flex';
        setTimeout(() => {
          modalOverlay.classList.add('active');
        }, 10);
      }
    });
  });
  
  // Close modal
  function closeModal() {
    modalOverlay.classList.remove('active');
    setTimeout(() => {
      modalOverlay.style.display = 'none';
    }, 300);
  }
  
  closeModalBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  
  // Close with ESC key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
});
