// Unified modal logic for all card details
document.addEventListener('DOMContentLoaded', function() {
  var modalOverlay = document.getElementById('modal-overlay');
  var modalContentArea = document.getElementById('modal-content-area');
  var closeModalBtn = document.querySelector('.modal-close');

  // Open modal on button click
  document.querySelectorAll('.modal-btn').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var contentId = btn.getAttribute('data-modal-content');
      var content = document.getElementById('modal-content-' + contentId);
      if (content && modalOverlay && modalContentArea) {
        modalContentArea.innerHTML = content.innerHTML;
        modalOverlay.style.display = 'flex';
        // Trap focus inside modal
        closeModalBtn.focus();
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal on close button or overlay click
  if (closeModalBtn && modalOverlay) {
    closeModalBtn.addEventListener('click', function() {
      modalOverlay.style.display = 'none';
      document.body.style.overflow = '';
    });
    modalOverlay.addEventListener('click', function(e) {
      if (e.target === modalOverlay) {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
      if (modalOverlay.style.display === 'flex' && e.key === 'Escape') {
        modalOverlay.style.display = 'none';
        document.body.style.overflow = '';
      }
    });
  }
});
// Expand/collapse logic for expandable cards
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.expandable').forEach(function(card) {
    var expandBtn = card.querySelector('.expand-btn');
    var collapseBtn = card.querySelector('.collapse-btn');
    var shortDesc = card.querySelector('.short');
    var fullDesc = card.querySelector('.full');
    if (expandBtn && fullDesc && shortDesc) {
      expandBtn.addEventListener('click', function() {
        shortDesc.style.display = 'none';
        fullDesc.style.display = 'inline';
      });
    }
    if (collapseBtn && fullDesc && shortDesc) {
      collapseBtn.addEventListener('click', function() {
        fullDesc.style.display = 'none';
        shortDesc.style.display = 'inline';
      });
    }
  });
});
// --- Highlight active nav link on scroll ---
const navLinks = document.querySelectorAll('.nav-link');
const sections = Array.from(document.querySelectorAll('main .section'));
function setActiveNav() {
  let index = sections.length - 1;
  for (let i = 0; i < sections.length; i++) {
    if (window.scrollY + 80 < sections[i].offsetTop) {
      index = i - 1;
      break;
    }
  }
  navLinks.forEach((link, i) => {
    if (i === index) link.classList.add('active');
    else link.classList.remove('active');
  });
}
window.addEventListener('scroll', setActiveNav);
window.addEventListener('load', setActiveNav);

// Smooth scroll navigation
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Section reveal on scroll
const revealSections = document.querySelectorAll('.section');
const revealOnScroll = () => {
  const triggerBottom = window.innerHeight * 0.85;
  revealSections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    if (sectionTop < triggerBottom) {
      section.classList.add('visible');
    }
  });
};
window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// Contact form (no backend, just clear on submit)
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  this.reset();
  alert('Thank you for reaching out!');
});
