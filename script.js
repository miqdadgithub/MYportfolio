// Mobile navigation toggle
const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('navmenu');
if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    menu.classList.toggle('open');
  });
}

// Intersection observer for section fade-in (skip if reduced motion)
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReducedMotion && 'IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-in');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.section[data-animate]').forEach((section) => {
    fadeObserver.observe(section);
  });
} else {
  document.querySelectorAll('.section[data-animate]').forEach((section) => {
    section.classList.add('is-in');
  });
}

// Active nav item highlight
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.navmenu a');
if ('IntersectionObserver' in window) {
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', isActive);
        });
      }
    });
  }, { rootMargin: '-50% 0px -45% 0px', threshold: 0 });

  sections.forEach((section) => spy.observe(section));
}

// Project filters
const filterButtons = Array.from(document.querySelectorAll('.filters [data-filter]'));
const cards = Array.from(document.querySelectorAll('#project-grid .card'));
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.toggle('is-active', btn === button));
    const filter = button.dataset.filter;
    cards.forEach((card) => {
      const show = filter === 'all' || card.dataset.tags.split(' ').includes(filter);
      card.style.display = show ? '' : 'none';
    });
  });
});

// Copy email to clipboard
const copyButton = document.getElementById('copy-email');
const emailLink = document.getElementById('email-link');
const copyStatus = document.getElementById('copy-status');
if (copyButton && emailLink && copyStatus) {
  copyButton.addEventListener('click', async () => {
    const email = emailLink.textContent.trim();
    try {
      await navigator.clipboard.writeText(email);
      copyStatus.textContent = 'Email copied!';
    } catch (error) {
      const textarea = document.createElement('textarea');
      textarea.value = email;
      textarea.setAttribute('readonly', '');
      textarea.style.position = 'absolute';
      textarea.style.left = '-9999px';
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      copyStatus.textContent = 'Email copied!';
    }

    setTimeout(() => {
      copyStatus.textContent = '';
    }, 2000);
  });
}

// Footer metadata
const yearEl = document.getElementById('year');
const updatedEl = document.getElementById('last-updated');
const now = new Date();
if (yearEl) {
  yearEl.textContent = now.getFullYear();
}
if (updatedEl) {
  updatedEl.textContent = now.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

// Close mobile nav after clicking a link
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (menu) {
      menu.classList.remove('open');
    }
    if (toggle) {
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});
