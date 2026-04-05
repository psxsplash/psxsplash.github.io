/* ============================================================
   SplashEdit Website — JavaScript
   ============================================================ */

// ---- Mobile nav toggle ----
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        navToggle.classList.remove('open');
    });
});

// ---- Scroll reveal ----
function addRevealClasses() {
    const selectors = [
        '.arch__card', '.feature-card', '.start__step',
        '.platform-card', '.community__link', '.lua__info',
        '.lua__code', '.section-header'
    ];
    document.querySelectorAll(selectors.join(', ')).forEach(el => {
        el.classList.add('reveal');
    });
}
addRevealClasses();

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ---- Nav background on scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        nav.style.background = 'rgba(10, 10, 15, 0.95)';
    } else {
        nav.style.background = 'rgba(10, 10, 15, 0.8)';
    }
}, { passive: true });

// ---- Smooth scroll for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---- Comparison slider ----
(function() {
    const slider = document.getElementById('compareSlider');
    if (!slider) return;

    const handle  = document.getElementById('compareHandle');
    const before  = slider.querySelector('.compare__side--before');
    let dragging  = false;

    function setPosition(x) {
        const rect = slider.getBoundingClientRect();
        let pct = ((x - rect.left) / rect.width) * 100;
        pct = Math.max(2, Math.min(98, pct));
        before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        handle.style.left = pct + '%';
    }

    function onStart(e) {
        e.preventDefault();
        dragging = true;
        slider.style.cursor = 'grabbing';
    }

    function onMove(e) {
        if (!dragging) return;
        const x = e.touches ? e.touches[0].clientX : e.clientX;
        setPosition(x);
    }

    function onEnd() {
        dragging = false;
        slider.style.cursor = 'ew-resize';
    }

    // Mouse events
    slider.addEventListener('mousedown', (e) => { onStart(e); setPosition(e.clientX); });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    // Touch events
    slider.addEventListener('touchstart', (e) => { onStart(e); setPosition(e.touches[0].clientX); }, { passive: false });
    window.addEventListener('touchmove', (e) => { if (dragging) { e.preventDefault(); onMove(e); } }, { passive: false });
    window.addEventListener('touchend', onEnd);
})();
