// ===== NUCLEUS TECH — SHARED JS =====

document.addEventListener('DOMContentLoaded', () => {

  // ----- Navbar scroll class -----
  const navbar = document.getElementById('mainNav');
  window.addEventListener('scroll', () => {
    navbar?.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // ----- Mega menus -----
  const megaItems = document.querySelectorAll('.has-mega');
  let closeTimer;

  megaItems.forEach(item => {
    const btn = item.querySelector('.nav-btn');
    const menu = item.querySelector('.mega-menu');
    if (!btn || !menu) return;

    const open = () => {
      clearTimeout(closeTimer);
      // close others
      megaItems.forEach(other => {
        if (other !== item) {
          other.querySelector('.mega-menu')?.classList.remove('active');
          other.querySelector('.nav-btn')?.setAttribute('aria-expanded', 'false');
        }
      });
      menu.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    };
    const close = () => {
      closeTimer = setTimeout(() => {
        menu.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
      }, 120);
    };

    item.addEventListener('mouseenter', open);
    item.addEventListener('mouseleave', close);
    btn.addEventListener('click', () => menu.classList.contains('active') ? close() : open());
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!e.target.closest('.has-mega')) {
      megaItems.forEach(item => {
        item.querySelector('.mega-menu')?.classList.remove('active');
        item.querySelector('.nav-btn')?.setAttribute('aria-expanded', 'false');
      });
    }
  });

  // ----- Mobile hamburger -----
  const hamburger = document.getElementById('hamburger');
  const mobileDrawer = document.getElementById('mobileDrawer');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileDrawer?.classList.toggle('open');
  });

  // ----- Scroll reveal -----
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => revealObs.observe(el));

  // ----- Counter animation -----
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const prefix = el.dataset.prefix || '';
      const duration = 2000;
      const start = performance.now();
      const update = now => {
        const progress = Math.min((now - start) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const val = target % 1 !== 0 ? (ease * target).toFixed(1) : Math.round(ease * target);
        el.textContent = prefix + val + suffix;
        if (progress < 1) requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      countObs.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObs.observe(el));

  // ----- Active nav link highlight -----
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-links a').forEach(a => {
    if (a.getAttribute('href') === page) {
      a.style.color = 'var(--accent-2)';
    }
  });

});
