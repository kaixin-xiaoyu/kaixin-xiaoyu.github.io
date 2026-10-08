(function () {
  'use strict';

  const header = document.getElementById('site-header');
  const progressBar = document.getElementById('page-progress-bar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const sectionIds = ['top', 'anniversaries', 'memories', 'gallery', 'about'];
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function updateScrollState() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollHeight > 0 ? Math.min(scrollTop / scrollHeight, 1) : 0;

    header.classList.toggle('is-scrolled', scrollTop > 24);
    progressBar.style.width = (progress * 100).toFixed(2) + '%';

    let current = sectionIds[0];
    sectionIds.forEach(function (id) {
      const section = document.getElementById(id);
      if (section && section.getBoundingClientRect().top <= window.innerHeight * 0.38) {
        current = id;
      }
    });

    navLinks.forEach(function (link) {
      const isActive = link.getAttribute('href') === '#' + current;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  let ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        updateScrollState();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
  updateScrollState();

  function closeMenu() {
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', '打开菜单');
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('menu-open');
  }

  menuToggle.addEventListener('click', function () {
    const willOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(willOpen));
    menuToggle.setAttribute('aria-label', willOpen ? '关闭菜单' : '打开菜单');
    mobileMenu.classList.toggle('is-open', willOpen);
    mobileMenu.setAttribute('aria-hidden', String(!willOpen));
    document.body.classList.toggle('menu-open', willOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') closeMenu();
  });

  const revealItems = document.querySelectorAll('.reveal');
  revealItems.forEach(function (item) {
    if (item.dataset.delay) item.style.setProperty('--reveal-delay', item.dataset.delay + 'ms');
  });

  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -45px' });

    revealItems.forEach(function (item) { revealObserver.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  if (!reducedMotion && window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach(function (card) {
      if (card.classList.contains('portrait-frame') || card.classList.contains('polaroid') || card.classList.contains('about-sticker') || card.classList.contains('about-photo')) return;

      let frame = null;
      card.addEventListener('pointermove', function (event) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = window.requestAnimationFrame(function () {
          const rect = card.getBoundingClientRect();
          const x = (event.clientX - rect.left) / rect.width - 0.5;
          const y = (event.clientY - rect.top) / rect.height - 0.5;
          card.style.transform = 'perspective(900px) rotateX(' + (-y * 2.2).toFixed(2) + 'deg) rotateY(' + (x * 2.6).toFixed(2) + 'deg) translateY(-3px)';
        });
      });

      card.addEventListener('pointerleave', function () {
        if (frame) window.cancelAnimationFrame(frame);
        card.style.transform = '';
      });
    });
  }

  const siteStart = Date.UTC(2021, 1, 3);
  const daysTogether = Math.max(0, Math.floor((Date.now() - siteStart) / 86400000));
  const formattedDays = daysTogether.toLocaleString('zh-CN');
  const daysLabel = document.getElementById('days-together');
  const footerDays = document.getElementById('footer-days');
  if (daysLabel) daysLabel.textContent = formattedDays;
  if (footerDays) footerDays.textContent = formattedDays;

  const year = document.getElementById('current-year');
  if (year) year.textContent = String(new Date().getFullYear());

})();