// Scroll animation for skill bars
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for section animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Modal functionality
    const modalOverlay = document.createElement('div');
    modalOverlay.id = 'modal-overlay';
    modalOverlay.className = 'modal-overlay';
    modalOverlay.style.display = 'none';

    const modalBox = document.createElement('div');
    modalBox.className = 'modal-box';
    modalBox.setAttribute('role', 'dialog');
    modalBox.setAttribute('aria-modal', 'true');

    const closeButton = document.createElement('button');
    closeButton.className = 'modal-close';
    closeButton.setAttribute('aria-label', 'Close modal');
    closeButton.innerHTML = '&times;';

    const modalContent = document.createElement('div');
    modalContent.id = 'modal-content-area';

    modalBox.appendChild(closeButton);
    modalBox.appendChild(modalContent);
    modalOverlay.appendChild(modalBox);
    document.body.appendChild(modalOverlay);

    // Open modal
    document.querySelectorAll('.modal-btn').forEach(function(btn) {
        btn.addEventListener('click', function() {
            const contentId = this.getAttribute('data-modal-content');
            const content = document.getElementById(`modal-content-${contentId}`);
            if (content) {
                modalContent.innerHTML = content.innerHTML;
                modalOverlay.style.display = 'flex';
            }
        });
    });

    // Close modal
    function closeModal() {
        modalOverlay.style.display = 'none';
    }

    closeButton.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
            closeModal();
        }
    });
});
