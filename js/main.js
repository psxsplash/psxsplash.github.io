/* ============================================================
   psxsplash website - JavaScript
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
if ('IntersectionObserver' in window) {
    const selectors = [
        '.feature-card', '.start__step', '.community__link',
        '.lua__info', '.lua__code', '.showcase__text', '.showcase .shot',
        '.blocks .shot', '.blocks__point', '.mini-card', '.engine__fact',
        '.engine__tags', '.section-header'
    ];
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll(selectors.join(', ')).forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

// ---- Nav background on scroll ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    nav.style.background = window.scrollY > 20
        ? 'rgba(22, 18, 43, 0.95)'
        : 'rgba(22, 18, 43, 0.85)';
}, { passive: true });

// ---- Smooth scroll for in-page anchors ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const id = this.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
