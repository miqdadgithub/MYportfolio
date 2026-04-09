// ==========================================
// PARTICLE CANVAS BACKGROUND
// ==========================================
(function initParticles() {
    var canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    var particles = [];
    var w, h;
    var mouse = { x: null, y: null };

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }

    function createParticles() {
        particles = [];
        var count = Math.min(Math.floor((w * h) / 18000), 80);
        for (var i = 0; i < count; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                r: Math.random() * 1.5 + 0.5,
                alpha: Math.random() * 0.4 + 0.1
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        for (var i = 0; i < particles.length; i++) {
            var p = particles[i];

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap edges
            if (p.x < 0) p.x = w;
            if (p.x > w) p.x = 0;
            if (p.y < 0) p.y = h;
            if (p.y > h) p.y = 0;

            // Draw particle
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(108, 99, 255, ' + p.alpha + ')';
            ctx.fill();

            // Lines between particles
            for (var j = i + 1; j < particles.length; j++) {
                var p2 = particles[j];
                var dx = p.x - p2.x;
                var dy = p.y - p2.y;
                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 150) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = 'rgba(108, 99, 255, ' + ((1 - dist / 150) * 0.12) + ')';
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Mouse interaction lines
            if (mouse.x !== null && mouse.y !== null) {
                var mdx = p.x - mouse.x;
                var mdy = p.y - mouse.y;
                var mdist = Math.sqrt(mdx * mdx + mdy * mdy);

                if (mdist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = 'rgba(0, 212, 170, ' + ((1 - mdist / 200) * 0.2) + ')';
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', function () {
        resize();
        createParticles();
    });

    window.addEventListener('mousemove', function (e) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });

    window.addEventListener('mouseout', function () {
        mouse.x = null;
        mouse.y = null;
    });

    resize();
    createParticles();
    draw();
})();


// ==========================================
// TYPING EFFECT
// ==========================================
(function initTyping() {
    var el = document.getElementById('typedName');
    if (!el) return;

    var text = 'ALMIQDAD YAHYA';
    var index = 0;
    var speed = 100;

    function type() {
        if (index < text.length) {
            el.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    // Start after a short delay
    setTimeout(type, 600);
})();


// ==========================================
// SCROLL PROGRESS BAR
// ==========================================
(function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;

    window.addEventListener('scroll', function () {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        var docHeight = document.documentElement.scrollHeight - window.innerHeight;
        var percent = (scrollTop / docHeight) * 100;
        bar.style.width = percent + '%';
    });
})();


// ==========================================
// NAVBAR SCROLL EFFECT
// ==========================================
(function initNavbar() {
    var navbar = document.getElementById('navbar');
    if (!navbar) return;

    var lastScroll = 0;

    window.addEventListener('scroll', function () {
        var currentScroll = window.pageYOffset || document.documentElement.scrollTop;

        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
})();


// ==========================================
// ACTIVE NAV LINK HIGHLIGHTING
// ==========================================
(function initActiveNav() {
    var sections = document.querySelectorAll('section[id], footer[id], div[id]');
    var navLinks = document.querySelectorAll('.nav-link');

    if (!navLinks.length) return;

    function updateActive() {
        var scrollPos = window.pageYOffset + 200;

        sections.forEach(function (section) {
            var top = section.offsetTop;
            var bottom = top + section.offsetHeight;
            var id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(function (link) {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActive);
    updateActive();
})();


// ==========================================
// MOBILE MENU TOGGLE
// ==========================================
(function initMobileMenu() {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('mobileMenu');
    var links = document.querySelectorAll('.mobile-link');

    if (!toggle || !menu) return;

    toggle.addEventListener('click', function () {
        toggle.classList.toggle('active');
        menu.classList.toggle('open');
        document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
    });

    links.forEach(function (link) {
        link.addEventListener('click', function () {
            toggle.classList.remove('active');
            menu.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
})();


// ==========================================
// REVEAL ON SCROLL
// ==========================================
(function initReveal() {
    var reveals = document.querySelectorAll('.reveal');
    if (!reveals.length) return;

    function checkReveal() {
        var windowHeight = window.innerHeight;
        var triggerPoint = windowHeight * 0.88;

        reveals.forEach(function (el) {
            var top = el.getBoundingClientRect().top;
            if (top < triggerPoint) {
                el.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);

    // Initial check
    checkReveal();
})();


// ==========================================
// ANIMATED STAT COUNTERS
// ==========================================
(function initCounters() {
    var statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    var counted = false;

    function animateCounters() {
        if (counted) return;

        var section = document.getElementById('statsSection');
        if (!section) return;

        var rect = section.getBoundingClientRect();
        if (rect.top > window.innerHeight || rect.bottom < 0) return;

        counted = true;

        statNumbers.forEach(function (el) {
            var target = parseInt(el.getAttribute('data-target'), 10);
            var current = 0;
            var duration = 1500;
            var stepTime = Math.floor(duration / target);

            function step() {
                current++;
                el.textContent = current;
                if (current < target) {
                    setTimeout(step, stepTime);
                }
            }

            step();
        });
    }

    window.addEventListener('scroll', animateCounters);
    window.addEventListener('load', animateCounters);
})();


// ==========================================
// SMOOTH SCROLL FOR NAV LINKS
// ==========================================
(function initSmoothScroll() {
    var allLinks = document.querySelectorAll('a[href^="#"]');

    allLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            var targetId = this.getAttribute('href');
            if (targetId === '#') return;

            var target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();

            var navHeight = 70;
            var targetPos = target.getBoundingClientRect().top + window.pageYOffset - navHeight;

            window.scrollTo({
                top: targetPos,
                behavior: 'smooth'
            });
        });
    });
})();


// ==========================================
// FLOATING EQUATIONS PARALLAX
// ==========================================
(function initParallaxEquations() {
    var eqs = document.querySelectorAll('.float-eq');
    if (!eqs.length) return;

    window.addEventListener('scroll', function () {
        var scrollY = window.pageYOffset;
        eqs.forEach(function (eq, i) {
            var speed = 0.02 + (i * 0.01);
            var yOffset = scrollY * speed;
            eq.style.transform = 'translateY(' + (-yOffset) + 'px)';
        });
    });
})();


// ==========================================
// TAG HOVER SOUND EFFECT (VISUAL)
// ==========================================
(function initTagInteractions() {
    var tags = document.querySelectorAll('.tag, .entry-tag');

    tags.forEach(function (tag) {
        tag.addEventListener('mouseenter', function () {
            this.style.transform = 'scale(1.05)';
        });
        tag.addEventListener('mouseleave', function () {
            this.style.transform = 'scale(1)';
        });
    });
})();


// ==========================================
// CONSOLE EASTER EGG
// ==========================================
(function () {
    console.log(
        '%c🪐 Welcome to Almiqdad\'s Portfolio!',
        'color: #6c63ff; font-size: 16px; font-weight: bold;'
    );
    console.log(
        '%cBuilt with pure HTML, CSS & JS — no frameworks needed.',
        'color: #00d4aa; font-size: 12px;'
    );
    console.log(
        '%cInterested in physics? Let\'s connect!',
        'color: #8b8b9e; font-size: 12px;'
    );
})();
