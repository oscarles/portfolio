/* ============================================================
   PORTFOLIO — script.js
   Interactions & animations
   ============================================================ */

const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

// ─────────────────────────────────────────────────────────────
//  1. CURSEUR PERSONNALISÉ
// ─────────────────────────────────────────────────────────────
(function initCursor() {
  const cursor   = $('#cursor');
  const follower = $('#cursor-follower');
  if (!cursor || !follower) return;

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top  = followerY + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverTargets = 'a, button, .tag, .stat-card, .contact-card, .project-card, .skill-group, .stage-card';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.add('hover');
      follower.classList.add('hover');
    }
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest(hoverTargets)) {
      cursor.classList.remove('hover');
      follower.classList.remove('hover');
    }
  });

  document.addEventListener('mouseleave', () => {
    cursor.style.opacity  = '0';
    follower.style.opacity = '0';
  });
  document.addEventListener('mouseenter', () => {
    cursor.style.opacity  = '1';
    follower.style.opacity = '0.5';
  });
})();

// ─────────────────────────────────────────────────────────────
//  2. NAVBAR — scroll + menu mobile
// ─────────────────────────────────────────────────────────────
(function initNavbar() {
  const navbar   = $('#navbar');
  const toggle   = $('#nav-toggle');
  const navLinks = $('#nav-links');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  toggle?.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  $$('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();

// ─────────────────────────────────────────────────────────────
//  3. SCROLL REVEAL
// ─────────────────────────────────────────────────────────────
(function initScrollReveal() {
  const revealEls = $$('.reveal');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  revealEls.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 4) * 0.1}s`;
    observer.observe(el);
  });
})();

// ─────────────────────────────────────────────────────────────
//  4. LIEN ACTIF selon la page
// ─────────────────────────────────────────────────────────────
(function initActiveNav() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  $$('.nav-link').forEach(link => {
    if (link.getAttribute('href') === path) link.classList.add('active');
  });
})();

// ─────────────────────────────────────────────────────────────
//  5. TILT PHOTO HERO
// ─────────────────────────────────────────────────────────────
(function initHeroTilt() {
  const card = $('#hero-photo');
  if (!card) return;

  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width  / 2;
    const cy = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -6;
    const rotateY = ((x - cx) / cx) *  6;
    card.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
})();

// ─────────────────────────────────────────────────────────────
//  6. SMOOTH SCROLL ancres
// ─────────────────────────────────────────────────────────────
(function initSmoothScroll() {
  $$('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const target = $(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();

// ─────────────────────────────────────────────────────────────
//  7. COMPTEUR ANIMÉ (stats)
// ─────────────────────────────────────────────────────────────
(function initCounters() {
  const statNums = $$('.stat-num');
  if (!statNums.length) return;

  const animateCounter = (el) => {
    const rawText = el.textContent.trim();
    const numMatch = rawText.match(/^(\d+)(\+?)$/);
    if (!numMatch) return;
    const target = parseInt(numMatch[1], 10);
    const suffix = numMatch[2] || '';
    let current  = 0;
    const step   = Math.max(1, Math.floor(target / 40));
    const iv = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = current + suffix;
      if (current >= target) clearInterval(iv);
    }, 30);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$('.stat-num').forEach(animateCounter);
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 });

  const about = $('#about') || $('.about-stats');
  if (about) observer.observe(about);
})();

// ─────────────────────────────────────────────────────────────
//  8. TYPING EFFECT sur le hero-tag
// ─────────────────────────────────────────────────────────────
(function initTypingEffect() {
  const heroTag = $('.hero-tag');
  if (!heroTag) return;

  const texts = [
    '// Développement · Data · IA',
    '// Stage ISAGRI — Snowflake · Cortex AI',
    '// BUT 2 · IUT d\'Amiens',
  ];

  let textIndex  = 0;
  let charIndex  = 0;
  let isDeleting = false;
  let isPaused   = false;

  function type() {
    const current = texts[textIndex];
    if (!isDeleting) {
      heroTag.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        isPaused = true;
        setTimeout(() => { isPaused = false; isDeleting = true; }, 2400);
      }
    } else {
      heroTag.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        textIndex  = (textIndex + 1) % texts.length;
      }
    }
    if (!isPaused) setTimeout(type, isDeleting ? 40 : 70);
  }
  setTimeout(type, 1500);
})();

// ─────────────────────────────────────────────────────────────
//  9. BARRE DE PROGRESSION SCROLL
// ─────────────────────────────────────────────────────────────
(function initScrollProgress() {
  const bar = $('#scroll-progress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
  }, { passive: true });
})();

// ─────────────────────────────────────────────────────────────
//  10. TRANSITIONS DE PAGE
// ─────────────────────────────────────────────────────────────
(function initPageTransitions() {
  const overlay = $('#page-overlay');
  if (!overlay) return;

  // Entrée : slide depuis le bas vers l'extérieur (page qui arrive)
  overlay.classList.add('entering');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      overlay.classList.remove('entering');
    });
  });

  $$('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    // Ignore ancres, externes, téléchargements
    if (!href || href.startsWith('#') || href.startsWith('http') ||
        href.startsWith('mailto') || link.hasAttribute('download') ||
        link.getAttribute('target') === '_blank') return;


    link.addEventListener('click', (e) => {
      e.preventDefault();
      overlay.classList.add('entering');
      setTimeout(() => {
        window.location.href = href;
      }, 480);
    });
  });
})();