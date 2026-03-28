document.addEventListener('DOMContentLoaded', function () {

  // ── Smooth scroll ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ── Scroll progress bar ───────────────────────────────────
  const progressBar = document.getElementById('scrollProgress');
  const header = document.getElementById('siteHeader');

  function onScroll() {
    const scrolled = window.scrollY;
    const total = document.documentElement.scrollHeight - window.innerHeight;
    if (progressBar) progressBar.style.width = (scrolled / total * 100) + '%';
    if (header) header.classList.toggle('scrolled', scrolled > 20);
    updateActiveNav();
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Active nav highlight ──────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  function updateActiveNav() {
    let current = '';
    sections.forEach(function (section) {
      if (window.scrollY >= section.offsetTop - 130) {
        current = section.id;
      }
    });
    navLinks.forEach(function (link) {
      link.classList.toggle('active', link.getAttribute('href') === '#' + current);
    });
  }

  // ── Mobile nav toggle ─────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
      });
    });
  }

  // ── Scroll reveal + skill bars ────────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        entry.target.querySelectorAll('.bar-fill').forEach(function (bar) {
          bar.style.width = (bar.dataset.w || 0) + '%';
        });
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // ── Typing effect ─────────────────────────────────────────
  const texts = [
    'Desarrollador Web Front-end.',
    'Diseñador de Interfaces.',
    'Apasionado por el código limpio.',
    'Construyendo experiencias digitales.'
  ];

  const typedEl = document.getElementById('typed');
  if (typedEl) {
    let textIndex = 0, charIndex = 0, deleting = false;

    function type() {
      const current = texts[textIndex];
      if (!deleting) {
        typedEl.textContent = current.slice(0, ++charIndex);
        if (charIndex === current.length) {
          deleting = true;
          setTimeout(type, 1800);
          return;
        }
      } else {
        typedEl.textContent = current.slice(0, --charIndex);
        if (charIndex === 0) {
          deleting = false;
          textIndex = (textIndex + 1) % texts.length;
          setTimeout(type, 350);
          return;
        }
      }
      setTimeout(type, deleting ? 38 : 62);
    }

    type();
  }

});
