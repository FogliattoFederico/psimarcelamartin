/* ── main.js ─────────────────────────────────────────────
   Marcela Martin — Psicóloga
   Comportamientos: nav scroll, burger menu, año footer,
   animaciones on-scroll (IntersectionObserver), form feedback
──────────────────────────────────────────────────────── */

(function () {
  'use strict';

  // ── Año en footer ──────────────────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── WhatsApp: construido en runtime (anti-scraping) ────
  // El número se arma desde fragmentos para que no aparezca
  // como string completo en el HTML ni en el JS minificado.
  // Reemplazá cada parte con los dígitos reales de Marcela.
  (function buildWaLink() {
    const waLink = document.getElementById('waLink');
    if (!waLink) return;

    // Fragmentos del número internacional sin el "+"
    // Formato: 54 (país) + 9 + código de área + número local
    // Ej. Rosario: 54 9 341 XXX XXXX → ['54','9','341','XXXXXXX']
    const parts = ['54', '9', '341', '5002887']; // ← reemplazar con número real
    const number = parts.join('');
    const message = encodeURIComponent('Hola Marcela, me gustaría consultar sobre un turno.');

    waLink.href = 'https://wa.me/' + number + '?text=' + message;
  })();

  // ── Nav: clase scrolled ────────────────────────────────
  const nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 40) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── Burger / Mobile menu ───────────────────────────────
  const burger     = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('.mobile-link') : [];

  function closeMobileMenu() {
    burger.classList.remove('open');
    mobileMenu.classList.remove('open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileMenu();
  });

  // ── Smooth scroll para todos los href="#..." ───────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = nav ? nav.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ── Animaciones on-scroll (IntersectionObserver) ───────
  const animTargets = document.querySelectorAll(
    '.services__card, .modality__card, .about__grid, .contact__grid, .hero__content'
  );

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animTargets.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.07}s, transform 0.55s ease ${i * 0.07}s`;
    observer.observe(el);
  });

  // Clase que activa la animación
  const styleSheet = document.createElement('style');
  styleSheet.textContent = '.is-visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(styleSheet);

  // ── Formulario: feedback visual ────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function (e) {
      // Netlify maneja el submit real; esto solo da feedback visual
      const btn = form.querySelector('.contact__submit');
      if (btn) {
        btn.textContent = 'Enviando…';
        btn.disabled = true;
        btn.style.opacity = '0.7';
      }
    });
  }

})();
