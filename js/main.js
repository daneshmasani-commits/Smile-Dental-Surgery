/*
 * Smile Dental Surgery — pitch template
 * =====================================
 * Vanilla JS. No dependencies. Initialised on DOMContentLoaded.
 * Handles: smooth scroll, active nav, mobile menu, persistent Book button,
 * service dropdowns, reviews carousel, FAQ accordion, booking form, cookies + map.
 */

document.addEventListener('DOMContentLoaded', () => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------- */
  /*  Header shadow on scroll                                        */
  /* -------------------------------------------------------------- */
  const header = document.querySelector('.site-header');
  const onScrollHeader = () => header.classList.toggle('scrolled', window.scrollY > 80);
  onScrollHeader();
  window.addEventListener('scroll', onScrollHeader, { passive: true });

  /* -------------------------------------------------------------- */
  /*  Smooth scroll for in-page anchor links                        */
  /* -------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      // Close the mobile menu if it was open
      closeMenu();
    });
  });

  /* -------------------------------------------------------------- */
  /*  Mobile hamburger menu (with simple focus trap)                */
  /* -------------------------------------------------------------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  function openMenu() {
    navLinks.classList.add('open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Close menu');
    document.addEventListener('keydown', onMenuKeydown);
  }
  function closeMenu() {
    if (!navLinks.classList.contains('open')) return;
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Open menu');
    document.removeEventListener('keydown', onMenuKeydown);
  }
  function onMenuKeydown(e) {
    if (e.key === 'Escape') { closeMenu(); navToggle.focus(); return; }
    if (e.key !== 'Tab') return;
    const focusable = navLinks.querySelectorAll('a, button');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  navToggle.addEventListener('click', () => {
    navToggle.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
  });

  /* -------------------------------------------------------------- */
  /*  Active section highlighting (IntersectionObserver)            */
  /* -------------------------------------------------------------- */
  const sections = document.querySelectorAll('main section[id]');
  const navMap = {};
  document.querySelectorAll('.nav-links a[href^="#"]').forEach((a) => {
    navMap[a.getAttribute('href').slice(1)] = a;
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          Object.values(navMap).forEach((a) => a.classList.remove('active'));
          const active = navMap[entry.target.id];
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach((s) => observer.observe(s));
  }

  /* -------------------------------------------------------------- */
  /*  Persistent Book button — hide when booking is in view         */
  /* -------------------------------------------------------------- */
  const bookFloat = document.getElementById('bookFloat');
  const booking = document.getElementById('booking');
  if (bookFloat && booking && 'IntersectionObserver' in window) {
    const bookObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => bookFloat.classList.toggle('hidden', entry.isIntersecting));
    }, { threshold: 0.15 });
    bookObserver.observe(booking);
  }

  /* -------------------------------------------------------------- */
  /*  Services dropdowns (one open at a time)                        */
  /* -------------------------------------------------------------- */
  const serviceButtons = document.querySelectorAll('.service-header');
  function setPanel(btn, open) {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', String(open));
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
  }
  serviceButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      serviceButtons.forEach((b) => setPanel(b, false));
      if (!isOpen) setPanel(btn, true);
    });
  });

  /* -------------------------------------------------------------- */
  /*  FAQ accordion (one open at a time)                             */
  /* -------------------------------------------------------------- */
  const faqButtons = document.querySelectorAll('.faq-question');
  function setFaq(btn, open) {
    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    btn.setAttribute('aria-expanded', String(open));
    panel.style.maxHeight = open ? panel.scrollHeight + 'px' : '0px';
  }
  faqButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const isOpen = btn.getAttribute('aria-expanded') === 'true';
      faqButtons.forEach((b) => setFaq(b, false));
      if (!isOpen) setFaq(btn, true);
    });
  });

  // Recompute open panel heights on resize (text may re-wrap)
  window.addEventListener('resize', () => {
    document.querySelectorAll('.service-header[aria-expanded="true"]').forEach((b) => setPanel(b, true));
    document.querySelectorAll('.faq-question[aria-expanded="true"]').forEach((b) => setFaq(b, true));
  });

  /* -------------------------------------------------------------- */
  /*  Reviews carousel                                              */
  /* -------------------------------------------------------------- */
  const carousel = document.getElementById('carousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.slide'));
    const dotsWrap = document.getElementById('carouselDots');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let index = 0;
    let timer = null;
    const INTERVAL = 6000;

    // Build dot indicators
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Review ${i + 1} of ${slides.length}`);
      dot.addEventListener('click', () => { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      slides.forEach((s, n) => s.classList.toggle('active', n === index));
      dots.forEach((d, n) => d.setAttribute('aria-current', String(n === index)));
    }
    const next = () => goTo(index + 1);
    const prev = () => goTo(index - 1);

    function start() {
      if (prefersReducedMotion) return;
      stop();
      timer = setInterval(next, INTERVAL);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function restart() { stop(); start(); }

    prevBtn.addEventListener('click', () => { prev(); restart(); });
    nextBtn.addEventListener('click', () => { next(); restart(); });

    // Pause on hover / focus
    carousel.addEventListener('mouseenter', stop);
    carousel.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    // Keyboard arrows when the carousel region has focus
    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { prev(); restart(); }
      else if (e.key === 'ArrowRight') { next(); restart(); }
    });

    goTo(0);
    start();
  }

  /* -------------------------------------------------------------- */
  /*  Booking form — submit to Formspree via fetch                  */
  /* -------------------------------------------------------------- */
  const form = document.getElementById('bookingForm');
  const formError = document.getElementById('formError');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      formError.hidden = true;

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      try {
        const res = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error('Bad response');
        showSuccess();
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        formError.textContent = 'Something went wrong — please try again, or call us on 020 8471 1301.';
        formError.hidden = false;
      }
    });

    function showSuccess() {
      const card = form.closest('.booking-card');
      card.innerHTML =
        '<div class="form-success">' +
        '<span class="check" aria-hidden="true">✓</span>' +
        '<p>Thanks — we’ve received your enquiry and will be in touch shortly.</p>' +
        '</div>';
    }
  }

  /* -------------------------------------------------------------- */
  /*  Cookie consent + Google Maps reveal                           */
  /* -------------------------------------------------------------- */
  const KEY = 'cookieConsent';
  const banner = document.getElementById('cookieBanner');
  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');
  const mapWrap = document.getElementById('mapWrap');
  const mapPlaceholder = document.getElementById('mapPlaceholder');
  const mapAccept = document.getElementById('mapAccept');

  function loadMap() {
    if (!mapWrap || mapWrap.querySelector('iframe')) return;
    const iframe = document.createElement('iframe');
    iframe.src = mapWrap.dataset.mapSrc;
    iframe.title = 'Map showing the location of Smile Dental Surgery';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';
    if (mapPlaceholder) mapPlaceholder.remove();
    mapWrap.appendChild(iframe);
  }

  function applyConsent(value) {
    localStorage.setItem(KEY, value);
    if (banner) banner.hidden = true;
    if (value === 'accepted') loadMap();
  }

  const stored = localStorage.getItem(KEY);
  if (stored === 'accepted') {
    loadMap();
  } else if (stored !== 'declined') {
    // No choice yet — show the banner
    if (banner) banner.hidden = false;
  }

  if (acceptBtn) acceptBtn.addEventListener('click', () => applyConsent('accepted'));
  if (declineBtn) declineBtn.addEventListener('click', () => applyConsent('declined'));
  // The map placeholder's own button also grants consent and reveals the map
  if (mapAccept) mapAccept.addEventListener('click', () => applyConsent('accepted'));
});
